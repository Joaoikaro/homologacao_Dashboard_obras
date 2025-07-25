import { create } from "zustand";

interface LoadingState {
  loading: boolean;
  setLoading: (loading: boolean) => void;
}


export const useLoading = create<LoadingState>((set) => ({
  loading: false,
  setLoading: (loading: boolean) => set({ loading }),
}));
