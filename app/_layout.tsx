/* app/_layout.tsx */
import { supabase } from "@/lib/supabase";
import { useAuthStore } from "@/store/authStore";
import { useURLStore } from "@/store/urlStore";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Slot } from "expo-router";
import * as Linking from "expo-linking";
import { useURL } from "expo-linking";
import * as WebBrowser from "expo-web-browser";
import { useEffect } from "react";
import { View } from "react-native";
import "react-native-reanimated";

WebBrowser.maybeCompleteAuthSession();
const queryClient = new QueryClient();

export default function RootLayout() {
  /* ---- restore Supabase session ---- */
  const setSession  = useAuthStore((s) => s.setSession);
  const setHydrated = useAuthStore((s) => s.setHydrated);

  useEffect(() => {
    (async () => {
      const { data } = await supabase.auth.getSession();   // checks SecureStore
      setSession(data.session ?? null);
      setHydrated();                                       // ✅ done
    })();

    // keep Zustand in sync with future auth events
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_evt, sess) => setSession(sess));

    return () => subscription.unsubscribe();
  }, []);

  /* ---- deep‑link listener (unchanged) ---- */
  const incomingUrl = useURL();
  const setUrl      = useURLStore((s) => s.setUrl);

  useEffect(() => {
    if (incomingUrl) setUrl(incomingUrl);
    const sub = Linking.addEventListener("url", (e) => setUrl(e.url));
    return () => sub.remove();
  }, [incomingUrl]);

  return (
    <QueryClientProvider client={queryClient}>
      <View style={{ flex: 1 }}>
        <Slot />   {/* renders (/onboarding) or (/tabs) below */}
      </View>
    </QueryClientProvider>
  );
}
