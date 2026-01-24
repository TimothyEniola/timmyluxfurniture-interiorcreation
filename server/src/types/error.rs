use axum::{
    http::StatusCode,
    response::{IntoResponse, Response},
};
use tracing::error;
use std::borrow::Cow;

#[derive(Debug)]
pub enum AppError {
    Db(sqlx::Error),
    NotFound(String),
    BadRequest(String),
    Unauthorized,
    Forbidden,
    Internal,
    Hashed(String)
}

impl From<sqlx::Error> for AppError {
    fn from(err: sqlx::Error) -> Self {
        AppError::Db(err)
    }
}


impl IntoResponse for AppError {
    fn into_response(self) -> Response {
        let (status, message) = match self {
            AppError::Db(err) => {
                error!(error = %err, "Database error");
                (StatusCode::INTERNAL_SERVER_ERROR, Cow::Borrowed("Database error"))
            }
            AppError::NotFound(msg) => (StatusCode::NOT_FOUND, Cow::Owned(msg)),
            AppError::BadRequest(msg) => (StatusCode::BAD_REQUEST, Cow::Owned(msg)),
            AppError::Unauthorized => (StatusCode::UNAUTHORIZED, Cow::Borrowed("Unauthorized")),
            AppError::Forbidden => (StatusCode::FORBIDDEN, Cow::Borrowed("Forbidden")),
            AppError::Hashed(msg) => {
                error!(error = %msg, "Password hashing failed");
                (StatusCode::INTERNAL_SERVER_ERROR, Cow::Borrowed("Internal server error"))
            },
            AppError::Internal => (
                StatusCode::INTERNAL_SERVER_ERROR,
                Cow::Borrowed("Internal server error"),
            ),
        };

        (status, message).into_response()
    }
}
