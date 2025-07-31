import { useUser } from "@/api/auth/useUser";
import { useGetAllPatientProfiles } from "@/api/patients/useGetAllPatientProfiles";
import ButtonComponent from "@/components/buttons/buttonComponent";
import TabTemplate from "@/components/ui/tabs/tabTemplate";
import { Colors } from "@/constants/styles/Colors";
import { usePatientProfileStore } from "@/store/patientProfileStore";
import { PatientProfile } from "@/types/patientProfile";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

export default function PatientProfiles() {
  const user = useUser();
  const { data: patients } = useGetAllPatientProfiles(user.user?.id ?? null);
  const activePatientId = usePatientProfileStore(
    (state) => state.activePatientId
  );
  const setActivePatientId = usePatientProfileStore(
    (state) => state.setActivePatientId
  );

  const handleSelectPatient = (id: string) => {
    setActivePatientId(id);
  };

  return (
    <TabTemplate
      headingText="Patient Profiles"
      showProfileAvatar={true}
    >
      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingTop: 12,
          paddingBottom: 20,
        }}
      >
        {(patients ?? []).map((item: PatientProfile) => {
          const isActive = item.id === activePatientId;
          return (
            <View
              key={item.id}
              style={[
                styles.profileCard,
                isActive ? styles.activeProfileCard : null,
              ]}
            >
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <View style={{ flex: 1 }}>
                  <Text style={styles.profileName}>{item.profile_name}</Text>
                  <Text style={styles.dob}>DOB: {item.dob ?? "Unknown"}</Text>
                </View>
                {isActive && (
                  <Ionicons
                    name="checkmark-circle"
                    size={24}
                    color={Colors.primary[500]}
                  />
                )}
              </View>

              <ButtonComponent
                title="Use this patient profile"
                backgroundColor={
                  isActive ? Colors.primary[700] : Colors.primary[500]
                }
                textColor="white"
                onPress={() => handleSelectPatient(item.id)}
                width="100%"
              />
            </View>
          );
        })}

        <View style={{ marginTop: 20 }}>
          <ButtonComponent
            backgroundColor={Colors.primary[500]}
            textColor="white"
            title="Create Patient Profile"
            width="100%"
            onPress={() => router.push("/(modals)/patientDisclaimerModal")}
          />
        </View>
      </ScrollView>
    </TabTemplate>
  );
}

const styles = StyleSheet.create({
  profileCard: {
    padding: 12,
    borderRadius: 12,
    backgroundColor: "#f0f0f0",
    borderWidth: 2,
    borderColor: "transparent",
    marginBottom: 12,
  },
  activeProfileCard: {
    borderColor: Colors.primary[500],
    backgroundColor: "#e6f0ff",
  },
  profileName: {
    fontSize: 16,
    fontWeight: "600",
  },
  dob: {
    fontSize: 14,
    color: "#666",
  },
});
