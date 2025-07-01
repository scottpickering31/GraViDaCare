// import DateTimePicker from "@react-native-community/datetimepicker";
// import { Picker } from "@react-native-picker/picker";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

type FormValues = {
  first_name: string;
  last_name: string;
  date_of_birth: string; // ISO yyyy‑mm‑dd
  gender: "Male" | "Female" | "Other";
};

interface Props {
  visible: boolean;
  initialValues?: Partial<FormValues>;
  onDone: (v: FormValues) => void;
}

export default function createPatientProfileModal({
  visible,
  initialValues = {},
  onDone,
}: Props) {
  const {
    control,
    handleSubmit,
    watch,
    formState: { isValid },
  } = useForm<FormValues>({
    defaultValues: {
      first_name: "",
      last_name: "",
      date_of_birth: "",
      gender: "Other",
      ...initialValues,
    },
    mode: "onChange",
  });

  /* --------------- date picker --------------- */
  const [showDate, setShowDate] = useState(false);
  const dob = watch("date_of_birth");

  return (
    <Modal animationType="slide" transparent visible={visible}>
      <View style={styles.overlay}>
        <View style={styles.card}>
          <Text style={styles.heading}>Please complete patient details</Text>

          {/* first name */}
          <Controller
            control={control}
            name="first_name"
            rules={{ required: true }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={styles.input}
                placeholder="First name"
                placeholderTextColor="#999"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                returnKeyType="next"
              />
            )}
          />

          {/* last name */}
          <Controller
            control={control}
            name="last_name"
            rules={{ required: true }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={styles.input}
                placeholder="Last name"
                placeholderTextColor="#999"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                returnKeyType="next"
              />
            )}
          />

          {/* date of birth */}
          {/* <Controller
            control={control}
            name="date_of_birth"
            rules={{ required: true }}
            render={({ field: { onChange } }) => (
              <>
                <Pressable
                  style={styles.input}
                  onPress={() => setShowDate(true)}
                >
                  <Text style={{ color: dob ? "#000" : "#999" }}>
                    {dob || "Date of birth"}
                  </Text>
                </Pressable>

                {showDate && (
                  <DateTimePicker
                    mode="date"
                    display={Platform.OS === "ios" ? "inline" : "default"}
                    value={dob ? new Date(dob) : new Date(2000, 0, 1)}
                    maximumDate={new Date()}
                    onChange={(_, d) => {
                      setShowDate(Platform.OS === "ios");
                      if (d) {
                        const iso = d.toISOString().slice(0, 10);
                        onChange(iso);
                      }
                    }}
                  />
                )}
              </>
            )}
          /> */}

          {/* gender picker */}
          {/* <Controller
            control={control}
            name="gender"
            rules={{ required: true }}
            render={({ field: { onChange, value } }) => (
              <View style={styles.pickerWrapper}>
                <Picker selectedValue={value} onValueChange={onChange}>
                  <Picker.Item label="Male" value="Male" />
                  <Picker.Item label="Female" value="Female" />
                  <Picker.Item label="Other" value="Other" />
                </Picker>
              </View>
            )}
          /> */}

          {/* submit */}
          <Pressable
            style={[styles.button, { opacity: isValid ? 1 : 0.5 }]}
            disabled={!isValid}
            onPress={handleSubmit(onDone)}
          >
            <Text style={styles.buttonText}>Save</Text>
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
