import ButtonComponent from "@/components/buttons/buttonComponent";
import { ControlledDatePicker } from "@/components/inputs/controlledDatePicker";
import { ControlledMultiSelect } from "@/components/inputs/controlledMultiSelect";
import { ControlledNumber } from "@/components/inputs/controlledNumber";
import { ControlledSelect } from "@/components/inputs/controlledSelect";
import { ControlledText } from "@/components/inputs/controlledText";
import {
  PatientProfileModalSteps,
  PatientProfileStep,
} from "@/constants/modals/patientProfileModal";
import { Colors } from "@/constants/styles/Colors";
import AnimatedProgressCircle from "@/constants/styles/progressCircle";
import React from "react";
import {
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
          <AnimatedProgressCircle
            step={currentStep.step}
            totalSteps={PatientProfileModalSteps.length}
          />
          <View style={styles.heading}>
            <Text style={styles.headingText}>{headingText}</Text>
          </View>
          <View style={styles.innerCard}>
            <View>
              {currentStep.type === "text" && (
                <ControlledText
                  name={currentStep.name}
                  label={currentStep.title}
                />
              )}
              {currentStep.type === "number" && (
                <ControlledNumber
                  name={currentStep.name}
                  label={currentStep.title}
                />
              )}
              {currentStep.type === "date" && (
                <ControlledDatePicker
                  name={currentStep.name}
                  label={currentStep.title}
                />
              )}
              {currentStep.type === "selector" && (
                <ControlledSelect
                  name={currentStep.name}
                  label={currentStep.title}
                  options={currentStep.options}
                />
              )}
              {currentStep.type === "multi-select" && (
                <ControlledMultiSelect
                  name={currentStep.name}
                  label={currentStep.title}
                  options={[...currentStep.options]}
                />
              )}
            </View>
          </View>
        </View>
        <View style={styles.navigationButtons}>
          {canGoBack && (
            <ButtonComponent
              backgroundColor={Colors.primary[500]}
              title="Back"
              textColor="white"
              onPress={onBackPress}
              width="40%"
            />
          )}
          <ButtonComponent
            backgroundColor={Colors.primary[500]}
            title={isLast ? "Submit" : "Next"}
            textColor="white"
            onPress={onNextPress}
            width="40%"
          />
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.55)",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },
  card: {
    height: "100%",
    width: "100%",
    borderRadius: 12,
    backgroundColor: "#fff",
    padding: 20,
    gap: 16,
  },
  innerCard: {
    flex: 3,
  },
  heading: { flex: 1 },
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
    flex: 1,
    justifyContent: "space-between",
    position: "absolute",
    bottom: 30,
    width: "100%",
    paddingHorizontal: 20,
  },
});
