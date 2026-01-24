use argon2::{
    Argon2, password_hash::{PasswordHash, PasswordHasher, PasswordVerifier, SaltString, rand_core::{OsRng,}}
};
use sha2::{Sha256, Digest}; // Add 'sha2' to Cargo.toml
use crate::helpers::jwt::{generate_access_token, generate_refresh_token};
use chrono::{Duration, Utc};
use serde::{Deserialize, Serialize};
use sqlx::{PgPool};

use crate::{config::Config, types::error::AppError};
use super::{dto::{RegisterUserDto, LoginDto, LoginResponseDto,}, model::{User, UserStatus,}};


// JWT Claims structure
#[derive(Debug, Serialize, Deserialize)]
pub struct Claims {
    pub sub: String, // User ID
    pub exp: usize,  // Expiration time
    pub iat: usize,  // Issued at
}

pub async fn register_user_service(
    pool: &PgPool,
    payload: RegisterUserDto,
) -> Result<User, AppError> {
    // 1. Check if user exists
    let user_exists = sqlx::query!(
        "SELECT email FROM users WHERE email = $1",
        payload.email
    )
    .fetch_optional(pool)
    .await?;

    if user_exists.is_some() {
        return Err(AppError::BadRequest("Email already exists".to_string()));
    }

    // 2. Hash password
    let salt = SaltString::generate(&mut OsRng);
    let argon2 = Argon2::default();
    let password_hash = argon2
        .hash_password(payload.password.as_bytes(), &salt)
        .map_err(|e| AppError::Hashed(e.to_string()))?
        .to_string();

    // 3. Insert user
    // Note: Ensure your Postgres 'users' table has a 'status' column of type 'user_status' enum
    // or change the cast below depending on your schema.
    let user = sqlx::query_as!(
        User,
        r#"
        INSERT INTO users (email, username, password_hash, status)
        VALUES ($1, $2, $3, $4::user_status)
        RETURNING id, email, username, password_hash, is_email_verified, status as "status: UserStatus", created_at, updated_at, last_login_at
        "#,
        payload.email,
        payload.username,
        password_hash,
        UserStatus::Active as UserStatus
    )
    .fetch_one(pool)
    .await?;

    Ok(user)
}

pub async fn login_user_service(
    pool: &PgPool,
    config: &Config,
    payload: LoginDto,
) -> Result<LoginResponseDto, AppError> {
    // 1. Find user
    let user = sqlx::query_as!(
        User,
        r#"
        SELECT id, email, username, password_hash, is_email_verified, status as "status: UserStatus", created_at, updated_at, last_login_at
        FROM users WHERE email = $1
        "#,
        payload.email
    )
    .fetch_optional(pool)
    .await?
    .ok_or(AppError::BadRequest("Invalid email or password".to_string()))?;

    // 2. Verify password
    let parsed_hash = PasswordHash::new(&user.password_hash)
        .map_err(|_| AppError::Internal)?;
    
    Argon2::default()
        .verify_password(payload.password.as_bytes(), &parsed_hash)
        .map_err(|_| AppError::BadRequest("Invalid email or password".to_string()))?;

    // 3. Generate Tokens
    let access_token = generate_access_token(user.id, config)?;
    let raw_refresh_token = generate_refresh_token();
    
    // 4. Hash the refresh token before saving (Security Best Practice)
    let mut hasher = Sha256::new();
    hasher.update(raw_refresh_token.as_bytes());
    let refresh_token_hash = format!("{:x}", hasher.finalize());

    // 5. Save to Database

    let expires_at = Utc::now() + Duration::days(30); // Standard chrono type

    // Use sqlx::query (no exclamation mark) + .bind()
    sqlx::query(
        r#"
        INSERT INTO refresh_tokens (user_id, token_hash, expires_at)
        VALUES ($1, $2, $3)
        "#
    )
    .bind(user.id)            // Binds to $1
    .bind(refresh_token_hash) // Binds to $2
    .bind(expires_at)         // Binds to $3 - SQLx accepts chrono here!
    .execute(pool)
    .await
    .map_err(|e| {
        tracing::error!("Failed to save refresh token: {}", e);
        AppError::Internal
    })?;

    // 6. Return both
    // Note: We return the RAW refresh token to the user, but we stored the HASH.
    Ok(LoginResponseDto {
        access_token,
        refresh_token: raw_refresh_token, 
    })
}

pub async fn refresh_access_token_service(
    pool: &PgPool,
    config: &Config,
    raw_refresh_token: &str, // Coming from cookie
) -> Result<(String, String), AppError> { // (AccessToken, NewRefreshToken)
    
    // 1. Hash the incoming raw token to find it in DB
    let mut hasher = Sha256::new();
    hasher.update(raw_refresh_token.as_bytes());
    let token_hash = format!("{:x}", hasher.finalize());

    // 2. Find token in DB (Join with users to check if user is still active)
    let token_record = sqlx::query!(
        r#"
        SELECT rt.id, rt.user_id, rt.expires_at, rt.revoked, 
               u.status as "user_status: UserStatus"
        FROM refresh_tokens rt
        JOIN users u ON u.id = rt.user_id
        WHERE rt.token_hash = $1
        "#,
        token_hash
    )
    .fetch_optional(pool)
    .await?
    .ok_or(AppError::Unauthorized)?; 

    // 3. Security Checks
    if token_record.revoked {
        // REUSE DETECTION: If a revoked token is used, it's a theft.
        // Action: Delete ALL tokens for this user to force re-login everywhere.
        sqlx::query!("DELETE FROM refresh_tokens WHERE user_id = $1", token_record.user_id)
            .execute(pool).await?;
        tracing::warn!("Revoked token reuse detected! User {} logged out.", token_record.user_id);
        return Err(AppError::Unauthorized);
    }

    if token_record.expires_at < Utc::now() {
        return Err(AppError::Unauthorized);
    }

    // 4. Token Rotation: Revoke the OLD token
    sqlx::query!("UPDATE refresh_tokens SET revoked = true WHERE id = $1", token_record.id)
        .execute(pool).await?;

    // 5. Generate NEW tokens
    let new_access_token = generate_access_token(token_record.user_id, config)?;
    let new_raw_refresh_token = generate_refresh_token();
    
    // 6. Save NEW refresh token
    let mut new_hasher = Sha256::new();
    new_hasher.update(new_raw_refresh_token.as_bytes());
    let new_hash = format!("{:x}", new_hasher.finalize());
    let expires_at = Utc::now() + Duration::days(30);

    sqlx::query(
        "INSERT INTO refresh_tokens (user_id, token_hash, expires_at) VALUES ($1, $2, $3)"
    )
    .bind(token_record.user_id)
    .bind(new_hash)
    .bind(expires_at)
    .execute(pool).await.map_err(|_| AppError::Internal)?;

    Ok((new_access_token, new_raw_refresh_token))
}