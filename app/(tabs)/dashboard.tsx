// screens/DashboardGate.tsx
import { useGetPatientProfiles } from "@/api/patients/useGetPatientProfiles";
import LoadingSkeleton from "@/components/ui/loading/LoadingSkeleton";
import TabTemplate from "@/components/ui/tabs/tabTemplate";
import React from "react";
import { Text, View } from "react-native";

export default function DashboardGate() {
  const { data: patients, isLoading, error } = useGetPatientProfiles();

  return (
    <TabTemplate
      headingText="Dashboard"
      showHeadingText={false}
      showProfileAvatar={true}
    >
      {isLoading ? (
        <LoadingSkeleton />
      ) : error ? (
        <Text>Error loading patient profiles.</Text>
      ) : (
        <View style={{ padding: 16 }}>
          {patients?.length === 0 ? (
            <Text>No patients found.</Text>
          ) : (
            patients &&
            patients.map((p) => (
              <View
                key={p.id}
                style={{
                  marginBottom: 16,
                  padding: 16,
                  backgroundColor: "#f9f9f9",
                  borderRadius: 12,
                }}
              >
                <Text style={{ fontSize: 16, fontWeight: "bold" }}>
                  {p.profile_name}
                </Text>
                <Text style={{ fontSize: 14, color: "#666" }}>
                  DOB: {p.dob ?? "Unknown"}
                </Text>
              </View>
            ))
          )}
        </View>
      )}
    </TabTemplate>
  );
}
