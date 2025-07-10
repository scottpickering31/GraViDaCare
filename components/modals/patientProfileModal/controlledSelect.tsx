import { Controller, Path, useFormContext } from "react-hook-form";
import { Text, View } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { fullWizardSchema } from "@/constants/modals/introModal";
import { z } from "zod";

type FormValues = z.infer<typeof fullWizardSchema>;

type Option = { label: string; value: string };

type ControlledSelectProps = {
  name: Path<FormValues>;
  label?: string;
  options: Option[];
};

export function ControlledSelect({ name, label, options }: ControlledSelectProps) {
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
          <Text style={{ marginBottom: 4 }}>{label}</Text>
          <Picker selectedValue={value} onValueChange={onChange}>
            <Picker.Item label="Select an option…" value="" />
            {options.map((opt) => (
              <Picker.Item key={opt.value} label={opt.label} value={opt.value} />
            ))}
          </Picker>
          {errorMsg && <Text style={{ color: "red" }}>{errorMsg}</Text>}
        </View>
      )}
    />
  );
}
