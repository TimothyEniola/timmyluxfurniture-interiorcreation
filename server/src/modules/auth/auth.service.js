import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { env } from "../../config/env.js";
import * as authRepository from "./auth.repository.js";

export const register = async (email, password) => {
  // 1. Business Logic: Check if user already exists
  const existingUser = await authRepository.findUserByEmail(email);
  if (existingUser) {
    const error = new Error("User with this email already exists");
    error.statusCode = 409; // Service can define status codes for the controller/error handler
    throw error;
  }

  // 2. Business Logic: Hash the password
  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  // 3. Data Access: Create the user
  const newUser = await authRepository.createUser(email, passwordHash);

  // 4. Business Logic: Generate Tokens (Optional: or do this only at login)
  // const token = generateToken(newUser.id);

  return { user: newUser };
};

export const login = async (email, password) => {
  // 1. Find User
  const user = await authRepository.findUserByEmail(email);
  if (!user) {
    const error = new Error("Invalid email or password");
    error.statusCode = 401;
    throw error;
  }

  // 2. Compare Password
  const isMatch = await bcrypt.compare(password, user.password_hash);
  if (!isMatch) {
    const error = new Error("Invalid email or password");
    error.statusCode = 401;
    throw error;
  }

  // 3. Generate JWT Access & Refresh Tokens
  const accessToken = jwt.sign(
    { id: user.id, email: user.email },
    env.JWT_ACCESS_SECRET,
    { expiresIn: "15m" },
  );

  const refreshToken = jwt.sign({ id: user.id }, env.JWT_REFRESH_SECRET, {
    expiresIn: "7d",
  });

  // 4. Save Refresh Token in DB (Recommended for security)
  await authRepository.saveRefreshToken(user.id, refreshToken);

  return {
    user: {
      id: user.id,
      email: user.email,
    },
    accessToken,
    refreshToken,
  };
};
