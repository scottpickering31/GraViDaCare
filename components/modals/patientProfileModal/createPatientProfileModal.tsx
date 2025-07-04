import LogoutButton from "@/app/auth/logout";
import ButtonComponent from "@/components/buttons/buttonComponent";
import { Colors } from "@/constants/styles/Colors";
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
  patientModalStyles?: StyleProp<ViewStyle>;
  children: React.ReactNode;
  onNextPress: () => void;
  onBackPress: () => void;
  canGoBack: boolean;
  onSkipPress?: () => void;
  isLast: boolean;
}

// createPatientProfileModal.tsx
export default function CreatePatientProfileModal({
  headingText,
  children,
  onNextPress,
  onBackPress,
  onSkipPress,
  isLast,
  canGoBack,
}: Props) {
  return (
    <Modal animationType="slide" transparent>
      <View style={styles.overlay}>
        <View style={styles.card}>
          <Text style={styles.heading}>{headingText}</Text>
          {children}

          <View style={{ flexDirection: "column", gap: 8 }}>
            {onSkipPress && (
              <ButtonComponent
                backgroundColor={Colors.gray[100]}
                title="Skip"
                width="50%"
                textColor="black"
                onPress={onSkipPress}
              />
            )}

            {canGoBack && (
              <ButtonComponent
                backgroundColor={Colors.primary[500]}
                title="Back"
                textColor="white"
                width="50%"
                onPress={onBackPress}
              />
            )}

            <ButtonComponent
              backgroundColor={Colors.primary[500]}
              title={isLast ? "Submit" : "Next"}
              textColor="white"
              width="50%"
              onPress={onNextPress}
            />
          </View>

          <LogoutButton />
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
  },
  card: {
    width: "90%",
    borderRadius: 12,
    padding: 24,
    backgroundColor: "#fff",
    gap: 16,
  },
  heading: { fontSize: 18, fontWeight: "700", textAlign: "center" },
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
});
