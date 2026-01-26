'use strict';

export async function up(db) {
  return db.runSql(`
    -- Ensure UUID extension exists
    CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

    -- Create Category Enum (excluding 'All')
    DO $$ BEGIN
      CREATE TYPE category_enum AS ENUM ('Bedroom', 'Living Room', 'Dining', 'Office', 'Storage');
    EXCEPTION
      WHEN duplicate_object THEN null;
    END $$;

    CREATE TABLE products (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        name VARCHAR(255) NOT NULL,
        description TEXT,
        price DECIMAL(10, 2) NOT NULL,
        category category_enum NOT NULL,
        image TEXT,
        featured BOOLEAN DEFAULT FALSE,
        available BOOLEAN DEFAULT TRUE,
        has_discount BOOLEAN DEFAULT FALSE,
        discount_price DECIMAL(10, 2),
        created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
    );
  `);
}

export async function down(db) {
  return db.runSql(`
    DROP TABLE IF EXISTS products;
    DROP TYPE IF EXISTS category_enum;
  `);
}