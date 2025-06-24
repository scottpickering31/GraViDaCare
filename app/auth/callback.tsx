import { createSessionFromUrl } from "@/constants/createSessionFromUrl";
import { useURLStore } from "@/store/urlStore";
import * as Linking from "expo-linking";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, Text, View } from "react-native";

export default function AuthCallback() {
  const [processing, setProcessing] = useState(true);
  const hotUrl = useURLStore((state) => state.url);
  const [urlToUse, setUrlToUse] = useState<string | null>(null);

  // Step 1: Try to get the cold start URL first
  useEffect(() => {
    Linking.getInitialURL().then((coldUrl) => {
      if (coldUrl) {
        console.log("❄️ Cold URL used:", coldUrl);
        setUrlToUse(coldUrl);
      } else if (hotUrl) {
        console.log("🔥 Hot URL used:", hotUrl);
        setUrlToUse(hotUrl);
      }
    });
  }, [hotUrl]);

  // Step 2: When we have a URL, process it
  useEffect(() => {
    if (!urlToUse) return;

    const run = async () => {
      try {
        console.log("🔗 Using URL for session:", urlToUse);

        await createSessionFromUrl(urlToUse);

        const params = new URL(urlToUse).searchParams;
        const source = params.get("source");
        console.log("✨ Auth source:", source);

        if (source === "signup") {
          router.replace("/(tabs)/dashboard");
        } else {
          router.replace("/onboarding");
        }
      } catch (err) {
        console.error("❌ Error creating session:", err);
      } finally {
        setProcessing(false);
      }
    };

    run();
  }, [urlToUse]);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <ActivityIndicator />
      <Text>Logging you in...</Text>
    </View>
  );
}
