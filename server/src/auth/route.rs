use axum::{Router, routing::post};
use crate::types::app_state::AppState;
use crate::auth::controller::{register_user, login_user, refresh_token};

pub fn router() -> Router<AppState> {
    Router::new()
        .route("/register", post(register_user))
        .route("/login", post(login_user))
        .route("/refresh", post(refresh_token))
}
