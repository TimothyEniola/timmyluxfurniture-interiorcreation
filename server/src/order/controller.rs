use axum::{extract::State, http::StatusCode, Json};
use crate::types::app_state::AppState;
use crate::order::dto::CreateOrderDto;
use crate::helpers::email::send_order_notification;

pub async fn create_order(
    State(state): State<AppState>,
    Json(order_data): Json<CreateOrderDto>,
) -> Result<StatusCode, StatusCode> {
    // Here you could save the order to the database if needed
    // For now, just send the email

    match send_order_notification(&state.config, &order_data).await {
        Ok(_) => Ok(StatusCode::OK),
        Err(_) => Err(StatusCode::INTERNAL_SERVER_ERROR),
    }
}