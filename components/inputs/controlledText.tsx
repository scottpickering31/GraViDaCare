import { PatientProfileWizardSchema } from "@/constants/modals/patientProfileModal";
import { Controller, Path, useFormContext } from "react-hook-form";
import { Text, TextInput } from "react-native";
import { z } from "zod";

/** 1️⃣  Infer the real object type from the Zod schema */
type FormValues = z.infer<typeof PatientProfileWizardSchema>;

type ControlledTextProps = {
  /** 2️⃣  Constrain “name” to one of the keys of FormValues */
  name: Path<FormValues>;
  label?: string;
  multiline?: boolean;
  keyboardType?: "default" | "numeric" | "email-address";
};

export function ControlledText({
  name,
  label,
  multiline,
  keyboardType,
}: ControlledTextProps) {
  /** 3️⃣  Tell React‑Hook‑Form what the context’s value type is */
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
              value={String(value ?? "")}
              onChangeText={onChange}
              multiline={multiline}
              style={{
                borderWidth: 1,
                height: multiline ? 100 : 40,
                borderRadius: 8,
              }}
              placeholderTextColor={"gray"}
              placeholder={"Enter " + label}
              keyboardType={keyboardType}
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
