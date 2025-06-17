import { Stack } from "expo-router";
import React from "react";

export default function OnboardingLayout() {
  return (
    <Stack>
      <Stack.Screen name="Welcome" options={{ headerShown: false }} />
      <Stack.Screen name="EpilepsyData" options={{ headerShown: false }} />
      <Stack.Screen name="RecordData" options={{ headerShown: false }} />
      <Stack.Screen
        name="GetStarted"
        options={{ headerShown: false }}
      />
    </Stack>
  );
}
