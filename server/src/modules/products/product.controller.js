import { ProductRepository } from "./product.repository.js";
import { createProductSchema, updateProductSchema } from "./product.validation.js";

const productRepo = new ProductRepository();

export const getAllProducts = async (req, res, next) => {
  try {
    const products = await productRepo.findAll();
    res.status(200).json({ status: "success", data: products });
  } catch (error) {
    next(error);
  }
};

export const getProductById = async (req, res, next) => {
  try {
    const product = await productRepo.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ status: "error", message: "Product not found" });
    }
    res.status(200).json({ status: "success", data: product });
  } catch (error) {
    next(error);
  }
};

export const createProduct = async (req, res, next) => {
  try {
    const { error, value } = createProductSchema.validate(req.body);
    if (error) return res.status(400).json({ status: "error", message: error.details[0].message });

    const newProduct = await productRepo.create(value);
    res.status(201).json({ status: "success", data: newProduct });
  } catch (error) {
    next(error);
  }
};

export const updateProduct = async (req, res, next) => {
  try {
    const { error, value } = updateProductSchema.validate(req.body);
    if (error) return res.status(400).json({ status: "error", message: error.details[0].message });

    const updatedProduct = await productRepo.update(req.params.id, value);
    if (!updatedProduct) {
      return res.status(404).json({ status: "error", message: "Product not found" });
    }
    res.status(200).json({ status: "success", data: updatedProduct });
  } catch (error) {
    next(error);
  }
};

export const deleteProduct = async (req, res, next) => {
  try {
    const deletedProduct = await productRepo.delete(req.params.id);
    if (!deletedProduct) {
      return res.status(404).json({ status: "error", message: "Product not found" });
    }
    res.status(200).json({ status: "success", message: "Product deleted successfully" });
  } catch (error) {
    next(error);
  }
};