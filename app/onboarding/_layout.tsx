import { useAuthStore } from "@/store/authStore";
import { Redirect, Stack } from "expo-router";

export default function OnboardingLayout() {
  const { session, hydrated } = useAuthStore();

  if (!hydrated) return null;
  if (session) return <Redirect href="/(tabs)/dashboard" />;

  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="epilepsyData" options={{ headerShown: false }} />
      <Stack.Screen name="recordData" options={{ headerShown: false }} />
      <Stack.Screen name="getStarted" options={{ headerShown: false }} />
    </Stack>
  );
}
