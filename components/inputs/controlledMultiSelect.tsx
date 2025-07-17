import { PatientProfileWizardSchema } from "@/constants/modals/patientProfileModal";
import { Controller, Path, useFormContext } from "react-hook-form";
import { Text, TouchableOpacity, View } from "react-native";
import { z } from "zod";

type FormValues = z.infer<typeof PatientProfileWizardSchema>;

type ControlledMultiSelectProps = {
  name: Path<FormValues>;
  label?: string;
  options: string[];
};

export function ControlledMultiSelect({
  name,
  label,
  options,
}: ControlledMultiSelectProps) {
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
        const selectedValues = Array.isArray(value) ? value : [];

        const toggleValue = (option: string) => {
          if (selectedValues.includes(option)) {
            onChange(selectedValues.filter((v) => v !== option));
          } else {
            onChange([...selectedValues, option]);
          }
        };

        return (
          <View style={{ marginVertical: 8 }}>
            {options.map((opt) => {
              const isSelected = selectedValues.includes(opt);
              return (
                <TouchableOpacity
                  key={opt}
                  onPress={() => toggleValue(opt)}
                  style={{
                    padding: 12,
                    marginVertical: 4,
                    backgroundColor: isSelected ? "#cce5ff" : "#f0f0f0",
                    borderRadius: 8,
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
        );
      }}
    />
  );
}
