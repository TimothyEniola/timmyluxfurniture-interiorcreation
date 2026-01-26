import { pool } from "../../config/db.js";

export class CartRepository {
  async findByUserId(userId) {
    // Get cart and its items with product details
    const cartResult = await pool.query("SELECT * FROM carts WHERE user_id = $1", [userId]);
    if (cartResult.rows.length === 0) return null;
    
    const cart = cartResult.rows[0];
    const itemsResult = await pool.query(
      `SELECT ci.id, ci.quantity, p.id as product_id, p.name, p.price, p.image, p.category
       FROM cart_items ci
       JOIN products p ON ci.product_id = p.id
       WHERE ci.cart_id = $1`,
      [cart.id]
    );
    
    return { ...cart, items: itemsResult.rows };
  }

  async createCart(userId) {
    const result = await pool.query(
      "INSERT INTO carts (user_id) VALUES ($1) RETURNING *",
      [userId]
    );
    return { ...result.rows[0], items: [] };
  }

  async addItem(cartId, productId, quantity) {
    // Check if item exists in cart
    const existing = await pool.query(
      "SELECT * FROM cart_items WHERE cart_id = $1 AND product_id = $2",
      [cartId, productId]
    );

    if (existing.rows.length > 0) {
      const newQuantity = existing.rows[0].quantity + quantity;
      return this.updateItemQuantity(existing.rows[0].id, newQuantity);
    } else {
      const result = await pool.query(
        "INSERT INTO cart_items (cart_id, product_id, quantity) VALUES ($1, $2, $3) RETURNING *",
        [cartId, productId, quantity]
      );
      return result.rows[0];
    }
  }

  async updateItemQuantity(itemId, quantity) {
    if (quantity <= 0) {
      return this.removeItem(itemId);
    }
    const result = await pool.query(
      "UPDATE cart_items SET quantity = $1 WHERE id = $2 RETURNING *",
      [quantity, itemId]
    );
    return result.rows[0];
  }

  async removeItem(itemId) {
    await pool.query("DELETE FROM cart_items WHERE id = $1", [itemId]);
    return { id: itemId, deleted: true };
  }
  
  async clearCart(cartId) {
    await pool.query("DELETE FROM cart_items WHERE cart_id = $1", [cartId]);
    return true;
  }
}