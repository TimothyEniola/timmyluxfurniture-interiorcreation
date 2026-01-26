import { CartRepository } from "./cart.repository.js";

const cartRepo = new CartRepository();

export const getCart = async (req, res, next) => {
  try {
    let cart = await cartRepo.findByUserId(req.user.id);
    if (!cart) {
      cart = await cartRepo.createCart(req.user.id);
    }
    res.status(200).json({ status: "success", data: cart });
  } catch (error) {
    next(error);
  }
};

export const addToCart = async (req, res, next) => {
  try {
    const { productId, quantity } = req.body;
    let cart = await cartRepo.findByUserId(req.user.id);
    if (!cart) {
      cart = await cartRepo.createCart(req.user.id);
    }
    
    await cartRepo.addItem(cart.id, productId, quantity || 1);
    
    // Return updated cart
    const updatedCart = await cartRepo.findByUserId(req.user.id);
    res.status(200).json({ status: "success", data: updatedCart });
  } catch (error) {
    next(error);
  }
};

export const updateCartItem = async (req, res, next) => {
  try {
    const { itemId } = req.params;
    const { quantity } = req.body;
    
    await cartRepo.updateItemQuantity(itemId, quantity);
    
    const updatedCart = await cartRepo.findByUserId(req.user.id);
    res.status(200).json({ status: "success", data: updatedCart });
  } catch (error) {
    next(error);
  }
};

export const removeCartItem = async (req, res, next) => {
  try {
    const { itemId } = req.params;
    await cartRepo.removeItem(itemId);
    
    const updatedCart = await cartRepo.findByUserId(req.user.id);
    res.status(200).json({ status: "success", data: updatedCart });
  } catch (error) {
    next(error);
  }
};