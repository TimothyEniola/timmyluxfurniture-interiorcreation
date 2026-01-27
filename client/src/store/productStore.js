import { create } from "zustand";
import { productService } from "../api/productService";

export const useProductStore = create((set, get) => ({
  products: [],
  isLoading: false,
  error: null,

  fetchProducts: async () => {
    set({ isLoading: true });
    try {
      const response = await productService.getAllProducts();
      // Backend returns { status: "success", data: [...] }
      set({ products: response.data, isLoading: false, error: null });
    } catch (error) {
      set({ error: error.message, isLoading: false });
    }
  },

  addProduct: async (productData) => {
    set({ isLoading: true });
    try {
      const response = await productService.createProduct(productData);
      set((state) => ({ 
        products: [response.data, ...state.products],
        isLoading: false 
      }));
      return response.data;
    } catch (error) {
      set({ error: error.message, isLoading: false });
      throw error;
    }
  },

  updateProduct: async (id, productData) => {
    set({ isLoading: true });
    try {
      const response = await productService.updateProduct(id, productData);
      set((state) => ({
        products: state.products.map((p) => (p.id === id ? response.data : p)),
        isLoading: false,
      }));
    } catch (error) {
      set({ error: error.message, isLoading: false });
      throw error;
    }
  },

  deleteProduct: async (id) => {
    set({ isLoading: true });
    try {
      await productService.deleteProduct(id);
      set((state) => ({
        products: state.products.filter((p) => p.id !== id),
        isLoading: false,
      }));
    } catch (error) {
      set({ error: error.message, isLoading: false });
      throw error;
    }
  },
}));