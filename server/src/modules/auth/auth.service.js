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
  const user = await authRepository.findUserByEmail(email);
  if (!user || !(await bcrypt.compare(password, user.password_hash))) {
    const error = new Error("Invalid email or password");
    error.statusCode = 401;
    throw error;
  }

  // 1. Generate Access Token (Short lived JWT)
  const accessToken = jwt.sign(
    { id: user.id, email: user.email },
    env.JWT_ACCESS_SECRET,
    { expiresIn: "15m" }
  );

  // 2. Generate Session ID (Opaque Refresh Token)
  // This is just a random string, NOT a JWT.
  const sessionId = crypto.randomUUID();

  // 3. Save Session ID to DB
  await authRepository.saveRefreshToken(user.id, sessionId);

  return { accessToken, sessionId, user };
};

export const refresh = async (sessionId) => {
  // 1. Lookup the Session ID in the DB
  const storedToken = await authRepository.findRefreshToken(sessionId);

  if (!storedToken) {
    const error = new Error("Invalid session");
    error.statusCode = 403; // Forbidden
    throw error;
  }

  // 2. Check Expiry
  if (new Date() > new Date(storedToken.expires_at)) {
    await authRepository.deleteRefreshToken(sessionId); // Cleanup
    const error = new Error("Session expired");
    error.statusCode = 403;
    throw error;
  }

  // 3. Generate NEW Access Token
  const newAccessToken = jwt.sign(
    { id: storedToken.user_id, email: storedToken.email },
    env.JWT_ACCESS_SECRET,
    { expiresIn: "15m" }
  );

  // Optional: Rotate the Session ID here for maximum security (delete old, issue new)

  return { newAccessToken };
};

export const logout = async (sessionId) => {
    if(sessionId) {
        await authRepository.deleteRefreshToken(sessionId);
    }
}
