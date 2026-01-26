import { create } from 'zustand';
import { getMe, logout as apiLogout } from '../api/authService';

export const useAuthStore = create((set) => ({
  user: null,
  isAuthenticated: false,
  isCheckingAuth: true, // Start true to block rendering until we verify session

  // Actions
  setUser: (user) => set({ user, isAuthenticated: !!user, isCheckingAuth: false }),

  logout: async () => {
    try {
      await apiLogout(); // Call backend to clear cookies
    } catch (err) {
      console.error("Logout failed", err);
    }
    set({ user: null, isAuthenticated: false, isCheckingAuth: false });
  },

  checkAuth: async () => {
    set({ isCheckingAuth: true });
    try {
      // 1. Verify user with backend (this uses the HTTP-only cookie)
      const response = await getMe();
      // 2. If successful, update store
      set({ user: response, isAuthenticated: true, isCheckingAuth: false });
    } catch (error) {
      // 3. If 401 or fail, clear user
      set({ user: null, isAuthenticated: false, isCheckingAuth: false });
    }
  },
}));