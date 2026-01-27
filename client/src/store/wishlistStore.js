import { create } from "zustand";
import { wishlistService } from "../api/wishlistService";

export const useWishlistStore = create((set, get) => ({
  wishlist: [],
  isLoading: false,
  error: null,

  fetchWishlist: async () => {
    set({ isLoading: true });
    try {
      const response = await wishlistService.getWishlist();
      set({ wishlist: response.data, isLoading: false });
    } catch (error) {
      set({ error: error.message, isLoading: false });
    }
  },

  addToWishlist: async (productId) => {
    try {
      const response = await wishlistService.addToWishlist(productId);
      set({ wishlist: response.data });
    } catch (error) {
      console.error("Add to wishlist failed", error);
      throw error; // Let component handle auth redirect if needed
    }
  },

  removeFromWishlist: async (productId) => {
    try {
      const response = await wishlistService.removeFromWishlist(productId);
      set({ wishlist: response.data });
    } catch (error) {
      console.error("Remove from wishlist failed", error);
    }
  },

  isInWishlist: (productId) => {
    return get().wishlist.some(item => item.id === productId);
  }
}));