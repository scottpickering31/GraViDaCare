import { useHandleSupabaseSession } from "@/hooks/useHandleSupabaseSession";
import { supabase } from "@/lib/supabase";
import {
  GoogleSignin,
  isErrorWithCode,
  statusCodes,
} from "@react-native-google-signin/google-signin";
import { Platform } from "react-native";

export const configureGoogle = () =>
  GoogleSignin.configure({
    scopes: ["https://www.googleapis.com/auth/drive.readonly"],
    webClientId: process.env.EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID!,
  });

export const useGoogleSignIn = () => {
  const handleSession = useHandleSupabaseSession();

  return async () => {
    try {
      if (Platform.OS === "android") await GoogleSignin.hasPlayServices();
      const res = await GoogleSignin.signIn();

      if (!res.data?.idToken) {
        throw new Error("Google Sign-In missing idToken");
      }

      const { data, error } = await supabase.auth.signInWithIdToken({
        provider: "google",
        token: res.data.idToken,
      });
      if (error) throw error;
      if (data.session) handleSession(data.session);
      console.log(
        "This is the session " + JSON.stringify(data.session, null, 2)
      );
    } catch (err) {
      if (isErrorWithCode(err)) {
        if (err.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
          // show toast / alert
        }
      }
      console.warn("Google sign-in error", err);
    }
  };
};
