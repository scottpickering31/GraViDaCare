import { PatientProfileWizardSchema } from "@/constants/modals/patientProfileModal";
import { useEffect, useState } from "react";
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

  const [input, setInput] = useState("");

  return (
    <Controller
      key={name}
      control={control}
      name={name}
      render={({ field: { value, onChange } }) => {
        // 🧠 Sync local state with RHF value + name change
        useEffect(() => {
          console.log("name:", name, "value from RHF:", value);
          if (typeof value === "number") {
            setInput(value.toString());
          } else {
            setInput("");
          }
        }, [value, name]);

        const handleChange = (text: string) => {
          if (/^\d*\.?\d{0,1}$/.test(text)) {
            setInput(text);
            const parsed = parseFloat(text);
            if (!text.endsWith(".") && !isNaN(parsed)) {
              onChange(parsed);
            } else if (text === "") {
              onChange(undefined);
            }
          }
        };

        return (
          <>
            <TextInput
              value={input}
              onChangeText={handleChange}
              keyboardType="decimal-pad"
              inputMode="decimal"
              placeholder={label}
              style={{ borderWidth: 1, borderRadius: 12, padding: 12 }}
            />
            {errorMsg && (
              <Text style={{ color: "red", marginTop: 4 }}>{errorMsg}</Text>
            )}
          </>
        );
      }}
    />
  );
}
