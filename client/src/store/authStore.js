import { create } from "zustand";
import { getMe, logout as apiLogout } from "../api/authService";

export const useAuthStore = create((set) => ({
  user: null,
  isAuthenticated: false,
  isCheckingAuth: true,

  // Fix: Ensure we set 'user' to the actual user object, not the response wrapper
  setUser: (user) =>
    set({ user, isAuthenticated: !!user, isCheckingAuth: false }),

  logout: async () => {
    try {
      await apiLogout();
    } catch (err) {
      console.error("Logout failed", err);
    }
    set({ user: null, isAuthenticated: false, isCheckingAuth: false });
  },

  checkAuth: async () => {
    set({ isCheckingAuth: true });
    try {
      const response = await getMe();
      console.log("checkAuth response:", response.data);
      set({
        user: response.data,
        isAuthenticated: true,
        isCheckingAuth: false,
      });
    } catch (error) {
      set({ user: null, isAuthenticated: false, isCheckingAuth: false });
    }
  },
}));
