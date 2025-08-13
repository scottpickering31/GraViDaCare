import { useGetPatientProfile } from "@/api/patients/useGetPatientProfile";
import ButtonComponent from "@/components/buttons/buttonComponent";
import { Colors } from "@/constants/styles/Colors";
import { useAuthStore } from "@/store/authStore";
import { usePatientProfileStore } from "@/store/patientProfileStore";
import { PatientProfile } from "@/types/patientProfile";
import { LinearGradient } from "expo-linear-gradient";
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
import LoadingSkeleton from "../loading/LoadingSkeleton";

interface TabTemplateProps {
  children: React.ReactNode | ((patient: PatientProfile) => React.ReactNode);
  headingText: string;
  showHeadingText?: boolean;
  showProfileAvatar?: boolean;
  accountPage?: boolean;
  hasAnyPatientProfiles?: boolean;
  patientData?: PatientProfile | PatientProfile[];
  refetchFn?: () => Promise<any>;
  isLoading?: boolean;
  error?: any;
}

export default function TabTemplate({
  children,
  headingText,
  showHeadingText,
  showProfileAvatar,
  accountPage,
  hasAnyPatientProfiles,
  patientData: data,
  refetchFn,
  isLoading: externalLoading,
  error: externalError,
}: TabTemplateProps) {
  const { session } = useAuthStore();
  const { activePatientId } = usePatientProfileStore();
  const [refreshing, setRefreshing] = useState(false);

  const {
    data: patient,
    isLoading: internalLoading,
    refetch,
    isRefetching,
    error,
  } = useGetPatientProfile(activePatientId);

  const isLoading = externalLoading ?? internalLoading;
  const dataToRender = data ?? patient;
  const errorToRender = externalError ?? error;

  if (!session) return <Redirect href="/onboarding" />;

  const handleRefresh = async () => {
    setRefreshing(true);
    if (refetchFn) {
      await refetchFn();
    } else {
      await refetch();
    }
    setRefreshing(false);
  };

  const fullName = session?.user.user_metadata?.full_name;
  const email = session?.user.email;
  const initials = fullName
    ? fullName
        .split(" ")
        .map((n: string) => n[0])
        .join("")
        .toUpperCase()
    : email?.[0]?.toUpperCase();
  const upperInitials = initials ?? "";

  console.log("Active patient ID:", activePatientId);
  console.log("Patient data:", patient);

  return (
    <LinearGradient
      colors={["#f5f7fa", "#e8f0ff", "#ffffff"]}
      start={{ x: 0.1, y: 0.1 }}
      end={{ x: 0.9, y: 0.9 }}
      style={{ flex: 1 }}
    >
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
                onPress={() => router.push("/auth/account")}
              >
                <Text>{upperInitials}</Text>
              </Pressable>
            )}
          </View>

          <View style={styles.container}>
            {isLoading ? (
              <LoadingSkeleton />
            ) : errorToRender ? (
              <Text>Error loading data</Text>
            ) : !dataToRender && !accountPage && !hasAnyPatientProfiles ? (
              <View style={styles.buttonContainer}>
                <ButtonComponent
                  backgroundColor={Colors.primary[500]}
                  textColor="white"
                  title="Create Patient Profile"
                  width="50%"
                  onPress={() =>
                    router.push("/(modals)/patientDisclaimerModal")
                  }
                />
                <ButtonComponent
                  backgroundColor={Colors.primary[500]}
                  textColor="white"
                  title="View Existing Profile"
                  width="50%"
                  onPress={() =>
                    router.push("/(modals)/patientDisclaimerModal")
                  }
                />
              </View>
            ) : (
              <View style={{ flex: 1 }}>
                {typeof children === "function"
                  ? children(dataToRender)
                  : children}
              </View>
            )}
          </View>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
