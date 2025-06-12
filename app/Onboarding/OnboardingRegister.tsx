import ButtonComponent from "@/components/Buttons/ButtonComponent";
import { Colors } from "@/constants/styles/Colors";
import { FormInputStyles } from "@/constants/styles/FormStyles";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "expo-router";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { Image, StyleSheet, Text, TextInput, View } from "react-native";
import { z } from "zod";

const emailSchema = z.object({
  email: z.string().email("Enter a valid email"),
});

type FormData = z.infer<typeof emailSchema>;

export default function OnBoardingRegister() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(emailSchema),
  });

  const signUpWithEmail = async (data: FormData) => {
    console.log(data);
  };

  return (
    <View>
      <Image
        source={require("@/assets/illustration(3).png")}
        style={{ height: "38%", width: "100%" }}
      />
      <View style={styles.container}>
        <View style={styles.headingText}>
          <Text
            style={{
              fontSize: 24,
              fontWeight: "bold",
            }}
          >
            Register with{" "}
            <Text style={{ color: Colors.primary[500] }}>GraViCare</Text>
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
          <Controller
            control={control}
            name="email"
            render={({ field: { onChange, onBlur, value } }) => (
              <>
                <TextInput
                  style={FormInputStyles.input}
                  placeholder="Email Address"
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
              </>
            )}
          />
          <ButtonComponent
            title="Sign in with Google"
            width={"100%"}
            textColor={Colors.typography[900]}
            backgroundColor="white"
            onPress={() => {}}
            borderColor={Colors.gray[300]}
            borderWidth={1}
            icon={require("@/assets/icons/GoogleLogo.png")}
          />
          <ButtonComponent
            title="Sign in with Facebook"
            width={"100%"}
            textColor="white"
            backgroundColor={Colors.typography[900]}
            onPress={() => {}}
            borderColor={Colors.gray[600]}
            borderWidth={1}
            icon={require("@/assets/icons/AppleLogo.png")}
          />
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
    gap: 50,
  },
  buttonContainer: {
    gap: 16,
    alignItems: "center",
  },
  headingText: {
    gap: 16,
  },
  policyText: { fontSize: 12 },
});
