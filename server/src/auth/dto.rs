use crate::auth::model::User;
use serde::{Deserialize, Serialize};
use validator::Validate;

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

pub struct AuthResponseDto {
    pub token: String,
}

#[derive(Debug, Deserialize, Serialize)]
pub struct UserResponseDto {
    pub id: String,
    pub email: String,
    pub username: Option<String>,
    pub is_email_verified: bool,
    pub status: String,
    pub created_at: String,
    pub updated_at: String,
    pub last_login_at: Option<String>,
}