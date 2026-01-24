use axum::{Router, routing::post};
use crate::types::app_state::AppState;
use crate::auth::controller::{register_user, login_user};

pub fn router() -> Router<AppState> {
    Router::new()
        .route("/register", post(register_user))
        .route("/login", post(login_user))
}
