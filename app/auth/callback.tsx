/* app/auth/callback.tsx */
import React from "react";
import { ActivityIndicator, View, Text } from "react-native";
import { useURLStore } from "@/store/urlStore";
import { useFirstAuthUrl } from "@/hooks/useFirstAuthUrl";
import { createSessionFromUrl } from "@/constants/createSessionFromUrl";
import { router } from "expo-router";
import { useHandleSupabaseSession } from "@/hooks/useHandleSupabaseSession";

export default function AuthCallback() {
  const hotUrl = useURLStore((s) => s.url);
  const chosenUrl = useFirstAuthUrl(hotUrl);
  const handleSession = useHandleSupabaseSession();

  React.useEffect(() => {
    if (!chosenUrl) return;

    let active = true;

    (async () => {
      try {
        const { session } = await createSessionFromUrl(chosenUrl);
        if (active && session) handleSession(session);
      } catch (e) {
        if (active) router.replace("/onboarding");
      }
    })();

    return () => {
      active = false;
    };
  }, [chosenUrl]);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <ActivityIndicator />
      <Text>Logging you in…</Text>
    </View>
  );
}
