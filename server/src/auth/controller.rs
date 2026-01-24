use axum::{extract::State, http::StatusCode, Json, response::IntoResponse};
use validator::Validate;

use crate::{auth::dto::AuthResponseDto, config::{self, Config}, types::{app_state::AppState, error::AppError}};
use super::{dto::{LoginDto, RegisterUserDto, UserResponseDto, LoginResponseDto,}, service};

use super::dto::RefreshTokenDto; 

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
    Json(payload): Json<LoginDto>,
) -> Result<impl IntoResponse, AppError> {
    payload.validate()
        .map_err(|e| AppError::BadRequest(e.to_string()))?;

    let token = service::login_user_service(
        &state.db,
        &state.config,
        payload
    ).await?;

    Ok((
        StatusCode::OK,
        Json(AuthResponseDto { access_token: token.access_token, refresh_token: token.refresh_token })
    ))
}


pub async fn refresh_token(
    State(state): State<AppState>,
    Json(payload): Json<RefreshTokenDto>,
) -> Result<impl IntoResponse, AppError> {
    payload.validate().map_err(|e| AppError::BadRequest(e.to_string()))?;

    let tokens = service::refresh_access_token_service(
        &state.db, 
        &state.config, 
        payload
    ).await?;

    Ok((StatusCode::OK, Json(tokens)))
}