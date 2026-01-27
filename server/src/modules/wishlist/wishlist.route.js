import { Router } from "express";
import { getWishlist, addToWishlist, removeFromWishlist } from "./wishlist.controller.js";
import { verifyUser } from "../../middlewares/auth.middleware.js";

const router = Router();

router.use(verifyUser);

router.get("/", getWishlist);
router.post("/", addToWishlist);
router.delete("/:productId", removeFromWishlist);

export default router;