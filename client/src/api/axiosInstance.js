import axios from "axios";
import { useAuthStore } from "../store/authStore";
import baseURL from "./baseurl";

const API_URL = baseURL;

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true, 
  headers: {
    "Content-Type": "application/json",
  },
});

// Response Interceptor: Handle 401s (Token Expiry)
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // If error is 401 (Unauthorized) and we haven't tried to refresh yet
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true; // Mark as retried to prevent infinite loops

      try {
        await axios.post(
          `${API_URL}/auth/refresh-token`,
          {},
          { withCredentials: true },
        );

        // 2. If successful, the backend set a new 'accessToken' cookie.
        // Retry the original request (browser sends new cookie automatically)
        return api(originalRequest);
      } catch (refreshError) {
        // 3. If refresh fails (session expired/invalid), logout the user
        useAuthStore.getState().logout();
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  },
);

export default api;
