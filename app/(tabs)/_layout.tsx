import { useAuthStore } from "@/store/authStore";
import { Ionicons } from "@expo/vector-icons";
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
        options={{
          title: "Home",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <Ionicons name={focused ? "home" : "home-outline"} size={24} />
          ),
        }}
      />
      <Tabs.Screen
        name="reports"
        options={{
          title: "Reports",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name={focused ? "stats-chart" : "stats-chart-outline"}
              size={24}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="log"
        options={{
          title: "Seizure Log",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <Ionicons name={focused ? "add" : "add-outline"} size={24} />
          ),
        }}
      />
      <Tabs.Screen
        name="insights"
        options={{
          title: "AI Insights",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <Ionicons name={focused ? "bulb" : "bulb-outline"} size={24} />
          ),
        }}
      />
    </Tabs>
  );
}
