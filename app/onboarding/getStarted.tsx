/* app/(onboarding)/getStarted.tsx */
import { debugResetAuth } from "@/lib/debugAuth";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect, useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { z } from "zod";

import {
  configureGoogle,
  useGoogleSignIn,
} from "@/components/auth/googleSignIn";
import { createSessionFromUrl } from "@/constants/createSessionFromUrl";
import { useHandleSupabaseSession } from "@/hooks/useHandleSupabaseSession";
import { supabase } from "@/lib/supabase";

import EmailIcon from "@/assets/icons/EmailIcon.svg";
import FacebookLogo from "@/assets/icons/FacebookLogo.svg";
import GoogleLogo from "@/assets/icons/GoogleLogo.svg";
import NavArrow from "@/assets/icons/NavArrow.svg";
import ButtonComponent from "@/components/buttons/buttonComponent";
import { Colors } from "@/constants/styles/Colors";
import { Link } from "expo-router";
import * as WebBrowser from "expo-web-browser";

const emailSchema = z.object({
  email: z.string().email("Enter a valid email"),
});
type RegisterFormData = z.infer<typeof emailSchema>;
type SocialProvider = "google" | "facebook";

export default function GetStarted() {
  /** ---------- form ---------- */
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({ resolver: zodResolver(emailSchema) });
  const emailRef = useRef<TextInput>(null);

  /** ---------- state ---------- */
  const [showEmailInput, setShowEmailInput] = useState(false);
  const [sending, setSending] = useState(false);
  const handleSession = useHandleSupabaseSession(); // <- central success path
  const performOAuthGoogle = useGoogleSignIn();

  /** ---------- boot ---------- */
  useEffect(configureGoogle, []);

  /** ---------- OAuth (FB) ---------- */
  const performOAuth = async (provider: SocialProvider) => {
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: "gravidacare://auth/callback?source=signup",
          skipBrowserRedirect: true,
        },
      });
      if (error) throw error;

      const res = await WebBrowser.openAuthSessionAsync(
        data.url,
        "gravidacare://auth/callback"
      );

      if (res.type === "success") {
        const { session } = await createSessionFromUrl(res.url);
        if (session) handleSession(session);
      }
    } catch (e) {
      Alert.alert("Social login failed", String(e));
    }
  };

  /** ---------- Magic link ---------- */
  const signUpWithEmail = async ({ email }: RegisterFormData) => {
    setSending(true);
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: "gravidacare://auth/callback?source=signup",
      },
    });
    setSending(false);

    if (error) Alert.alert(error.message);
    else Alert.alert("Almost there!", "Check your inbox for the magic link.");
  };

  /** ---------- auto-focus ---------- */
  useEffect(() => {
    if (showEmailInput) requestAnimationFrame(() => emailRef.current?.focus());
  }, [showEmailInput]);

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.select({ ios: "padding", android: undefined })}
    >
      <Image
        source={require("@/assets/illustration(3).png")}
        style={{ height: "35%", width: "100%" }}
      />

      <View style={styles.container}>
        {/* heading */}
        <View style={styles.headingText}>
          <Text style={{ fontSize: 24, fontWeight: "bold" }}>
            Get Started with{" "}
            <Text
              style={{
                color: Colors.primary[500],
                textDecorationLine: "underline",
              }}
            >
              GraVidaCare
            </Text>
          </Text>
          <Text style={{ fontSize: 14, color: Colors.typography[700] }}>
            Your trusted epilepsy management companion
          </Text>
        </View>

        {/* buttons */}
        <View style={styles.buttonContainer}>
          {!showEmailInput ? (
            <>
              <ButtonComponent
                icon={GoogleLogo}
                title="Sign in with Google"
                backgroundColor="white"
                textColor={Colors.typography[900]}
                borderColor={Colors.gray[300]}
                borderWidth={1}
                width="100%"
                onPress={performOAuthGoogle}
              />
              <ButtonComponent
                icon={FacebookLogo}
                title="Sign in with Facebook"
                backgroundColor="#0C63D4"
                textColor="white"
                borderColor={Colors.gray[600]}
                borderWidth={1}
                width="100%"
                onPress={() => performOAuth("facebook")}
              />
              <Text style={{ color: Colors.typography[500] }}>—— Or ——</Text>
              <ButtonComponent
                title="Sign in with Email"
                backgroundColor={Colors.primary[500]}
                textColor="white"
                width="100%"
                onPress={() => setShowEmailInput(true)}
              />
              {__DEV__ && (
                <ButtonComponent
                  title="DEBUG: Reset Auth"
                  backgroundColor={Colors.gray[200]}
                  textColor="black"
                  width="100%"
                  onPress={debugResetAuth}
                />
              )}
            </>
          ) : (
            <>
              <Controller
                control={control}
                name="email"
                render={({ field: { onChange, onBlur, value } }) => (
                  <View style={styles.emailController}>
                    <EmailIcon />
                    <TextInput
                      ref={emailRef}
                      style={{ flex: 1 }}
                      placeholder="Enter Email Address"
                      placeholderTextColor={Colors.typography[400]}
                      value={value}
                      onChangeText={onChange}
                      onBlur={onBlur}
                      keyboardType="email-address"
                      autoCapitalize="none"
                      returnKeyType="done"
                    />
                  </View>
                )}
              />
              {errors.email && (
                <Text style={{ color: "red", fontSize: 12 }}>
                  {errors.email.message}
                </Text>
              )}

              <ButtonComponent
                title={sending ? "Sending…" : "Send Magic Link"}
                backgroundColor={Colors.primary[500]}
                textColor="white"
                width="100%"
                onPress={handleSubmit(signUpWithEmail)}
              />
              <View style={{ width: "100%", marginTop: 32 }}>
                <ButtonComponent
                  icon={NavArrow}
                  title="Back"
                  backgroundColor={Colors.gray[50]}
                  textColor="black"
                  width="100%"
                  borderColor="black"
                  borderWidth={1}
                  onPress={() => setShowEmailInput(false)}
                />
              </View>
            </>
          )}
        </View>

        {/* legal */}
        <View style={{ alignItems: "center", gap: 5 }}>
          <Text style={styles.policyText}>
            By signing up or logging in, I accept the app's
          </Text>
          <Text style={styles.policyText}>
            <Link
              href="/legal/termsAndConditions"
              style={{ color: Colors.primary[500] }}
            >
              <Text>Terms of Service</Text>
            </Link>
            <Text> and </Text>
            <Link
              href="/legal/privacyPolicyScreen"
              style={{ color: Colors.primary[500] }}
            >
              <Text>Privacy Policy</Text>
            </Link>
          </Text>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, gap: 30, flex: 1 },
  headingText: { gap: 16 },
  buttonContainer: { gap: 16, alignItems: "center", width: "100%" },
  policyText: { fontSize: 12, textAlign: "center" },
  emailController: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    backgroundColor: "white",
    paddingHorizontal: 20,
    paddingVertical: 6,
    borderRadius: 8,
    borderWidth: 1,
    width: "100%",
  },
});
