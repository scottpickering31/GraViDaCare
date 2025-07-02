import { useAuthStore } from "@/store/authStore";
import React from "react";
import {
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
  patientModalStyles?: StyleProp<ViewStyle>;
  children: React.ReactNode;
  onPress: () => void;
}

export default function createPatientProfileModal({
  headingText,
  children,
  patientModalStyles,
  onPress,
}: Props) {
  const { session } = useAuthStore();

  const meta = session?.user.user_metadata ?? {};

  const needsMoreInfo =
    !meta.first_name || !meta.last_name || !meta.date_of_birth;

  return (
    <Modal animationType="slide" transparent visible={needsMoreInfo}>
      <View style={styles.overlay}>
        <View style={styles.card}>
          <Text style={styles.heading}>{headingText}</Text>
          {children}
          <Pressable
            style={[styles.button, patientModalStyles]}
            onPress={onPress}
          >
            <Text style={styles.buttonText}>Next</Text>
          </Pressable>
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
  buttonText: { color: "white", fontWeight: "600" },
});
