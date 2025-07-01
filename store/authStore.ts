// store/authStore.ts
import { Session } from "@supabase/supabase-js";
import { create } from "zustand";

export const useAuthStore = create<{
  session: Session | null;
  hydrated: boolean;
  setSession: (s: Session | null) => void;
  setHydrated: () => void;
}>((set) => ({
  session: null,
  hydrated: false,
  setSession: (session) => set({ session }),
  setHydrated: () => set({ hydrated: true }),
}));
