import { createSessionFromUrl } from "@/components/auth/createSessionFromUrl";
import * as Linking from "expo-linking";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, Text, View } from "react-native";

export default function AuthCallback() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const handleAuthRedirect = async () => {
      const url = await Linking.getInitialURL();
      if (!url) return;

      try {
        const { session, type } = await createSessionFromUrl(url);

        if (session) {
          console.log("Type is " + type + " and session is " + session);
          router.replace("/(tabs)/dashboard");
        }
      } catch (err) {
        setError((err as Error).message);
      }
    };

    handleAuthRedirect();
  }, []);

  if (error) {
    return (
      <View>
        <Text>Error: {error}</Text>
      </View>
    );
  }

  return (
    <View>
      <ActivityIndicator />
      <Text>Logging you in...</Text>
    </View>
  );
}
