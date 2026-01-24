use axum::{
    extract::{FromRequestParts, State},
    http::request::Parts,
};
// use async_trait::async_trait;
use jsonwebtoken::{decode, DecodingKey, Validation};
use serde::{Deserialize, Serialize};

use crate::types::{app_state::AppState, error::AppError};

#[derive(Debug, Serialize, Deserialize)]
pub struct Claims {
    pub sub: String,
    pub exp: usize,
}

pub struct AuthUser {
    pub id: String,
}

// #[async_trait]
impl FromRequestParts<AppState> for AuthUser {
    type Rejection = AppError;

    async fn from_request_parts(parts: &mut Parts, state: &AppState) -> Result<Self, Self::Rejection> {
        let auth_header = parts
            .headers
            .get("Authorization")
            .and_then(|value| value.to_str().ok())
            .ok_or(AppError::Unauthorized)?;

        if !auth_header.starts_with("Bearer ") {
            return Err(AppError::Unauthorized);
        }

        let token = &auth_header[7..];

        let token_data = decode::<Claims>(
            token,
            &DecodingKey::from_secret(state.config.jwt_secret.as_bytes()),
            &Validation::default(),
        )
        .map_err(|_| AppError::Unauthorized)?;

        Ok(AuthUser {
            id: token_data.claims.sub,
        })
    }
}