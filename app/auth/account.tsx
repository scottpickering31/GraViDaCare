import { useUser } from "@/api/auth/useUser";
import Logout from "@/app/auth/logout";
import TabTemplate from "@/components/ui/tabs/tabTemplate";
import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";

export default function Account() {
  const { user } = useUser();

  if (!user) {
    return (
      <TabTemplate headingText="Account" accountPage={true}>
        <Text>Loading account details...</Text>
      </TabTemplate>
    );
  }

  // Extract key info from user object
  const fullName = user.user_metadata?.full_name || "Unknown";
  const email = user.email || "No email";
  const provider = user.app_metadata?.provider || "Unknown";
  const avatarUrl = user.user_metadata?.avatar_url;
  const createdAt = user.created_at
    ? new Date(user.created_at).toLocaleDateString()
    : "N/A";
  const lastSignIn = user.last_sign_in_at
    ? new Date(user.last_sign_in_at).toLocaleString()
    : "N/A";
  const emailVerified = user.user_metadata?.email_verified ? "Yes" : "No";

  return (
    <TabTemplate headingText="Account" accountPage={true}>
      <View style={styles.container}>
        {avatarUrl && (
          <Image source={{ uri: avatarUrl }} style={styles.avatar} />
        )}

        <Text style={styles.name}>{fullName}</Text>
        <Text style={styles.email}>{email}</Text>

        <View style={styles.infoSection}>
          <Text style={styles.label}>Logged in via:</Text>
          <Text style={styles.value}>{provider.toUpperCase()}</Text>

          <Text style={styles.label}>Account Created:</Text>
          <Text style={styles.value}>{createdAt}</Text>

          <Text style={styles.label}>Last Sign-in:</Text>
          <Text style={styles.value}>{lastSignIn}</Text>

          <Text style={styles.label}>Email Verified:</Text>
          <Text style={styles.value}>{emailVerified}</Text>
        </View>

        <Logout width="60%" />
      </View>
    </TabTemplate>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    paddingVertical: 20,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 15,
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 4,
  },
  email: {
    fontSize: 14,
    color: "#666",
    marginBottom: 15,
  },
  infoSection: {
    width: "100%",
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  label: {
    fontWeight: "bold",
    marginTop: 10,
  },
  value: {
    marginBottom: 5,
    color: "#333",
  },
});
