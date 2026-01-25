import winston from "winston";
import { env } from "./env.js";

const { combine, timestamp, printf, colorize, json } = winston.format;

// Custom format for local development
const logFormat = printf(({ level, message, timestamp, stack }) => {
  return `${timestamp} ${level}: ${stack || message}`;
});

export const logger = winston.createLogger({
  level: env.NODE_ENV === "production" ? "info" : "debug",
  format: combine(
    timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    env.NODE_ENV === "production" ? json() : combine(colorize(), logFormat)
  ),
  transports: [
    new winston.transports.Console(),
    // Optional: Add File transport for production errors
    // new winston.transports.File({ filename: 'error.log', level: 'error' }),
  ],
});