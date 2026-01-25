import express from 'express';
import {config} from "dotenv";
import cors from "cors";
import helmet from "helmet";

import authRoutes from "./modules/auth/auth.route.js";
import { globalErrorHandler, notFoundHandler } from './middlewares/error.middleware.js';

config();


const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());

app.use("/api/v1/auth", authRoutes);

app.use(notFoundHandler);
app.use(globalErrorHandler);


export default app;