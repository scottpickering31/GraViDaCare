import { Stack } from "expo-router";
import React from "react";

export default function OnboardingLayout() {
  return (
    <Stack>
      <Stack.Screen name="Welcome" options={{ headerShown: false }} />
      <Stack.Screen name="EpilepsyData" options={{ headerShown: false }} />
      <Stack.Screen name="RecordData" options={{ headerShown: false }} />
      <Stack.Screen
        name="OnboardingRegister"
        options={{ headerShown: false }}
      />
    </Stack>
  );
}
