import { PatientProfileWizardSchema } from "@/constants/modals/patientProfileModal";
import { Controller, Path, useFormContext } from "react-hook-form";
import { Text, TouchableOpacity, View } from "react-native";
import { z } from "zod";

type FormValues = z.infer<typeof PatientProfileWizardSchema>;

type ControlledSelectProps = {
  name: Path<FormValues>;
  label?: string;
  options: readonly string[];
};

export function ControlledSelect({
  name,
  label,
  options,
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
      render={({ field: { value, onChange } }) => (
        <View style={{ marginVertical: 8 }}>
          {options.map((opt) => {
            const isSelected = value === opt;
            return (
              <TouchableOpacity
                key={opt}
                onPress={() => onChange(opt)}
                style={{
                  padding: 12,
                  marginVertical: 4,
                  backgroundColor: isSelected ? "#cce5ff" : "#f0f0f0",
                  borderRadius: 8,
                  borderWidth: 1,
                }}
              >
                <Text>{opt}</Text>
              </TouchableOpacity>
            );
          })}

          {errorMsg && (
            <Text style={{ color: "red", marginTop: 4 }}>{errorMsg}</Text>
          )}
        </View>
      )}
    />
  );
}
