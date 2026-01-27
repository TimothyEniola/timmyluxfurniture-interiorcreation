import { Router } from "express";
import { 
  getAllProducts, 
  getProductById, 
  createProduct, 
  updateProduct, 
  deleteProduct 
} from "./product.controller.js";
import { verifyUser } from "../../middlewares/auth.middleware.js"; // Assuming you have this

const router = Router();

// Public routes
router.get("/", getAllProducts);
router.get("/:id", getProductById);

// Protected routes (Admin only logic should be added to middleware eventually)
router.post("/", verifyUser, createProduct);
router.put("/:id", verifyUser, updateProduct);
router.delete("/:id", verifyUser, deleteProduct);

export default router;