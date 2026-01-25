import { Router } from "express";

const router = Router();
//public
router.post("/", createOrder);
router.get("/history", getOrderHistory);

//admin
router.get("/all", getAllOrders);
router.put("/:id/status", updateOrderStatus);
// pending shipped delivered canceled

export default router;
