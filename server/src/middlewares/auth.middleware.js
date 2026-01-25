import jwt from "jsonwebtoken";
import { env } from "../config/env.js";

export const verifyUser = (req, res, next) => {
  // 1. Check for the token in the cookies
  const token = req.cookies?.accessToken;

  if (!token) {
    const error = new Error("Unauthorized: No access token provided");
    error.statusCode = 401;
    return next(error);
  }

  try {
    const decoded = jwt.verify(token, env.JWT_ACCESS_SECRET);
    req.user = decoded; 
    next();
  } catch (err) {
    const error = new Error("Unauthorized: Invalid or expired token");
    error.statusCode = 401;
    next(error);
  }
};