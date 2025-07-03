import { fullWizardSchema } from "@/constants/modals/introModal";
import { Controller, Path, useFormContext } from "react-hook-form";
import { TextInput } from "react-native";
import { z } from "zod";

/** 1️⃣  Infer the real object type from the Zod schema */
type FormValues = z.infer<typeof fullWizardSchema>; // { firstName: string; … }

type ControlledTextProps = {
  /** 2️⃣  Constrain “name” to one of the keys of FormValues */
  name: Path<FormValues>;
  label?: string;
  multiline?: boolean;
};

export function ControlledText({
  name,
  label,
  multiline,
}: ControlledTextProps) {
  /** 3️⃣  Tell React‑Hook‑Form what the context’s value type is */
  const {
    control,
    formState: { errors },
  } = useFormContext<FormValues>();

  return (
    <>
      <Controller
        control={control}
        name={name}
        render={({ field: { value, onChange } }) => (
          <TextInput
            value={String(value ?? "")}
            onChangeText={onChange}
            multiline={multiline}
            style={{ borderWidth: 1 }}
            placeholderTextColor={"gray"}
            placeholder={label}
          />
        )}
      />
    </>
  );
}
