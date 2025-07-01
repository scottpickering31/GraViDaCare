/* app/(tabs)/dashboard.tsx */
import CreatePatientProfileModal from "@/components/modals/createPatientProfileModal";
import { useAuthStore } from "@/store/authStore";
import { Redirect } from "expo-router";
import React, { useState } from "react";
import { RefreshControl, ScrollView, Text, View } from "react-native";
import Logout from "../auth/logout";

export default function DashboardGate() {
  const { session, setSession } = useAuthStore();

  if (!session) return <Redirect href="/onboarding" />;

  const meta = session.user.user_metadata ?? {};
  const needsMoreInfo =
    !meta.first_name || !meta.last_name || !meta.date_of_birth;

  /* manual refresh placeholder */
  const [refreshing, setRefreshing] = useState(false);

  /* When modal saves, update session.user.user_metadata in Zustand */
  const handleDone = (values: any) => {
    setSession({
      ...session,
      user: {
        ...session.user,
        user_metadata: { ...session.user.user_metadata, ...values },
      },  
    });
  };

  return (
    <View style={{ flex: 1 }}>
      <CreatePatientProfileModal
        visible={needsMoreInfo}
        initialValues={meta}
        onDone={handleDone}
      />

      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={() => setRefreshing(false)}
          />
        }
      >
        <View style={styles.center}>
          <Text style={styles.heading}>Dashboard</Text>
          <Text style={styles.welcome}>
            Welcome{" "}
            {meta.first_name
              ? `${meta.first_name} ${meta.last_name}`
              : session.user.email}
          </Text>
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
  },
  heading: { fontSize: 24, fontWeight: "600", marginBottom: 8 },
  welcome: { fontSize: 16, marginBottom: 24, textAlign: "center" },
} as const;
