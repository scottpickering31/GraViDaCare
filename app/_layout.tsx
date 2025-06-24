import { useURLStore } from "@/store/urlStore";
import { useURL } from "expo-linking";
import { Slot } from "expo-router";
import { useEffect } from "react";
import { View } from "react-native";
import "react-native-reanimated";

export default function RootLayout() {
  const incomingUrl = useURL();
  const setUrl = useURLStore((state) => state.setUrl);

  useEffect(() => {
    if (incomingUrl) {
      console.log("🔥 Hot URL captured in _layout:", incomingUrl);
      setUrl(incomingUrl);
    }
  }, [incomingUrl]);

  return (
    <View style={{ flex: 1 }}>
      <Slot />
    </View>
  );
}
