import { useUser } from "@/api/auth/useUser";
import { useDeletePatientProfile } from "@/api/patients/useDeletePatientProfile";
import { useGetAllPatientProfiles } from "@/api/patients/useGetAllPatientProfiles";
import ButtonComponent from "@/components/buttons/buttonComponent";
import TabTemplate from "@/components/ui/tabs/tabTemplate";
import { Colors } from "@/constants/styles/Colors";
import { usePatientProfileStore } from "@/store/patientProfileStore";
import { PatientProfile } from "@/types/patientProfile";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

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

  const deletePatientMutation = useDeletePatientProfile();

  return (
    <TabTemplate headingText="Patient Profiles" showProfileAvatar={true} hasAnyPatientProfiles={(patients?.length ?? 0) > 0}>
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
              <View style={styles.buttonContainer}>
                {!isActive && (
                  <ButtonComponent
                    title="Use this patient profile"
                    backgroundColor={Colors.primary[500]}
                    textColor="white"
                    onPress={() => handleSelectPatient(item.id)}
                    width="85%"
                  />
                )}
                <Pressable
                  onPress={() => {
                    deletePatientMutation.mutate({ profileId: item.id });
                  }}
                  style={styles.trashIconWrapper}
                >
                  <Ionicons
                    name="trash-bin"
                    size={22}
                    color={Colors.primary[500]}
                  />
                </Pressable>
              </View>
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
    backgroundColor: "white",
    borderWidth: 2,
    borderColor: Colors.gray[200],
    marginBottom: 12,
  },
  activeProfileCard: {
    borderColor: Colors.primary[500],
    backgroundColor: "white",
  },
  profileName: {
    fontSize: 16,
    fontWeight: "600",
  },
  buttonContainer: {
    marginTop: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  trashIconWrapper: {
    marginLeft: "auto",
    paddingLeft: 12,
    paddingRight: 4,
  },

  dob: {
    fontSize: 14,
    color: "#666",
  },
});
