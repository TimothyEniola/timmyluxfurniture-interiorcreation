use axum::{
    extract::FromRequestParts,
    http::{StatusCode, request::Parts},
};
use async_trait::async_trait;
use axum::extract::State;
use jsonwebtoken::{decode, DecodingKey, Validation};
use serde::{Deserialize, Serialize};
use crate::types::app_state::AppState;
use crate::types::error::AppError; // Ensure you have this accessible

// 1. Define the claims structure inside your token
#[derive(Debug, Serialize, Deserialize)]
pub struct Claims {
    pub sub: String, // User ID
    pub role: String, // "admin", "user", etc.
    pub exp: usize,
}

// 2. The struct you want in your handler
pub struct AuthUser {
    pub id: String,
    pub role: String,
}

// 3. Implement FromRequestParts for AuthUser
#[async_trait]
impl FromRequestParts<AppState> for AuthUser {
    type Rejection = AppError;

    async fn from_request_parts(parts: &mut Parts, state: &AppState) -> Result<Self, Self::Rejection> {
        // A. Extract the token from the "Authorization" header
        let auth_header = parts
            .headers
            .get("Authorization")
            .and_then(|value| value.to_str().ok())
            .ok_or(AppError::Unauthorized)?;

        if !auth_header.starts_with("Bearer ") {
            return Err(AppError::Unauthorized);
        }

        let token = &auth_header[7..];

        // B. Verify the token (Use a real secret from env in production)
        let secret = std::env::var("JWT_SECRET").expect("JWT_SECRET must be set");
        let token_data = decode::<Claims>(
            token,
            &DecodingKey::from_secret(secret.as_bytes()),
            &Validation::default(),
        )
        .map_err(|_| AppError::Unauthorized)?;

        // C. (Optional) Check DB if user still exists/is active using 'state'
        // let user = sqlx::query!(...)
        //    .fetch_optional(&state.db) ...

        Ok(AuthUser {
            id: token_data.claims.sub,
            role: token_data.claims.role,
        })
    }
}