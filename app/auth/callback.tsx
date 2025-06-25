import { createSessionFromUrl } from "@/constants/createSessionFromUrl";
import { useAuthStore } from "@/store/authStore";
import { useURLStore } from "@/store/urlStore";
import * as Linking from "expo-linking";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, Text, View } from "react-native";

export default function AuthCallback() {
  const hotUrl = useURLStore((s) => s.url);
  const { setSession } = useAuthStore();
  const [urlToUse, setUrlToUse] = useState<string | null>(null);

  /** 1️⃣  Pick cold-start URL first, otherwise hot-start */
  useEffect(() => {
    Linking.getInitialURL().then((coldUrl) => {
      if (coldUrl) setUrlToUse(coldUrl);
      else if (hotUrl) setUrlToUse(hotUrl);
    });
  }, [hotUrl]);

  /** 2️⃣  Once we have a URL, create the Supabase session */
  useEffect(() => {
    if (!urlToUse) return;

    (async () => {
      try {
        const { session } = await createSessionFromUrl(urlToUse);
        setSession(session); // 🟢 store in Zustand
        router.replace("/(tabs)/dashboard"); // 🚀 leave callback
      } catch (err) {
        console.error("Auth error:", err);
        router.replace("/onboarding"); // fallback
      }
    })();
  }, [urlToUse]);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <ActivityIndicator />
      <Text>Logging you in…</Text>
    </View>
  );
}
