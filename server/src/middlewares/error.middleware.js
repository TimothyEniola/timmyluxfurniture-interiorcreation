import { env } from "../config/env.js";
import { logger } from "../config/logger.js";

// 404 handler
export const notFoundHandler = (req, res, next) => {
  const error = new Error(`Route Not Found - ${req.originalUrl}`);
  error.statusCode = 404;
  next(error);
};

// Global error handler
export const globalErrorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || res.statusCode || 500;

  res.status(statusCode);

  // Log properly
  if (statusCode >= 500) {
    logger.error(err.message, {
      method: req.method,
      url: req.url,
      stack: err.stack,
    });
  } else {
    logger.warn(err.message, {
      method: req.method,
      url: req.url,
    });
  }

  res.json({
    message:
      env.NODE_ENV === "production" && statusCode === 500
        ? "Internal server error"
        : err.message,
    stack: env.NODE_ENV === "production" ? undefined : err.stack,
  });
};
