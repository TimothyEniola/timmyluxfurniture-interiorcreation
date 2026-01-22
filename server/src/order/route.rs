use axum::{Router, routing::post, extract::State};
use crate::types::app_state::AppState;
use crate::order::controller::create_order;

pub fn router() -> Router<AppState> {
    Router::new()
        .route("/orders", post(create_order))
}