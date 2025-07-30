import DateTimePicker from "@react-native-community/datetimepicker";
import { useState } from "react";
import { Controller, useFormContext, FieldPath, FieldValues } from "react-hook-form";
import { Button, Platform, Text, View } from "react-native";

type ControlledDatePickerProps<T extends FieldValues> = {
  name: FieldPath<T>;
  label?: string;
};

export function ControlledDatePicker<T extends FieldValues>({
  name,
  label,
}: ControlledDatePickerProps<T>) {
  const {
    control,
    formState: { errors },
  } = useFormContext<T>();

  const errorMsg = errors[name]?.message as string | undefined;
  const [show, setShow] = useState(false);

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
            <Button title={label ?? displayDate} onPress={() => setShow(true)} />

            {show && (
              <DateTimePicker
                value={value ? new Date(value) : new Date()}
                mode="date"
                display={Platform.OS === "ios" ? "spinner" : "default"}
                onChange={(_, selectedDate) => {
                  setShow(false);
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
