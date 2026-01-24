
use serde::{Serialize, Deserialize};
use sqlx::types::time::OffsetDateTime;
use chrono::DateTime as UtcDateTime;
use uuid::Uuid;
use chrono::Utc;



use crate::helpers::uuid_v4;


#[derive(Debug, Serialize, Deserialize, sqlx::Type)]
#[sqlx(type_name = "user_status", rename_all = "lowercase")]
pub enum UserStatus {
    Active,
    Inactive,
    Suspended,
}

impl UserStatus {
    pub fn as_str(&self) -> &str {
        match self {
            UserStatus::Active => "active",
            UserStatus::Inactive => "inactive",
            UserStatus::Suspended => "suspended",
        }
    }
}

impl Default for UserStatus {
    fn default() -> Self {
        UserStatus::Active
    }
}

#[derive(Debug, Serialize, Deserialize, sqlx::FromRow)]
pub struct User {
  #[serde(default = "uuid_v4")]
    pub id: Uuid,
    pub email: String,
    pub username: Option<String>,
    pub password_hash: String,
    pub is_email_verified: bool,
    pub status: UserStatus, // <-- use enum
    pub created_at: OffsetDateTime,
    pub updated_at: OffsetDateTime,
    pub last_login_at: Option<OffsetDateTime>,
}
#[derive(Debug, Serialize, Deserialize, sqlx::FromRow)]
pub struct RefreshToken {
    pub user_id: Uuid,
    pub token: String,
    pub expires_at: DateTime<Utc>,
}
