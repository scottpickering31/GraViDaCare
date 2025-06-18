import FacebookLogo from "@/assets/icons/FacebookLogo.svg";
import GoogleLogo from "@/assets/icons/GoogleLogo.svg";
import NavArrow from "@/assets/icons/NavArrow.svg";
import ButtonComponent from "@/components/Buttons/ButtonComponent";
import { Colors } from "@/constants/styles/Colors";
import { supabase } from "@/lib/supabase";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Alert, Image, StyleSheet, Text, TextInput, View } from "react-native";
import { z } from "zod";
import EmailIcon from "../../assets/icons/EmailIcon.svg";

const emailSchema = z.object({
  email: z.string().email("Enter a valid email"),
});

type RegisterFormData = z.infer<typeof emailSchema>;

export default function GetStarted() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(emailSchema),
  });

  const [showEmailModule, setShowEmailModule] = useState(false);
  const [loading, setLoading] = useState(false);
  const emailRef = useRef<TextInput>(null);

  async function signUpWithEmail(data: RegisterFormData) {
    setLoading(true);
    const { email } = data;

    const {
      data: { session },
      error,
    } = await supabase.auth.signInWithOtp({
      email: email,
      options: {
        emailRedirectTo: "exp+gravidacare://Auth/Callback",
      },
    });

    if (error) Alert.alert(error.message);
    if (!session)
      Alert.alert("Please check your inbox for email verification!");
    setLoading(false);
  }

  useEffect(() => {
    if (showEmailModule) {
      setTimeout(() => {
        emailRef.current?.focus();
      }, 100);
    }
  }, [showEmailModule]);

  return (
    <View>
      <Image
        source={require("@/assets/illustration(3).png")}
        style={{ height: "35%", width: "100%" }}
      />
      <View style={styles.container}>
        <View style={styles.headingText}>
          <Text
            style={{
              fontSize: 24,
              fontWeight: "bold",
            }}
          >
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
          <Text
            style={{
              fontSize: 14,
              color: Colors.typography[700],
            }}
          >
            Your trusted epilepsy management companion
          </Text>
        </View>
        <View style={styles.buttonContainer}>
          {!showEmailModule ? (
            <>
              <ButtonComponent
                title="Sign in with Google"
                width={"100%"}
                textColor={Colors.typography[900]}
                backgroundColor="white"
                onPress={() => {}}
                borderColor={Colors.gray[300]}
                borderWidth={1}
                icon={GoogleLogo}
              />
              <ButtonComponent
                title="Sign in with Facebook"
                width={"100%"}
                textColor="white"
                backgroundColor={"#0C63D4"}
                onPress={() => {}}
                borderColor={Colors.gray[600]}
                borderWidth={1}
                icon={FacebookLogo}
              />
              <Text style={{ color: Colors.typography[500] }}>—— Or ——</Text>
              <ButtonComponent
                backgroundColor={Colors.primary[500]}
                width={"100%"}
                textColor="white"
                onPress={() => {
                  setShowEmailModule(true);
                }}
                title="Sign in with Email"
              />
            </>
          ) : (
            <View style={styles.buttonContainer}>
              <Controller
                control={control}
                name="email"
                render={({ field: { onChange, onBlur, value } }) => (
                  <View style={styles.emailController}>
                    <EmailIcon />
                    <TextInput
                      ref={emailRef}
                      style={{ width: "100%" }}
                      placeholder="Enter Email Address"
                      placeholderTextColor="black"
                      value={value}
                      onChangeText={onChange}
                      onBlur={onBlur}
                      returnKeyType="next"
                      keyboardType="email-address"
                      autoCapitalize="none"
                    />
                    {errors.email && (
                      <Text style={{ color: "red", fontSize: 10 }}>
                        {errors.email.message}
                      </Text>
                    )}
                  </View>
                )}
              />

              <ButtonComponent
                backgroundColor={Colors.primary[500]}
                width={"100%"}
                textColor="white"
                onPress={handleSubmit(signUpWithEmail)}
                title="Sign in"
              />
              <View style={{ width: "100%", marginTop: 32 }}>
                <ButtonComponent
                  backgroundColor={Colors.gray[50]}
                  width={"100%"}
                  textColor="black"
                  onPress={() => setShowEmailModule(false)}
                  title="Back"
                  borderColor="black"
                  icon={NavArrow}
                  borderWidth={1}
                />
              </View>
            </View>
          )}

          <Text>
            Already have an account?{" "}
            <Link href="/Auth/Login" style={{ color: Colors.primary[500] }}>
              Sign In
            </Link>
          </Text>
        </View>
        <View style={{ alignItems: "center", gap: 5 }}>
          <Text style={styles.policyText}>
            By signing up or logging in, I accept the app's
          </Text>
          <Text style={styles.policyText}>
            <Link
              href="/Legal/TermsAndConditionsScreen"
              style={{ color: Colors.primary[500] }}
            >
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link
              href="/Legal/PrivacyPolicyScreen"
              style={{ color: Colors.primary[500] }}
            >
              Privacy Policy
            </Link>
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    gap: 30,
    height: "65%",
  },
  buttonContainer: {
    gap: 16,
    alignItems: "center",
    width: "100%",
  },
  headingText: {
    gap: 16,
  },
  policyText: { fontSize: 12 },
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
