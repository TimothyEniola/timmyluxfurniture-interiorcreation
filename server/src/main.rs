mod config;
mod db;
mod auth;
mod types;
mod helpers;
mod middlewares;

use std::time::Duration;

use axum::{Router, http::{Method, StatusCode}, serve};
use tokio::net::TcpListener;
use tower_http::{
    cors::{CorsLayer, Any},
    trace::TraceLayer,
    timeout::TimeoutLayer,
    compression::CompressionLayer,
    limit::RequestBodyLimitLayer,
};

use config::Config;
use db::connect_db_pool;
use types::app_state::AppState;

#[tokio::main]
async fn main() {
    dotenvy::dotenv().ok();

    // Initialize tracing
    tracing_subscriber::fmt()
        .with_max_level(tracing::Level::DEBUG)
        .init();

    //configure cors
    let cors = CorsLayer::new()
        .allow_methods([Method::GET, Method::POST, Method::PATCH, Method::DELETE])
        .allow_origin(Any) // Change this to specific origins in production
        .allow_headers(Any);


    let config = Config::from_env();
    let db_pool = connect_db_pool(&config).await;

    let state = AppState { db: db_pool.clone(), config: config.clone() };

    let app = Router::new()
        .merge(auth::route::router())
        .with_state(state)
        // Layers run from bottom to top (inner to outer)
        // 4. Trace Layer (Logging)
        .layer(TraceLayer::new_for_http())
        // 3. Compression (Gzip/Brotli)
        .layer(CompressionLayer::new())
        // 2. Timeout (Cancel requests that take too long)
        .layer(TimeoutLayer::with_status_code(StatusCode::REQUEST_TIMEOUT, Duration::from_secs(30)))
        // 1. CORS (Handle Cross-Origin requests)
        .layer(cors)
        // 0. Safety: Limit request body size to prevent DoS (e.g., 10MB)
        .layer(RequestBodyLimitLayer::new(1024 * 1024 * 10));
    


    let listener = TcpListener::bind("0.0.0.0:3000").await.unwrap();
    tracing::info!("Server running on http://localhost:3000");
    
    serve(listener, app)
        .with_graceful_shutdown(shutdown_signal())
        .await.unwrap();

}

async fn shutdown_signal() {
    let ctrl_c = async {
        tokio::signal::ctrl_c()
            .await
            .expect("failed to install Ctrl+C handler");
    };

    #[cfg(unix)]
    let terminate = async {
        tokio::signal::unix::signal(tokio::signal::unix::SignalKind::terminate())
            .expect("failed to install signal handler")
            .recv()
            .await;
    };

    #[cfg(not(unix))]
    let terminate = std::future::pending::<()>();

    tokio::select! {
        _ = ctrl_c => {},
        _ = terminate => {},
    }
}