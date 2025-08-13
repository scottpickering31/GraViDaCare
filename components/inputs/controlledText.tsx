import {
  Controller,
  FieldPath,
  FieldValues,
  useFormContext,
} from "react-hook-form";
import { Text, TextInput } from "react-native";

type ControlledTextProps<T extends FieldValues> = {
  name: FieldPath<T>;
  label?: string;
  multiline?: boolean;
  keyboardType?: "default" | "numeric" | "email-address";
};

export function ControlledText<T extends FieldValues>({
  name,
  label,
  multiline,
  keyboardType = "default",
  onFieldFocusChange,
}: ControlledTextProps<T> & {
  onFieldFocusChange?: (focused: boolean) => void;
}) {
  const {
    control,
    formState: { errors },
  } = useFormContext<T>();

  const errorMsg = errors[name]?.message as string | undefined;

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
            keyboardType={keyboardType}
            placeholder={label}
            placeholderTextColor="gray"
            onFocus={() => onFieldFocusChange?.(true)}
            onBlur={() => onFieldFocusChange?.(false)}
            style={{
              borderWidth: 1,
              borderColor: "#ccc",
              height: multiline ? 100 : 40,
              borderRadius: 8,
              padding: 10,
            }}
          />
        )}
      />
      {errorMsg && (
        <Text style={{ color: "red", marginTop: 4 }}>{errorMsg}</Text>
      )}
    </>
  );
}
