use axum::{extract::State, http::StatusCode, Json, response::IntoResponse};
use axum_extra::extract::cookie::{Cookie, SameSite, CookieJar};
use validator::Validate;

use crate::{auth::dto::AuthResponseDto, config::{self, Config}, types::{app_state::AppState, error::AppError}};

use super::{dto::{LoginDto, RegisterUserDto, UserResponseDto, LoginResponseDto,}, service};


fn create_refresh_cookie(token: String) -> Cookie<'static> {
    Cookie::build(("refresh_token", token))
        .path("/auth/refresh") // Only send cookie to this specific path
        .http_only(true)       // JavaScript cannot read this (XSS protection)
        .secure(true)          // Only send over HTTPS (set false for localhost dev if needed)
        .same_site(SameSite::Strict)
        .max_age(time::Duration::days(30)) 
        .build()
}

pub async fn register_user(
    State(state): State<AppState>,
    Json(payload): Json<RegisterUserDto>,
) -> Result<impl IntoResponse, AppError> {
    payload.validate().map_err(|e| AppError::BadRequest(e.to_string()))?;

    let user = service::register_user_service(&state.db, payload).await?;

    
    Ok((StatusCode::CREATED, Json(UserResponseDto {
        id: user.id,
        email: user.email,
        username: user.username,
        is_email_verified: user.is_email_verified,
        status: user.status,
        created_at: user.created_at,
        updated_at: user.updated_at,
        last_login_at: user.last_login_at,
    })))
}


pub async fn login_user(
    State(state): State<AppState>,
    jar: CookieJar, // Add CookieJar to args
    Json(payload): Json<LoginDto>,
) -> Result<(CookieJar, impl IntoResponse), AppError> {
    payload.validate().map_err(|e| AppError::BadRequest(e.to_string()))?;

    // Service now returns `AuthResponseDto` which contains `refresh_token` string internally
    // You might need to adjust service return type or extract it here.
    // Assuming service returns struct with { access_token, refresh_token }:
    let tokens = service::login_user_service(&state.db, &state.config, payload).await?;

    let cookie = create_refresh_cookie(tokens.refresh_token);
    
    // Return ONLY access token in body, cookie in headers
    Ok((
        jar.add(cookie), 
        Json(AuthResponseDto { access_token: tokens.access_token })
    ))
}

pub async fn refresh_token(
    State(state): State<AppState>,
    jar: CookieJar,
) -> Result<(CookieJar, impl IntoResponse), AppError> {
    // 1. Get token from cookie
    let refresh_token = jar
        .get("refresh_token")
        .map(|c| c.value().to_string())
        .ok_or(AppError::Unauthorized)?;

    // 2. Call service (perform rotation)
    let (new_access, new_refresh) = service::refresh_access_token_service(
        &state.db, 
        &state.config, 
        &refresh_token
    ).await?;

    // 3. Update cookie with NEW refresh token
    let cookie = create_refresh_cookie(new_refresh);

    Ok((
        jar.add(cookie),
        Json(AuthResponseDto { access_token: new_access })
    ))
}

pub async fn logout_user(jar: CookieJar) -> (CookieJar, impl IntoResponse) {
    // To logout, we simply remove the cookie
    (jar.remove(Cookie::from("refresh_token")), StatusCode::OK)
}

