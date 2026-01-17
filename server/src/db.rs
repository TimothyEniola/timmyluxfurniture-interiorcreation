use sqlx::PgPool;
use crate::config::Config;


pub async fn connect_db_pool(config: &Config) -> PgPool {
    PgPool::connect(&config.database_url)
        .await
        .expect("Failed to connect to the database")
} 