// screens/DashboardGate.tsx

import LoadingSkeleton from "@/components/ui/loading/LoadingSkeleton";
import TabTemplate from "@/components/ui/tabs/tabTemplate";

import React from "react";
import { Text, View } from "react-native";

import { usePatientProfileStore } from "@/store/patientProfileStore";
import { useGetPatientProfile } from "@/api/patients/useGetPatientProfile";

export default function DashboardGate() {
  const { activePatientId } = usePatientProfileStore();
  const { data: patient, isLoading, error } = useGetPatientProfile(activePatientId);

  return (
    <TabTemplate
      headingText="Dashboard"
      showHeadingText={false}
      showProfileAvatar={true}
    >
      <Text>Viewing patient profile: {patient?.profile_name ?? "No patient selected"}</Text>
      {isLoading ? (
        <LoadingSkeleton />
      ) : error ? (
        <Text>Error loading patient profile.</Text>
      ) : !patient ? (
        <Text>No patient profile selected.</Text>
      ) : (
        <View style={{ padding: 16 }}>
          <Text style={{ fontSize: 16, fontWeight: "bold" }}>
            {patient.profile_name}
          </Text>
          <Text style={{ fontSize: 14, color: "#666" }}>
            DOB: {patient.dob ?? "Unknown"}
          </Text>
          {/* Add more patient-specific info here */}
        </View>
      )}
    </TabTemplate>
  );
}

