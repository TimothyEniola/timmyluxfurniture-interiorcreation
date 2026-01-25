import { config } from "dotenv";

config();

const getEnv = (key, defaultValue) => {
  const value = process.env[key] || defaultValue;
  if (value === undefined) {
    throw new Error(`Missing required environment variable: ${key}`);
  }
  return value;
};

const getEnvNumber = (key, defaultValue) => {
  const value = getEnv(key, defaultValue);
  const parsed = parseInt(value, 10);
  if (isNaN(parsed)) {
    throw new Error(`Environment variable ${key} must be a number`);
  }
  return parsed;
};

export const env = {
  PORT: getEnvNumber("PORT", 3000),

  PG_USER: getEnv("PG_USER"),
  PG_HOST: getEnv("PG_HOST"),
  PG_NAME: getEnv("PG_NAME"),
  PG_PASSWORD: getEnv("PG_PASSWORD"),
  PG_PORT: getEnvNumber("PG_PORT"),

  NODE_ENV: getEnv("NODE_ENV", "development"),
};
