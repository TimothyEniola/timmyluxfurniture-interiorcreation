import { pool } from "../../config/db.js";

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

export const findRefreshToken = async (token) => {
  const query = `
    SELECT rt.*, u.email 
    FROM refresh_tokens rt
    JOlN users u ON rt.user_id = u.id
    WHERE rt.token = $1 AND rt.is_revoked = FALSE
  `;
  const result = await pool.query(query, [token]);
  return result.rows[0];
};

export const deleteRefreshToken = async (token) => {
  const query = `DELETE FROM refresh_tokens WHERE token = $1`;
  await pool.query(query, [token]);
};
