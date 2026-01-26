'use strict';

export async function up(db) {
  return db.runSql(`
    CREATE TABLE addresses (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        user_id UUID REFERENCES users(id) ON DELETE CASCADE,
        street VARCHAR(255),
        house_number VARCHAR(50),
        lga VARCHAR(100),
        state VARCHAR(100),
        created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
    );
  `);
};

export async function down(db) {
  return db.runSql('DROP TABLE IF EXISTS addresses;');
};