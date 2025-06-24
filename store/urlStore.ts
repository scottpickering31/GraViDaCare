import { create } from "zustand";

export const useURLStore = create<{
  url: string | null;
  setUrl: (url: string | null) => void;
}>((set) => ({
  url: null,
  setUrl: (url) => set({ url }),
}));
