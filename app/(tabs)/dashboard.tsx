// screens/DashboardGate.tsx

import TabTemplate from "@/components/ui/tabs/tabTemplate";

import React from "react";
import { Text, View } from "react-native";

export default function DashboardGate() {
  return (
    <TabTemplate
      headingText="Dashboard"
      showHeadingText={false}
      showProfileAvatar={true}
    >
      {(patient) => (
        <View style={{ padding: 16 }}>
          <Text style={{ fontSize: 16, fontWeight: "bold" }}>
            {patient.profile_name}
          </Text>
          <Text style={{ fontSize: 14, color: "#666" }}>
            DOB: {patient.dob ?? "Unknown"}
          </Text>
        </View>
      )}
    </TabTemplate>
  );
}
