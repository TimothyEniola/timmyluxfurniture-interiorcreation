import { env } from "../config/env.js";
import { logger } from "../config/logger.js";

// 1. Handle "Route Not Found" (404)
export const notFoundHandler = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error); // Pass error to the global handler below
};

// 2. Global Error Handler
export const globalErrorHandler = (err, req, res, next) => {
  // If status code is 200 (default), set it to 500 because we have an error
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;

  res.status(statusCode);

  // Log the error (In production, use Winston here instead of console.error)
  logger.error(err.message, { 
    method: req.method, 
    url: req.url, 
    stack: err.stack 
  });

  res.json({
    message: err.message,
    // Only show stack trace if NOT in production
    stack: env.NODE_ENV === "production" ? null : err.stack,
  });
};
