import { useEffect, useState } from "react";
import { Controller, FieldPath, FieldValues, useFormContext } from "react-hook-form";
import { Text, TextInput } from "react-native";

type ControlledNumberProps<T extends FieldValues> = {
  name: FieldPath<T>;
  label?: string;
};

export function ControlledNumber<T extends FieldValues>({
  name,
  label,
}: ControlledNumberProps<T>) {
  const {
    control,
    formState: { errors },
  } = useFormContext<T>();

  const errorMsg = errors[name]?.message as string | undefined;
  const [input, setInput] = useState("");

  return (
    <Controller
      key={name}
      control={control}
      name={name}
      render={({ field: { value, onChange } }) => {
        useEffect(() => {
          if (typeof value === "number") {
            setInput(value.toString());
          } else {
            setInput("");
          }
        }, [value, name]);

        const handleChange = (text: string) => {
          if (/^\d*\.?\d{0,3}$/.test(text)) {
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
              style={{
                borderWidth: 1,
                borderRadius: 12,
                padding: 12,
                borderColor: "#ccc",
              }}
            />
            {errorMsg && <Text style={{ color: "red", marginTop: 4 }}>{errorMsg}</Text>}
          </>
        );
      }}
    />
  );
}
