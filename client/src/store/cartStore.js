import { create } from "zustand";
import { cartService } from "../api/cartService";

export const useCartStore = create((set, get) => ({
  cart: [], // Array of items
  cartId: null,
  isLoading: false,
  error: null,

  fetchCart: async () => {
    set({ isLoading: true });
    try {
      const response = await cartService.getCart();
      // Backend returns { status: "success", data: { id, items: [...] } }
      const cartData = response.data;
      set({ 
        cart: cartData.items || [], 
        cartId: cartData.id,
        isLoading: false 
      });
    } catch (error) {
      console.error("Failed to fetch cart:", error);
      set({ error: error.message, isLoading: false });
    }
  },

  addToCart: async (productId, quantity = 1) => {
    set({ isLoading: true });
    try {
      const response = await cartService.addToCart(productId, quantity);
      // Response contains the updated cart object
      set({ cart: response.data.items, isLoading: false });
    } catch (error) {
      set({ error: error.message, isLoading: false });
      alert("Please login to add items to cart");
    }
  },

  removeFromCart: async (itemId) => {
    try {
      const response = await cartService.removeItem(itemId);
      set({ cart: response.data.items });
    } catch (error) {
      set({ error: error.message });
    }
  },

  updateQuantity: async (itemId, quantity) => {
    try {
      const response = await cartService.updateItemQuantity(itemId, quantity);
      set({ cart: response.data.items });
    } catch (error) {
      set({ error: error.message });
    }
  },

  getCartTotal: () => {
    const { cart } = get();
    return cart.reduce((total, item) => total + Number(item.price) * item.quantity, 0);
  },
  
  getCartCount: () => {
    const { cart } = get();
    return cart.reduce((count, item) => count + item.quantity, 0);
  }
}));