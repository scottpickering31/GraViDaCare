import { useState } from "react";
import {
  Controller,
  FieldPath,
  FieldValues,
  useFormContext,
} from "react-hook-form";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";

type ControlledMultiSelectProps<T extends FieldValues> = {
  name: FieldPath<T>;
  label?: string;
  options: string[];
  onFieldFocusChange?: (focused: boolean) => void; // 🔹 added
};

export function ControlledMultiSelect<T extends FieldValues>({
  name,
  label,
  options,
  onFieldFocusChange,
}: ControlledMultiSelectProps<T>) {
  const {
    control,
    formState: { errors },
  } = useFormContext<T>();

  const [isOpen, setIsOpen] = useState(false); // 🔹 track open/closed state
  const errorMsg = errors[name]?.message as string | undefined;

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { value, onChange } }) => {
        const selectedValues: string[] = Array.isArray(value) ? [...value] : [];

        const toggleValue = (option: string) => {
          const updated = selectedValues.includes(option)
            ? selectedValues.filter((v) => v !== option)
            : [...selectedValues, option];

          onChange(updated);
        };

        const handleOpen = () => {
          setIsOpen(true);
          onFieldFocusChange?.(true); // 🔹 notify focus
        };

        const handleClose = () => {
          setIsOpen(false);
          onFieldFocusChange?.(false); // 🔹 notify blur
        };

        return (
          <View style={{ marginVertical: 8 }}>
            {!isOpen && (
              <TouchableOpacity
                onPress={handleOpen}
                style={{
                  padding: 12,
                  borderWidth: 1,
                  borderRadius: 8,
                  backgroundColor: "#f9f9f9",
                }}
              >
                <Text>
                  {selectedValues.length > 0
                    ? selectedValues.join(", ")
                    : label || "Select options"}
                </Text>
              </TouchableOpacity>
            )}

            {isOpen && (
              <ScrollView style={{ maxHeight: 300 }} persistentScrollbar>
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
                        borderWidth: 1,
                        borderColor: "#ccc",
                      }}
                    >
                      <Text>{opt}</Text>
                    </TouchableOpacity>
                  );
                })}

                <TouchableOpacity onPress={handleClose} style={{ padding: 12 }}>
                  <Text style={{ color: "red" }}>Done</Text>
                </TouchableOpacity>
              </ScrollView>
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
