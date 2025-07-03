import ButtonComponent from "@/components/buttons/buttonComponent";
import { Colors } from "@/constants/styles/Colors";
import { usePatients } from "@/hooks/api/usePatients";
import { useAuthStore } from "@/store/authStore";
import { Redirect, router } from "expo-router";
import React, { useState } from "react";
import { RefreshControl, ScrollView, Text, View } from "react-native";
import Logout from "../auth/logout";

export default function DashboardGate() {
  const { session } = useAuthStore();
  const {
    data: patients,
    isLoading,
    refetch,
    isRefetching,
    error,
  } = usePatients();

  if (!session) return <Redirect href="/onboarding" />;

  const meta = session.user.user_metadata ?? {};

  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  return (
    <View style={{ flex: 1 }}>
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        refreshControl={
          <RefreshControl
            refreshing={refreshing || isRefetching}
            onRefresh={handleRefresh}
          />
        }
      >
        <View style={styles.center}>
          <Text style={styles.heading}>Dashboard</Text>

          {isLoading ? (
            <Text>Loading patients…</Text>
          ) : error ? (
            <Text>Error loading patients</Text>
          ) : patients.length === 0 ? (
            <ButtonComponent
              backgroundColor={Colors.primary[500]}
              textColor="white"
              title="Add a patient"
              width="100%"
              onPress={() => router.push("/(modals)/newPatientModal")}
            />
          ) : (
            <Text style={styles.welcome}>
              Welcome{" "}
              {meta.first_name
                ? `${meta.first_name} ${meta.last_name}`
                : session.user.email}
            </Text>
          )}

          <Logout />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = {
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    gap: 20,
  },
  heading: { fontSize: 24, fontWeight: "600", marginBottom: 8 },
  welcome: { fontSize: 16, marginBottom: 24, textAlign: "center" },
} as const;
