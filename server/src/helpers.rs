use uuid::Uuid;
use chrono::{DateTime, Utc};

pub fn uuid_v4() -> Uuid {
    Uuid::new_v4()
}

pub fn current_time() -> DateTime<Utc> {
    Utc::now()
}
