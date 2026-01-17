mod config;
mod db;
mod auth;
mod types;
mod helpers;

use axum::{Router, serve};
use tokio::net::TcpListener;

use config::Config;
use db::connect_db_pool;
use types::app_state::AppState;

#[tokio::main]
async fn main() {
    dotenvy::dotenv().ok();
    let config = Config::from_env();
    let db_pool = connect_db_pool(&config).await;

    let state = AppState { db: db_pool.clone() };

    let app = Router::new()
        .merge(auth::route::router())
        .with_state(state);


    let listener = TcpListener::bind("0.0.0.0:3000").await.unwrap();
    serve(listener, app).await.unwrap();

    println!("Server running on http://localhost:3000");
}
