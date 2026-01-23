use std::env;
use dotenvy::dotenv;

#[derive(Clone)]
pub struct Config {
    pub database_url: String,
    pub max_db_connections: u32,
    pub smtp_server: String,
    pub smtp_username: String,
    pub smtp_password: String,
    pub admin_email: String,
}

impl Config {
    pub fn from_env() -> Self {
        dotenv().ok();

        let database_url = env::var("DATABASE_URL").expect("DATABASE_URL must be set");
        let max_db_connections = env::var("MAX_DB_CONNECTIONS")
            .unwrap_or_else(|_| "5".to_string())
            .parse()
            .expect("MAX_DB_CONNECTIONS must be a valid number");

        let smtp_server = env::var("SMTP_SERVER").expect("SMTP_SERVER must be set");
        let smtp_username = env::var("SMTP_USERNAME").expect("SMTP_USERNAME must be set");
        let smtp_password = env::var("SMTP_PASSWORD").expect("SMTP_PASSWORD must be set");
        let admin_email = env::var("ADMIN_EMAIL").expect("ADMIN_EMAIL must be set");

        Self {
            database_url,
            max_db_connections,
            smtp_server,
            smtp_username,
            smtp_password,
            admin_email,
        }
    }
}