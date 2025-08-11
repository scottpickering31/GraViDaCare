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
import React, { useRef, useState } from "react";
import {
  Dimensions,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

const { width, height } = Dimensions.get("window");

export default function PatientProfiles() {
  const user = useUser();
  const { data: patients = [] } = useGetAllPatientProfiles(
    user.user?.id ?? null
  );
  const activePatientId = usePatientProfileStore(
    (state) => state.activePatientId
  );
  const setActivePatientId = usePatientProfileStore(
    (state) => state.setActivePatientId
  );
  const deletePatientMutation = useDeletePatientProfile();

  const flatListRef = useRef<FlatList>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleSelectPatient = (id: string) => {
    setActivePatientId(id);
  };

  const handleNext = () => {
    if (currentIndex < patients.length - 1) {
      flatListRef.current?.scrollToIndex({
        index: currentIndex + 1,
        animated: true,
      });
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      flatListRef.current?.scrollToIndex({
        index: currentIndex - 1,
        animated: true,
      });
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const renderProfile = ({ item }: { item: PatientProfile }) => {
    const isActive = item.id === activePatientId;

    return (
      <View style={styles.profileCardWrapper}>
        <View
          style={[styles.profileCard, isActive && styles.activeProfileCard]}
        >
          <View style={styles.profileHeader}>
            <View style={{ flex: 1 }}>
              <Text style={styles.profileName}>{item.profile_name}</Text>
              <Text style={styles.dob}>DOB: {item.dob ?? "Unknown"}</Text>
              <Text>Gender: {item.gender ?? "Unknown"}</Text>
              <Text>Weight: {item.weight_kg ?? "Unknown"}</Text>
              <Text>Height: {item.height_cm ?? "Unknown"}</Text>
              <Text>Caregiver Role: {item.caregiver_role ?? "Unknown"}</Text>
              <Text>Seizure Frequency: {item.seizure_frequency}</Text>
              <Text>Share Code: {item.share_code ?? "Unknown"}</Text>
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
              onPress={() =>
                deletePatientMutation.mutate({ profileId: item.id })
              }
              style={styles.iconWrapper}
            >
              <Ionicons
                name="trash-bin"
                size={22}
                color={Colors.primary[500]}
              />
            </Pressable>
            <Pressable onPress={() => {}} style={styles.iconWrapper}>
              <Ionicons name="pencil" size={22} color={Colors.primary[500]} />
            </Pressable>
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
      </View>
    );
  };

  return (
    <TabTemplate
      headingText="Patient Profiles"
      showProfileAvatar={true}
      hasAnyPatientProfiles={patients.length > 0}
    >
      {patients.length > 0 ? (
        <View style={{ flex: 1 }}>
          <FlatList
            ref={flatListRef}
            data={patients}
            keyExtractor={(item) => item.id}
            renderItem={renderProfile}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            scrollEnabled={false}
            getItemLayout={(data, index) => ({
              length: width,
              offset: width * index,
              index,
            })}
          />

          <View style={styles.nav}>
            <Pressable onPress={handlePrev} disabled={currentIndex === 0}>
              <Ionicons
                name="arrow-back-circle"
                size={42}
                color={
                  currentIndex === 0 ? Colors.gray[400] : Colors.primary[500]
                }
              />
            </Pressable>
            <Text>
              {currentIndex + 1}/{patients.length}
            </Text>
            <Pressable
              onPress={handleNext}
              disabled={currentIndex === patients.length - 1}
            >
              <Ionicons
                name="arrow-forward-circle"
                size={42}
                color={
                  currentIndex === patients.length - 1
                    ? Colors.gray[400]
                    : Colors.primary[500]
                }
              />
            </Pressable>
          </View>
        </View>
      ) : (
        <View style={{ padding: 16 }}>
          <Text>No patient profiles yet.</Text>
        </View>
      )}

      <View style={{ marginTop: 20, gap: 10, paddingHorizontal: 16 }}>
        <ButtonComponent
          backgroundColor={Colors.primary[500]}
          textColor="white"
          title="Create New Patient Profile"
          width="100%"
          onPress={() => router.push("/(modals)/patientDisclaimerModal")}
        />
        <ButtonComponent
          backgroundColor={Colors.primary[500]}
          textColor="white"
          title="Delete Existing Patient Profile"
          width="100%"
          onPress={() => router.push("/(modals)/patientDisclaimerModal")}
        />
      </View>
    </TabTemplate>
  );
}

const styles = StyleSheet.create({
  profileCardWrapper: {
    width,
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 20,
  },
  profileCard: {
    flex: 1,
    backgroundColor: "white",
    borderRadius: 16,
    padding: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
    borderWidth: 1,
    justifyContent: "space-between",
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
  iconWrapper: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: Colors.gray[200],
  },
  shareBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 12,
    backgroundColor: Colors.gray[300],
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
  },
  shareText: {
    fontSize: 14,
    fontWeight: "bold",
    color: Colors.dark[500],
  },
  nav: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 40,
    paddingVertical: 20,
    alignItems: "center",
  },
});
