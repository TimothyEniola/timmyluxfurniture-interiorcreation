use serde::{Deserialize, Serialize};
use validator::Validate;

#[derive(Deserialize, Validate)]
pub struct CreateOrderDto {
    pub customer_name: String,
    pub customer_email: String,
    pub customer_phone: String,
    pub address: String,
    pub city: String,
    pub state: String,
    pub items: Vec<OrderItemDto>,
    pub total_amount: f64,
    pub payment_method: String,
}

#[derive(Deserialize, Serialize)]
pub struct OrderItemDto {
    pub product_id: String,
    pub name: String,
    pub price: f64,
    pub quantity: i32,
}