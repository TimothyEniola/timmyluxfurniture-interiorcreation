import { Router } from "express";

const router = Router();
//public
router.get("/", getAllProducts);
router.get("/:id", getProductById);

//admin
router.post("/", createProduct);
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct);

export default router;
