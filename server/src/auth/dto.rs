use serde::{Deserialize, Serialize};
use time::OffsetDateTime;
use uuid::Uuid;
use validator::Validate;

use crate::auth::model::UserStatus;

#[derive(Debug, Validate, Deserialize, Serialize, Clone, Default)]
pub struct RegisterUserDto {
    #[validate(
      length(min = 1, message = "Email is required"),
      email(message = "Invalid email format"))]
    pub email: String,
    #[validate(length(min = 3, message = "Username must be at least 3 characters long"))]
    pub username: String,
    #[validate(
      length(min = 6, message = "Password must be at least 6 characters long"))]
    pub password: String,
}

#[derive(Debug, Validate, Deserialize, Serialize, Clone, Default)]
pub struct LoginDto {
    #[validate(
      length(min = 1, message = "Email is required"),
      email(message = "Invalid email format"))]
    pub email: String,
    #[validate(length(min = 6, message = "Password must be at least 6 characters long"))]
    pub password: String,
}

#[derive(Debug, Validate, Deserialize, Serialize)]
pub struct RefreshTokenDto {
    #[validate(length(min = 1, message = "Refresh token is required"))]
    pub refresh_token: String,
}

#[derive(Debug, Validate, Deserialize, Serialize)]
pub struct RequestQueryDto {
    #[validate(range(min = 1))]
    pub page: Option<usize>,
    #[validate(range(min = 1, max = 50))]
    pub per_page: Option<usize>,
}

#[derive(Debug, Deserialize, Serialize)]
pub struct UpdateUserDto {
    pub username: Option<String>,
    pub email: Option<String>,
    pub password: Option<String>,
}

#[derive(Debug, Validate, Deserialize, Serialize)]
pub struct VerifyEmailDto {
  #[validate(length(min = 1, message = "Token is required"))]
    pub token: String,
}

#[derive(Debug, Validate, Deserialize, Serialize)]
pub struct ResetPasswordDto {
  #[validate(length(min = 1, message = "Email is required"))]
    pub email: String,
}

pub struct ChangePasswordDto {
    pub token: String,
    pub new_password: String,
}

#[derive(Debug, Serialize)]
pub struct AuthResponseDto {
    pub access_token: String,   
    pub refresh_token: String,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct LoginResponseDto {
    pub access_token: String,   // Renamed from 'token' to be explicit
    pub refresh_token: String,  // New field
    pub user: UserResponseDto,
}

#[derive(Debug, Deserialize, Serialize)]
pub struct UserResponseDto {
    pub id: Uuid,
    pub email: String,
    pub username: Option<String>,
    pub is_email_verified: bool,
    pub status: UserStatus,
    pub created_at: OffsetDateTime,
    pub updated_at: OffsetDateTime,
    pub last_login_at: Option<OffsetDateTime>,
}