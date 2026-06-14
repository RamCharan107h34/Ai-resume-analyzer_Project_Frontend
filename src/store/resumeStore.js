import { create } from "zustand";

export const useResumeStore = create((set) => ({
  loading: false,

  setLoading: (val) => set({ loading: val }),

  clearResumeState: () => set({ loading: false }),
}));