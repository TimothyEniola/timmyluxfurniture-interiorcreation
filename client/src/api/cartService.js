import api from "./axiosInstance";

export const cartService = {
  getCart: async () => {
    const response = await api.get("/cart");
    return response.data;
  },

  addToCart: async (productId, quantity = 1) => {
    const response = await api.post("/cart", { productId, quantity });
    return response.data;
  },

  updateItemQuantity: async (itemId, quantity) => {
    const response = await api.put(`/cart/items/${itemId}`, { quantity });
    return response.data;
  },

  removeItem: async (itemId) => {
    const response = await api.delete(`/cart/items/${itemId}`);
    return response.data;
  }
};