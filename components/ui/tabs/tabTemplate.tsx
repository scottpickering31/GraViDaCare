import { useGetPatientProfile } from "@/api/patients/useGetPatientProfile";
import ButtonComponent from "@/components/buttons/buttonComponent";
import { Colors } from "@/constants/styles/Colors";
import { useAuthStore } from "@/store/authStore";
import { usePatientProfileStore } from "@/store/patientProfileStore";
import { Redirect, router } from "expo-router";
import React, { useState } from "react";
import {
  Pressable,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface TabTemplateProps {
  children: React.ReactNode;
  headingText: string;
  showHeadingText?: boolean;
  showProfileAvatar?: boolean;
}

export default function TabTemplate({
  children,
  headingText,
  showHeadingText,
  showProfileAvatar,
}: TabTemplateProps) {
  const { session } = useAuthStore();
  const { activePatientId } = usePatientProfileStore();
  const fullName = session?.user.user_metadata?.full_name;
  const email = session?.user.email;

  const initials = fullName
    ? fullName
        .split(" ")
        .map((n: string) => n[0])
        .join("")
        .toUpperCase()
    : email?.[0]?.toUpperCase();

  const upperInitials = initials ? initials : "";

  if (!session) return <Redirect href="/onboarding" />;

  const [refreshing, setRefreshing] = useState(false);

  const {
    data: patients,
    isLoading,
    refetch,
    isRefetching,
    error,
  } = useGetPatientProfile(activePatientId);

  const handleRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        refreshControl={
          <RefreshControl
            refreshing={refreshing || isRefetching}
            onRefresh={handleRefresh}
          />
        }
      >
        <View style={styles.header}>
          {showHeadingText !== false && <Text>{headingText}</Text>}
          {showProfileAvatar && (
            <Pressable
              style={styles.profileButton}
              onPress={() => {
                router.push("/auth/account");
              }}
            >
              <Text>{upperInitials}</Text>
            </Pressable>
          )}
        </View>
        <View style={styles.container}>
          {isLoading ? (
            <Text>Loading data…</Text>
          ) : error ? (
            <Text>Error loading data</Text>
          ) : patients && patients.length === 0 ? (
            <View style={styles.buttonContainer}>
              <ButtonComponent
                backgroundColor={Colors.primary[500]}
                textColor="white"
                title="Create Patient Profile"
                width="50%"
                onPress={() => router.push("/(modals)/patientDisclaimerModal")}
              />
              <ButtonComponent
                backgroundColor={Colors.primary[500]}
                textColor="white"
                title="View Existing Profile"
                width="50%"
                onPress={() => router.push("/(modals)/patientDisclaimerModal")}
              />
            </View>
          ) : (
            <View>{children}</View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  profileButton: {
    borderRadius: 180,
    borderWidth: 1,
    padding: 12,
    backgroundColor: "#f9f9f9",
    position: "absolute",
    right: 10,
  },
  buttonContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  header: {
    padding: 10,
    height: 70,
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
    justifyContent: "space-between",
  },
});
