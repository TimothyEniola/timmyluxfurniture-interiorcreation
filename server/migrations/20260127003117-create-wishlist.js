'use strict';

export async function up(db) {
  return db.runSql(`
    CREATE TABLE wishlist_items (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
        created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
        UNIQUE(user_id, product_id)
    );
  `);
}

export async function down(db) {
  return db.runSql(`
    DROP TABLE IF EXISTS wishlist_items;
  `);
}