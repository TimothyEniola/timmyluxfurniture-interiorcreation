import { Router } from "express";

import { validate } from "../../middlewares/validate.middleware.js";
import { registerSchema, loginSchema } from "./auth.validation.js";
import {
  registerUser,
  loginUser,
  refreshToken,
  logoutUser,
} from "./auth.controller.js";

const router = Router();

router.post("/register", validate(registerSchema), registerUser);
router.post("/login", validate(loginSchema), loginUser);
router.post("/refresh-token", refreshToken);
router.post("/logout", logoutUser);

export default router;
