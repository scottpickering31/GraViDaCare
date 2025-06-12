import { useFonts } from "expo-font";
import { Slot, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import "react-native-reanimated";
import SplashView from "./Onboarding/SplashView";

export default function RootLayout() {
  const router = useRouter();

  const [fontsLoaded] = useFonts({
    ManropeBold: require("../assets/fonts/Manrope-Bold.ttf"),
    ManropeExtraBold: require("../assets/fonts/Manrope-ExtraBold.ttf"),
    ManropeExtraLight: require("../assets/fonts/Manrope-ExtraLight.ttf"),
    ManropeLight: require("../assets/fonts/Manrope-Light.ttf"),
    ManropeMedium: require("../assets/fonts/Manrope-Medium.ttf"),
    ManropeRegular: require("../assets/fonts/Manrope-Regular.ttf"),
    ManropeSemiBold: require("../assets/fonts/Manrope-SemiBold.ttf"),
  });

  const [timeoutDone, setTimeoutDone] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeoutDone(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (fontsLoaded && timeoutDone) {
      router.replace("/Onboarding/Welcome");
    }
  }, [fontsLoaded, timeoutDone]);

  if (!fontsLoaded || !timeoutDone) {
    return <SplashView />;
  }

  return <Slot />;
}
