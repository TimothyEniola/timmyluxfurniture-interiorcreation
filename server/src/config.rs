use std::env;
use dotenvy::dotenv;

#[derive(Clone)]
pub struct Config {
    pub database_url: String,
    pub max_db_connections: u32,
}

impl Config {
    pub fn from_env() -> Self {
        dotenv().ok();

        let database_url = env::var("DATABASE_URL").expect("DATABASE_URL must be set");
        let max_db_connections = env::var("MAX_DB_CONNECTIONS")
            .unwrap_or_else(|_| "5".to_string())
            .parse()
            .expect("MAX_DB_CONNECTIONS must be a valid number");

        Self {
            database_url,
            max_db_connections,
        }
    }
}