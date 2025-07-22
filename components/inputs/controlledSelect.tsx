import { PatientProfileWizardSchema } from "@/constants/modals/patientProfileModal";
import { Controller, Path, useFormContext } from "react-hook-form";
import { Text, TouchableOpacity, View } from "react-native";
import { z } from "zod";

type FormValues = z.infer<typeof PatientProfileWizardSchema>;

type ControlledSelectProps = {
  name: Path<FormValues>;
  label?: string;
  options: readonly string[];
  dropdownVisible: boolean;
  setDropdownVisible: (v: boolean) => void;
};

export function ControlledSelect({
  name,
  options,
  label,
  dropdownVisible,
  setDropdownVisible,
}: ControlledSelectProps) {
  const {
    control,
    formState: { errors },
  } = useFormContext<FormValues>();

  const errorMsg = errors[name]?.message;

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { value, onChange } }) => {
        console.log(`${name} value:`, value);
        return (
          <View style={{ marginVertical: 8 }}>
            {!dropdownVisible && (
              <TouchableOpacity
                onPress={() => setDropdownVisible(!dropdownVisible)}
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

            {dropdownVisible && (
              <View style={{ marginTop: 8 }}>
                {options.map((opt) => {
                  const isSelected = value === opt;
                  return (
                    <TouchableOpacity
                      key={opt}
                      onPress={() => {
                        onChange(opt);
                        setDropdownVisible(false);
                      }}
                      style={{
                        padding: 12,
                        marginVertical: 2,
                        backgroundColor: isSelected ? "#cce5ff" : "#ffffff",
                        borderRadius: 6,
                        borderWidth: 1,
                      }}
                    >
                      <Text>{opt}</Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
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
