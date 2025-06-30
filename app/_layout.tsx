/* app/_layout.tsx */
import React from "react";
import { View } from "react-native";
import "react-native-reanimated";
import { Slot} from "expo-router";
import { useURL } from "expo-linking";
import * as Linking from "expo-linking";
import * as WebBrowser from "expo-web-browser";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useURLStore } from "@/store/urlStore";

WebBrowser.maybeCompleteAuthSession();

/** ♻️ one QueryClient for the entire app-lifetime */
const queryClient = new QueryClient();

export default function RootLayout() {
  const incomingUrl = useURL();
  const setUrl = useURLStore((s) => s.setUrl);

  /* Hot-link listener (app already running) */
  React.useEffect(() => {
    if (incomingUrl) setUrl(incomingUrl);

    const sub = Linking.addEventListener("url", (e) => setUrl(e.url));
    return () => sub.remove();
  }, [incomingUrl]);

  return (
    <QueryClientProvider client={queryClient}>
      <View style={{ flex: 1 }}>
        <Slot />
      </View>
    </QueryClientProvider>
  );
}
