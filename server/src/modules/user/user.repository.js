import { pool } from "../../config/db.js";

const USER_RETURN_FIELDS =
  "id, email, full_name, phone, profile_image, role, created_at";

export const findUserById = async (userId) => {
  const query = `SELECT ${USER_RETURN_FIELDS} FROM users WHERE id = $1`;
  const result = await pool.query(query, [userId]);
  return result.rows[0];
};

// NEW: Needed to verify old password before changing it
export const findUserPasswordHashById = async (userId) => {
  const query = `SELECT password_hash FROM users WHERE id = $1`;
  const result = await pool.query(query, [userId]);
  return result.rows[0];
};

// NEW: Update password
export const updateUserPassword = async (userId, newPasswordHash) => {
  const query = `UPDATE users SET password_hash = $1, updated_at = NOW() WHERE id = $2`;
  await pool.query(query, [newPasswordHash, userId]);
};

export const updateUserProfile = async (userId, updateData) => {
  const fields = Object.keys(updateData);
  const values = Object.values(updateData);

  if (fields.length === 0) return null;

  const dbFields = fields.map((field) => {
    if (field === "profileImage") return "profile_image";
    if (field === "fullName" || field === "name") return "full_name";
    return field;
  });

  const setClause = dbFields
    .map((field, index) => `"${field}" = $${index + 1}`)
    .join(", ");

  const query = `
    UPDATE users 
    SET ${setClause}, updated_at = NOW()
    WHERE id = $${fields.length + 1}
    RETURNING ${USER_RETURN_FIELDS}
  `;

  const result = await pool.query(query, [...values, userId]);
  return result.rows[0];
};

export const createAddress = async (userId, addressData) => {
  const { street, houseNumber, lga, state } = addressData;
  const query = `
        INSERT INTO addresses (user_id, street, house_number, lga, state)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING *
    `;
  const result = await pool.query(query, [
    userId,
    street,
    houseNumber,
    lga,
    state,
  ]);
  return result.rows[0];
};

export const findAddressesByUserId = async (userId) => {
  const query = `SELECT * FROM addresses WHERE user_id = $1 ORDER BY created_at DESC`;
  const result = await pool.query(query, [userId]);
  return result.rows;
};

// Placeholder for when you have a 'products' table
export const getGenericRecommendations = async (limit = 5) => {
  // Example: SELECT * FROM products ORDER BY created_at DESC LIMIT $1
  // For now, we return a mock because we don't have a product table
  return [];
};
