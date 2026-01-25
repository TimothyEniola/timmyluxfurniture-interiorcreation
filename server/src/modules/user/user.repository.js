import { pool } from "../../config/db.js";


const USER_RETURN_FIELDS = "id, email, full_name, role, created_at";

export const findUserById = async (userId) => {
  const query = `SELECT ${USER_RETURN_FIELDS} FROM users WHERE id = $1`;
  const result = await pool.query(query, [userId]);
  return result.rows[0];
};

export const updateUserProfile = async (userId, updateData) => {
  const { full_name } = updateData;
  
  // Simple update query - in production, you might build this dynamically based on fields provided
  const query = `
    UPDATE users 
    SET full_name = $1, updated_at = NOW()
    WHERE id = $2
    RETURNING ${USER_RETURN_FIELDS}
  `;
  
  const result = await pool.query(query, [full_name, userId]);
  return result.rows[0];
};

// Placeholder for when you have a 'products' table
export const getGenericRecommendations = async (limit = 5) => {
  // Example: SELECT * FROM products ORDER BY created_at DESC LIMIT $1
  // For now, we return a mock because we don't have a product table
  return []; 
};