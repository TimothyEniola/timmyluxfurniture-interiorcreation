use lettre::transport::smtp::authentication::Credentials;
use lettre::{Message, SmtpTransport, Transport};
use crate::config::Config;
use crate::order::dto::CreateOrderDto;

pub async fn send_order_notification(
    config: &Config,
    order_data: &CreateOrderDto,
) -> Result<(), Box<dyn std::error::Error>> {
    let email_body = format!(
        "New Order Received!\n\n\
        Customer Name: {}\n\
        Customer Email: {}\n\
        Customer Phone: {}\n\
        Address: {}\n\
        City: {}\n\
        State: {}\n\
        Payment Method: {}\n\
        Total Amount: ₦{}\n\n\
        Items:\n{}",
        order_data.customer_name,
        order_data.customer_email,
        order_data.customer_phone,
        order_data.address,
        order_data.city,
        order_data.state,
        order_data.payment_method,
        order_data.total_amount,
        order_data.items.iter().map(|item| {
            format!("- {} (Qty: {}, Price: ₦{})", item.name, item.quantity, item.price)
        }).collect::<Vec<_>>().join("\n")
    );

    let email = Message::builder()
        .from("".parse()?)
        .to(config.admin_email.parse()?)
        .subject("New Order Notification")
        .body(email_body)?;

    let creds = Credentials::new(config.smtp_username.clone(), config.smtp_password.clone());

    let mailer = SmtpTransport::relay(&config.smtp_server)?
        .credentials(creds)
        .build();

    mailer.send(&email)?;
    Ok(())
}