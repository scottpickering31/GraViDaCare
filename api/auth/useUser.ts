import { useAuthStore } from "@/store/authStore";

export function useUser() {
  const session = useAuthStore((s) => s.session);
  return {
    user: session?.user ?? null,
    session,
  };
}
