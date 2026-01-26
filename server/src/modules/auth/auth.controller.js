import * as authService from "./auth.service.js";
import { env } from "../../config/env.js";

// Helper for cookie options
const cookieOptions = {
  httpOnly: true, // Prevents JS access
  secure: env.NODE_ENV === "production", // HTTPS only in prod
  sameSite: "strict", // CSRF protection
};

export const registerUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    const result = await authService.register(name, email, password);

    res.status(201).json({
      message: "User registered successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const {accessToken, sessionId, user} = await authService.login(email, password);

    // Set Cookies
    res.cookie("accessToken", accessToken, {
      ...cookieOptions,
      maxAge: 15 * 60 * 1000,
    }); // 15 mins
    res.cookie("sessionId", sessionId, {
      ...cookieOptions,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    }); // 7 days

    res.status(200).json({
      message: "Login successful",
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

export const refreshToken = async (req, res, next) => {
  try {
    // Get the Session ID from the cookie
    const sessionId = req.cookies.sessionId;

    if (!sessionId) {
      const error = new Error("No session found");
      error.statusCode = 401;
      throw error;
    }

    const { newAccessToken } = await authService.refresh(sessionId);

    // Set the new Access Token cookie
    res.cookie("accessToken", newAccessToken, { ...cookieOptions, maxAge: 15 * 60 * 1000 });

    res.status(200).json({ message: "Token refreshed" });
  } catch (error) {
    next(error);
  }
};

export const logoutUser = async (req, res, next) => {
  try {
    const sessionId = req.cookies.sessionId;
    
    // Clear DB record
    await authService.logout(sessionId);

    // Clear Cookies
    res.clearCookie("accessToken");
    res.clearCookie("sessionId");

    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    next(error);
  }
};
