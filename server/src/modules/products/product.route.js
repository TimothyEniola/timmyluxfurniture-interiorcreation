import { Router } from "express";
import { 
  getAllProducts, 
  getProductById, 
  createProduct, 
  updateProduct, 
  deleteProduct 
} from "./product.controller.js";
import { authenticate } from "../../middlewares/auth.middleware.js"; // Assuming you have this

const router = Router();

// Public routes
router.get("/", getAllProducts);
router.get("/:id", getProductById);

// Protected routes (Admin only logic should be added to middleware eventually)
router.post("/", authenticate, createProduct);
router.put("/:id", authenticate, updateProduct);
router.delete("/:id", authenticate, deleteProduct);

export default router;