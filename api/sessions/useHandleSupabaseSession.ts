import { useAuthStore } from "@/store/authStore";
import { useURLStore } from "@/store/urlStore";
import { Session } from "@supabase/supabase-js";
import { router } from "expo-router";

export const useHandleSupabaseSession = () => {
  const setSession = useAuthStore((s) => s.setSession);
  const clearUrl = useURLStore((s) => s.clearUrl);

  return (session: Session) => {
    setSession(session);
    clearUrl();
    router.replace("/(tabs)/dashboard");
  };
};
