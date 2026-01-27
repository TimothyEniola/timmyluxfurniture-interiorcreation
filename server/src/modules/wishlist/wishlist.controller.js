import { WishlistRepository } from "./wishlist.repository.js";

const wishlistRepo = new WishlistRepository();

export const getWishlist = async (req, res, next) => {
  try {
    const wishlist = await wishlistRepo.getWishlist(req.user.id);
    res.status(200).json({ status: "success", data: wishlist });
  } catch (error) {
    next(error);
  }
};

export const addToWishlist = async (req, res, next) => {
  try {
    const { productId } = req.body;
    await wishlistRepo.addItem(req.user.id, productId);
    
    // Return updated list
    const updatedWishlist = await wishlistRepo.getWishlist(req.user.id);
    res.status(200).json({ status: "success", data: updatedWishlist });
  } catch (error) {
    next(error);
  }
};

export const removeFromWishlist = async (req, res, next) => {
  try {
    const { productId } = req.params;
    await wishlistRepo.removeItem(req.user.id, productId);
    
    const updatedWishlist = await wishlistRepo.getWishlist(req.user.id);
    res.status(200).json({ status: "success", data: updatedWishlist });
  } catch (error) {
    next(error);
  }
};