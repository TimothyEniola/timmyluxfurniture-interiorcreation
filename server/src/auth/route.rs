use axum::{Router, routing::post};
use crate::types::app_state::AppState;
use crate::auth::controller::register_user;

pub fn router() -> Router<AppState> {
    Router::new()
        .route("/", post(register_user))
}
