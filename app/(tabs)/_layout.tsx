import { useAuthStore } from "@/store/authStore";
import { Redirect, Tabs } from "expo-router";
import React from "react";

export default function TabsLayout() {
  const { session, hydrated } = useAuthStore();

  if (!hydrated) return null;
  if (!session) return <Redirect href="/onboarding" />;
  return (
    <Tabs>
      <Tabs.Screen
        name="dashboard"
        options={{ title: "Dashboard", headerShown: false }}
      />
      <Tabs.Screen
        name="reports"
        options={{ title: "Reports", headerShown: false }}
      />
      <Tabs.Screen
        name="profile"
        options={{ title: "Profile", headerShown: false }}
      />
    </Tabs>
  );
}
