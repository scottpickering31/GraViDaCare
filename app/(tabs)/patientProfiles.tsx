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
    <TabTemplate
      headingText="Patient Profiles"
      showProfileAvatar={true}
      hasAnyPatientProfiles={(patients?.length ?? 0) > 0}
    >
      <ScrollView
        persistentScrollbar={true}
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingTop: 12,
          paddingBottom: 20,
        }}
      >
        {(patients ?? []).map((item: PatientProfile) => {
          const isActive = item.id === activePatientId;
          return (
            <View key={item.id} style={styles.profileCardWrapper}>
              <View
                style={[
                  styles.profileCard,
                  isActive && styles.activeProfileCard,
                ]}
              >
                <View style={styles.profileHeader}>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.profileName}>{item.profile_name}</Text>
                    <Text style={styles.dob}>DOB: {item.dob ?? "Unknown"}</Text>
                  </View>
                  {isActive && (
                    <Ionicons
                      name="checkmark-circle"
                      size={24}
                      color={Colors.primary[500]}
                      style={styles.icon}
                    />
                  )}
                </View>

                <View style={styles.buttonContainer}>
                  {!isActive && (
                    <ButtonComponent
                      title="Use this profile"
                      backgroundColor={Colors.primary[500]}
                      textColor="white"
                      onPress={() => handleSelectPatient(item.id)}
                      width="70%"
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

              <View style={styles.shareBar}>
                <Text style={styles.shareText}>Share Profile</Text>
                <View style={{ flexDirection: "row", gap: 12 }}>
                  <Ionicons name="share" size={22} color="black" />
                  <Ionicons name="logo-whatsapp" size={22} color="green" />
                  <Ionicons name="mail" size={22} color="blue" />
                </View>
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
  profileCardWrapper: {
    marginBottom: 16,
    borderRadius: 16,
    overflow: "hidden",
    backgroundColor: Colors.gray[100],
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
    borderWidth: 1,
  },
  profileCard: {
    padding: 16,
    backgroundColor: "white",
  },
  activeProfileCard: {
    borderLeftWidth: 4,
    borderLeftColor: Colors.primary[500],
  },
  profileHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  profileName: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1a1a1a",
  },
  dob: {
    fontSize: 14,
    color: "#666",
    marginTop: 2,
  },
  icon: {
    marginLeft: 8,
  },
  buttonContainer: {
    marginTop: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  trashIconWrapper: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: Colors.gray[200],
  },
  shareBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: Colors.gray[300],
  },
  shareText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#444",
  },
});
