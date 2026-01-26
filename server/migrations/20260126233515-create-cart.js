'use strict';

export async function up(db) {
  return db.runSql(`
    CREATE TABLE carts (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
        UNIQUE(user_id)
    );

    CREATE TABLE cart_items (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        cart_id UUID NOT NULL REFERENCES carts(id) ON DELETE CASCADE,
        product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
        quantity INTEGER NOT NULL DEFAULT 1 CHECK (quantity > 0),
        created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
        UNIQUE(cart_id, product_id)
    );
  `);
}

export async function down(db) {
  return db.runSql(`
    DROP TABLE IF EXISTS cart_items;
    DROP TABLE IF EXISTS carts;
  `);
}