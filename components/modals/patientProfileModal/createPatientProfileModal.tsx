import ButtonComponent from "@/components/buttons/buttonComponent";
import { ControlledField } from "@/components/inputs/controlledField";
import {
  PatientProfileModalSteps,
  PatientProfileStep,
} from "@/constants/modals/patientProfileModal";
import { Colors } from "@/constants/styles/Colors";
import AnimatedProgressCircle from "@/constants/styles/progressCircle";
import React from "react";
import {
  Image,
  Modal,
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

// createPatientProfileModal.tsx
export default function CreatePatientProfileModal({
  headingText,
  onNextPress,
  onBackPress,
  isLast,
  canGoBack,
  currentStep,
}: Props) {
  return (
    <Modal animationType="slide" transparent>
      <View style={styles.overlay}>
        <View style={styles.card}>
          <View style={styles.progress}>
            <Image
              source={require("@/assets/icons/GraViDaCareLogo.png")}
              style={{ height: 150, width: 150 }}
            />
            <AnimatedProgressCircle
              step={currentStep.step}
              totalSteps={PatientProfileModalSteps.length}
            />
          </View>
          <View style={styles.innerCard}>
            <View>
              <Text style={styles.headingText}>{headingText}</Text>
            </View>
            <View style={styles.form}>
              <ControlledField step={currentStep} />
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
    flex: 1,
    margin: 15,
  },
  progress: {
    position: "absolute",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    padding: 10,
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
