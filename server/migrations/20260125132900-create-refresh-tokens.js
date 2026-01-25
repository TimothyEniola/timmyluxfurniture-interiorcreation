'use strict';

export async function up(db) {
  return db.runSql(`
    CREATE TABLE refresh_tokens (
        id SERIAL PRIMARY KEY,
        token TEXT UNIQUE NOT NULL,
        user_id UUID NOT NULL,
        expires_at TIMESTAMPTZ NOT NULL,
        is_revoked BOOLEAN DEFAULT FALSE,
        created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
        
        CONSTRAINT fk_user
            FOREIGN KEY(user_id) 
            REFERENCES users(id)
            ON DELETE CASCADE
    );

    CREATE INDEX idx_refresh_tokens_token ON refresh_tokens(token);
  `);
};

export async function down(db) {
  return db.runSql('DROP TABLE IF EXISTS refresh_tokens;');
};

