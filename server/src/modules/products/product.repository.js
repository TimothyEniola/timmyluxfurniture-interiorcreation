import { pool } from "../../config/db.js";

export class ProductRepository {
  async findAll() {
    const result = await pool.query("SELECT * FROM products ORDER BY created_at DESC");
    return result.rows;
  }

  async findById(id) {
    const result = await pool.query("SELECT * FROM products WHERE id = $1", [id]);
    return result.rows[0];
  }

  async create(product) {
    const { name, description, price, category, image, featured, available } = product;
    const result = await pool.query(
      `INSERT INTO products (name, description, price, category, image, featured, available)
       VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
      [name, description, price, category, image, featured || false, available || true]
    );
    return result.rows[0];
  }

  async update(id, product) {
    const fields = [];
    const values = [];
    let idx = 1;

    Object.keys(product).forEach((key) => {
      fields.push(`${key} = $${idx}`);
      values.push(product[key]);
      idx++;
    });

    values.push(id);
    const query = `UPDATE products SET ${fields.join(", ")} WHERE id = $${idx} RETURNING *`;
    
    const result = await pool.query(query, values);
    return result.rows[0];
  }

  async delete(id) {
    const result = await pool.query("DELETE FROM products WHERE id = $1 RETURNING *", [id]);
    return result.rows[0];
  }
}