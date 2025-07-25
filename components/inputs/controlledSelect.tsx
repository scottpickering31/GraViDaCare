import { PatientProfileWizardSchema } from "@/constants/modals/patientProfileModal";
import { useState } from "react";
import { Controller, Path, useFormContext } from "react-hook-form";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { z } from "zod";

type FormValues = z.infer<typeof PatientProfileWizardSchema>;

type ControlledSelectProps = {
  name: Path<FormValues>;
  label?: string;
  options: readonly string[];
};

export function ControlledSelect({ name, options }: ControlledSelectProps) {
  const {
    control,
    formState: { errors },
  } = useFormContext<FormValues>();

  const [dropDownVisible, setDropDownVisible] = useState(false);

  const errorMsg = errors[name]?.message;

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { value, onChange } }) => {
        return (
          <View style={{ marginVertical: 8 }}>
            {!dropDownVisible && (
              <TouchableOpacity
                onPress={() => setDropDownVisible(true)}
                style={{
                  padding: 12,
                  borderWidth: 1,
                  borderRadius: 8,
                  backgroundColor: "#f9f9f9",
                }}
              >
                <Text>{value || "Select an option"}</Text>
              </TouchableOpacity>
            )}
            {dropDownVisible && (
              <ScrollView
                persistentScrollbar={true}
                style={{
                  maxHeight: 300,
                  borderWidth: 1,
                  borderRadius: 8,
                }}
              >
                {options.map((opt) => {
                  const isSelected = value === opt;
                  return (
                    <TouchableOpacity
                      key={opt}
                      onPress={() => {
                        onChange(opt);
                        setDropDownVisible(false);
                      }}
                      style={{
                        padding: 12,
                        backgroundColor: isSelected ? "#cce5ff" : "#ffffff",
                        borderBottomWidth: 1,
                        borderColor: "#eee",
                      }}
                    >
                      <Text>{opt}</Text>
                    </TouchableOpacity>
                  );
                })}
              </ScrollView>
            )}
            {errorMsg && (
              <Text style={{ color: "red", marginTop: 4 }}>{errorMsg}</Text>
            )}
          </View>
        );
      }}
    />
  );
}
