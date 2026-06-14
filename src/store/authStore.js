import { create } from "zustand";
import {
  loginAPI,
  registerAPI,
  logoutAPI,
  checkAuthAPI,
} from "../services/api";
import toast from "react-hot-toast";

export const useAuthStore = create((set) => ({
  user:            null,
  isAuthenticated: false,
  loading:         true, 
  setUser: (user) => set({ user }),

  // ── Register ───────────────────────────────────────────────
  register: async (formData) => {
    set({ loading: true });
    try {
      await registerAPI(formData);
      set({ loading: false });
      return { success: true };
    } catch (err) {
      set({ loading: false });
      return {
        success: false,
        message: err.response?.data?.error || "Registration failed",
      };
    }
  },

  // ── Login ──────────────────────────────────────────────────
  login: async (credentials) => {
    set({ loading: true });
    try {
      const res = await loginAPI(credentials);
      set({
        user:            res.data.payload,
        isAuthenticated: true,
        loading:         false,
      });
      return { success: true };
    } catch (err) {
      set({ loading: false });
      return {
        success: false,
        message: err.response?.data?.error || "Login failed",
      };
    }
  },

  // ── Logout ─────────────────────────────────────────────────
  logout: async () => {
    set({ loading: true });
    try {
      await logoutAPI();
    } finally {
      // always clear state even if API fails
      set({ user: null, isAuthenticated: false, loading: false });
      toast.success("Logged out successfully");
    }
  },

  // ── Check auth on refresh ──────────────────────────────────
  checkAuth: async () => {
    set({ loading: true });
    try {
      const res = await checkAuthAPI();
      set({
        user:            res.data.payload,
        isAuthenticated: true,
        loading:         false,
      });
    } catch {
      set({ user: null, isAuthenticated: false, loading: false });
    }
  },
}));