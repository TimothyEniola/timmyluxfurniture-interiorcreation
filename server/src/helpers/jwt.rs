use chrono::{Duration, Utc};
use jsonwebtoken::{encode, EncodingKey, Header};
use rand::{distr::Alphanumeric, Rng};
use serde::{Deserialize, Serialize};

use crate::{config::Config, types::error::AppError};

#[derive(Debug, Serialize, Deserialize)]
pub struct Claims {
    pub sub: String, // User ID
    pub exp: usize,  // Expiration time
    pub iat: usize,  // Issued at
}

pub fn generate_access_token(user_id: uuid::Uuid, config: &Config) -> Result<String, AppError> {
    let now = Utc::now();
    // Access Token = Short lived (e.g., 15 minutes)
    let exp = (now + Duration::minutes(15)).timestamp() as usize; 
    
    let claims = Claims {
        sub: user_id.to_string(),
        exp,
        iat: now.timestamp() as usize,
    };

    encode(
        &Header::default(),
        &claims,
        &EncodingKey::from_secret(config.jwt_secret.as_bytes()),
    )
    .map_err(|_| AppError::Internal)
}

pub fn generate_refresh_token() -> String {
    // Refresh Token = Long lived, opaque random string
    rand::rng()
        .sample_iter(&Alphanumeric)
        .take(64) // 64 char random string
        .map(char::from)
        .collect()
}