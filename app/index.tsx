import { useAuthStore } from "@/store/authStore";
import { Redirect } from "expo-router";

export default function Index() {
  const { session, hydrated } = useAuthStore();

  if (!hydrated) return null;
  return <Redirect href={session ? "/(tabs)/dashboard" : "/onboarding"} />;
}
