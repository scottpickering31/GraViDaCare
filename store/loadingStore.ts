import { create } from "zustand";

interface loadingState {
  loading: boolean;
  setLoading: (b: boolean) => void;
}

export const useLoadingStore = create<loadingState>((set) => ({
  loading: false,
  setLoading: (b: boolean) => set({ loading: b }),
}));
