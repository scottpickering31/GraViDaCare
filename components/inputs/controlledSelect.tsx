import { useState } from "react";
import {
  Controller,
  FieldPath,
  FieldValues,
  useFormContext,
} from "react-hook-form";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";

type ControlledSelectProps<T extends FieldValues> = {
  name: FieldPath<T>;
  label?: string;
  options: readonly string[];
  onFieldFocusChange?: (focused: boolean) => void;
};

export function ControlledSelect<T extends FieldValues>({
  name,
  label,
  options,
  onFieldFocusChange,
}: ControlledSelectProps<T>) {
  const {
    control,
    formState: { errors },
  } = useFormContext<T>();

  const [dropDownVisible, setDropDownVisible] = useState(false);

  const errorMsg = errors[name]?.message as string | undefined;

  const handleOpenDropdown = () => {
    setDropDownVisible(true);
    onFieldFocusChange?.(true);
  };

  const handleSelectOption = (
    opt: string,
    onChange: (value: string) => void
  ) => {
    onChange(opt);
    setDropDownVisible(false);
    onFieldFocusChange?.(false);
  };

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { value, onChange } }) => (
        <View style={{ marginVertical: 8 }}>
          {!dropDownVisible && (
            <TouchableOpacity
              onPress={handleOpenDropdown}
              style={{
                padding: 12,
                borderWidth: 1,
                borderRadius: 8,
                backgroundColor: "#f9f9f9",
              }}
            >
              <Text>{value || label || "Select an option"}</Text>
            </TouchableOpacity>
          )}
          {dropDownVisible && (
            <ScrollView
              persistentScrollbar
              style={{
                maxHeight: 300,
                borderWidth: 1,
                borderRadius: 8,
              }}
            >
              {options.map((opt) => {
                const isSelected = value === opt;
                return (
                  <TouchableOpacity
                    key={opt}
                    onPress={() => handleSelectOption(opt, onChange)}
                    style={{
                      padding: 12,
                      backgroundColor: isSelected ? "#cce5ff" : "#ffffff",
                      borderBottomWidth: 1,
                      borderColor: "#eee",
                    }}
                  >
                    <Text>{opt}</Text>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          )}
          {errorMsg && (
            <Text style={{ color: "red", marginTop: 4 }}>{errorMsg}</Text>
          )}
        </View>
      )}
    />
  );
}
