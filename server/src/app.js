import express from "express";
import { config } from "dotenv";
import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";

import authRoutes from "./modules/auth/auth.route.js";
import userRoutes from "./modules/user/user.route.js";
import {
  globalErrorHandler,
  notFoundHandler,
} from "./middlewares/error.middleware.js";

config();

const app = express();

app.use(helmet());
app.use(
  cors({
    origin: "http://localhost:4000",
    credentials: true,
  }),
);
app.use(cookieParser());
app.use(express.json());

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/users", userRoutes);

app.use(notFoundHandler);
app.use(globalErrorHandler);

export default app;
