import { PatientProfileWizardSchema } from "@/constants/modals/patientProfileModal";
import { Controller, Path, useFormContext } from "react-hook-form";
import { Text, TextInput } from "react-native";
import { z } from "zod";

type FormValues = z.infer<typeof PatientProfileWizardSchema>;

type ControlledNumberProps = {
  name: Path<FormValues>;
  label?: string;
};

export function ControlledNumber({ name, label }: ControlledNumberProps) {
  const {
    control,
    formState: { errors },
  } = useFormContext<FormValues>();

  const errorMsg = errors[name]?.message;

  return (
    <>
      <Controller
        control={control}
        name={name}
        render={({ field: { value, onChange } }) => {
          console.log(`${name} value:`, value);
          return (
            <TextInput
              value={value !== undefined ? String(value) : ""}
              onChangeText={(text) => {
                const parsed = text === "" ? undefined : Number(text);
                onChange(parsed !== undefined ? parsed : 0);
              }}
              keyboardType="numeric"
              placeholder={label}
              style={{ borderWidth: 1 }}
            />
          );
        }}
      />
      {errorMsg && (
        <Text style={{ color: "red", marginTop: 4 }}>{errorMsg}</Text>
      )}
    </>
  );
}
