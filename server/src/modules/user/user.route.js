import { Router } from "express";

import {
  getCurrentUser,
  updateCurrentUser,
  updateCurrentUserPassword,
  getUserAddresses,
  addUserAddress,
  getUserOrders,
  getUserWishlist,
  getUserRecommendations,
} from "./user.controller.js";

const router = Router();

router.get("/me", getCurrentUser);
router.put("/me", updateCurrentUser);
router.put("/password", updateCurrentUserPassword);
router.get("/addresses", getUserAddresses);
router.post("/addresses", addUserAddress);
router.get("/orders", getUserOrders);
router.get("/wishlist", getUserWishlist);
router.get("/recommendations", getUserRecommendations);

export default router;
