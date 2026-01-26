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
  // Column mapping to handle camelCase -> snake_case and aliases
  const columnMapping = {
    profileImage: "profile_image",
    fullName: "full_name",
    name: "full_name",
    phoneNumber: "phone",
  };

  // 1. Process data to create a clean object with correct DB column names
  const dbUpdates = {};

  Object.keys(updateData).forEach((key) => {
    // Map the key to DB column or keep original if no mapping exists
    const dbKey = columnMapping[key] || key;

    // Assign the value (this naturally handles duplicates by overwriting)
    dbUpdates[dbKey] = updateData[key];
  });

  // 2. Remove fields that should not be manually updated or don't exist
  delete dbUpdates.id;
  delete dbUpdates.created_at;
  delete dbUpdates.updated_at;
  delete dbUpdates.email; // Usually email is handled separately or read-only here

  const fields = Object.keys(dbUpdates);
  const values = Object.values(dbUpdates);

  if (fields.length === 0) return null;

  // 3. Construct the Set Clause
  const setClause = fields
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
