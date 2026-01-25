import { pool } from "../../config/db.js";
import { logger } from "../../config/logger.js";

export const findUserByEmail = async (email) => {
  const query = `SELECT * FROM users WHERE email = $1`;
  const result = await pool.query(query, [email]);
  return result.rows[0];
};

export const createUser = async (email, passwordHash) => {
  const query = `
    INSERT INTO users (email, password_hash)
    VALUES ($1, $2)
    RETURNING id, email, created_at
  `;
  const result = await pool.query(query, [email, passwordHash]);
  return result.rows[0];
};

export const saveRefreshToken = async (userId, token) => {
  // Assuming you have a table for this as per your migration
  // expires_at would ideally be calculated here or passed in
  const query = `
    INSERT INTO refresh_tokens (user_id, token, expires_at)
    VALUES ($1, $2, NOW() + INTERVAL '7 days')
  `;
  await pool.query(query, [userId, token]);
};