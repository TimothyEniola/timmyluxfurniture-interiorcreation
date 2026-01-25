'use strict';



export async function up(db) {
  // We return the promise so db-migrate knows when it's finished
  return db.runSql(`
    CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

    CREATE TABLE users (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        email VARCHAR(255) UNIQUE NOT NULL,
        password_hash TEXT NOT NULL,
        full_name VARCHAR(100),
        is_active BOOLEAN DEFAULT TRUE,
        created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
    );
  `);
};

export async function down(db) {
  return db.runSql('DROP TABLE IF EXISTS users;');
};

