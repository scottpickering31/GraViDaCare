import { Session } from "@supabase/supabase-js";
import { create } from "zustand";

interface AuthState {
  session: Session | null;
  setSession: (s: Session | null) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  session: null,
  setSession: (s) => set({ session: s }),
}));
