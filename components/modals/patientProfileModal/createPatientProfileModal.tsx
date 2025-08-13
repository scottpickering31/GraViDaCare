import ButtonComponent from "@/components/buttons/buttonComponent";
import { ControlledField } from "@/components/inputs/controlledField";
import {
  PatientProfileModalSteps,
  PatientProfileStep,
} from "@/constants/modals/patientProfileModal";
import { Colors } from "@/constants/styles/Colors";
import AnimatedProgressCircle from "@/constants/styles/progressCircle";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  Image,
  Modal,
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from "react-native";

interface Props {
  headingText: string;
  currentStep: PatientProfileStep;
  patientModalStyles?: StyleProp<ViewStyle>;
  onNextPress: () => void;
  onBackPress: () => void;
  canGoBack: boolean;
  isLast: boolean;
}

export default function CreatePatientProfileModal({
  headingText,
  onNextPress,
  onBackPress,
  isLast,
  canGoBack,
  currentStep,
}: Props) {
  const [isFieldFocused, setIsFieldFocused] = useState(false);
  return (
    <Modal animationType="slide" transparent>
      <View style={styles.overlay}>
        <View style={styles.card}>
          <View style={{ position: "absolute", right: 3, padding: 5 }}>
            <Pressable
              onPress={() => {
                router.back();
              }}
            >
              <Ionicons
                name="close-circle"
                size={30}
                color={Colors.primary[500]}
              />
            </Pressable>
          </View>
          <View style={styles.progress}>
            <Image
              source={require("@/assets/icons/GraViDaCareLogo.png")}
              style={{ height: 150, width: 150 }}
            />
          </View>
          <View style={styles.innerCard}>
            {!isFieldFocused && (
              <View style={{ position: "absolute", top: 180 }}>
                <AnimatedProgressCircle
                  step={currentStep.step}
                  totalSteps={PatientProfileModalSteps.length}
                />
              </View>
            )}
            <View>
              <Text style={styles.headingText}>{headingText}</Text>
            </View>
            <View style={styles.form}>
              <ControlledField
                step={currentStep}
                onFieldFocusChange={setIsFieldFocused}
              />
            </View>
          </View>
          <View style={styles.navigationButtons}>
            {canGoBack && (
              <ButtonComponent
                backgroundColor={Colors.primary[500]}
                title="Back"
                textColor="white"
                onPress={onBackPress}
                width="45%"
              />
            )}
            <ButtonComponent
              backgroundColor={Colors.primary[500]}
              title={isLast ? "Submit" : "Next"}
              textColor="white"
              onPress={onNextPress}
              width="45%"
            />
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.55)",
    padding: 10,
  },
  card: {
    flex: 1,
    borderRadius: 12,
    backgroundColor: "#fff",
    borderColor: Colors.primary[100],
    borderWidth: 3,
    gap: 16,
  },
  form: {
    width: "100%",
  },
  innerCard: {
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    flex: 4,
    margin: 15,
  },
  progress: {
    position: "absolute",
    alignItems: "flex-start",
    width: "100%",
  },
  headingText: { fontSize: 18, fontWeight: "700", textAlign: "center" },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 8,
  },
  pickerWrapper: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    overflow: "hidden",
  },
  button: {
    backgroundColor: "#4f46e5",
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: "center",
  },
  buttonText: { color: "black", fontWeight: "600" },
  navigationButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    position: "absolute",
    bottom: 0,
    padding: 20,
    width: "100%",
  },
});
