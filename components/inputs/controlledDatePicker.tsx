import DateTimePicker from "@react-native-community/datetimepicker";
import { useState } from "react";
import {
  Controller,
  FieldPath,
  FieldValues,
  useFormContext,
} from "react-hook-form";
import { Button, Platform, Text, View } from "react-native";

type ControlledDatePickerProps<T extends FieldValues> = {
  name: FieldPath<T>;
  label?: string;
  onFieldFocusChange?: (focused: boolean) => void; // 👈 added
};

export function ControlledDatePicker<T extends FieldValues>({
  name,
  label,
  onFieldFocusChange,
}: ControlledDatePickerProps<T>) {
  const {
    control,
    formState: { errors },
  } = useFormContext<T>();

  const errorMsg = errors[name]?.message as string | undefined;
  const [show, setShow] = useState(false);

  const openPicker = () => {
    setShow(true);
    onFieldFocusChange?.(true); // 👈 hide circle when picker opens
  };

  const closePicker = () => {
    setShow(false);
    onFieldFocusChange?.(false); // 👈 show circle when picker closes
  };

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { value, onChange } }) => {
        const displayDate = value
          ? new Date(value).toLocaleDateString()
          : "Select date";
        return (
          <View style={{ marginVertical: 8 }}>
            <Button title={label ?? displayDate} onPress={openPicker} />

            {show && (
              <DateTimePicker
                value={value ? new Date(value) : new Date()}
                mode="date"
                display={Platform.OS === "ios" ? "spinner" : "default"}
                onChange={(_, selectedDate) => {
                  closePicker();
                  if (selectedDate) {
                    const isoDate = selectedDate.toISOString();
                    onChange(isoDate);
                  }
                }}
              />
            )}
            {errorMsg && <Text style={{ color: "red" }}>{errorMsg}</Text>}
          </View>
        );
      }}
    />
  );
}
