import { Router } from "express";
import { getCart, addToCart, updateCartItem, removeCartItem } from "./cart.controller.js";
import { authenticate } from "../../middlewares/auth.middleware.js";

const router = Router();

router.use(authenticate); // All cart routes require login

router.get("/", getCart);
router.post("/", addToCart);
router.put("/items/:itemId", updateCartItem);
router.delete("/items/:itemId", removeCartItem);

export default router;