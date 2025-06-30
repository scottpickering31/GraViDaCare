import { create } from "zustand";

interface UrlState {
  url: string | null;
  setUrl: (u: string | null) => void;
  clearUrl: () => void;
}

export const useURLStore = create<UrlState>((set) => ({
  url: null,
  setUrl: (url) => set({ url }),
  clearUrl: () => set({ url: null }),
}));
