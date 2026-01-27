import { pool } from "../../config/db.js";

export class WishlistRepository {
  async getWishlist(userId) {
    const query = `
      SELECT w.id, w.created_at, p.* FROM wishlist_items w
      JOIN products p ON w.product_id = p.id
      WHERE w.user_id = $1
      ORDER BY w.created_at DESC
    `;
    const result = await pool.query(query, [userId]);
    return result.rows;
  }

  async addItem(userId, productId) {
    // Check if exists to avoid error on duplicate (optional if you handle error in controller)
    const exists = await pool.query(
      "SELECT id FROM wishlist_items WHERE user_id = $1 AND product_id = $2",
      [userId, productId]
    );
    if (exists.rows.length > 0) return exists.rows[0];

    const result = await pool.query(
      "INSERT INTO wishlist_items (user_id, product_id) VALUES ($1, $2) RETURNING *",
      [userId, productId]
    );
    return result.rows[0];
  }

  async removeItem(userId, productId) {
    const result = await pool.query(
      "DELETE FROM wishlist_items WHERE user_id = $1 AND product_id = $2 RETURNING *",
      [userId, productId]
    );
    return result.rows[0];
  }
}