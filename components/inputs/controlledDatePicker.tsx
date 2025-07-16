import { PatientProfileWizardSchema } from "@/constants/modals/patientProfileModal";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useState } from "react";
import { Controller, Path, useFormContext } from "react-hook-form";
import { Button, Platform, Text, View } from "react-native";
import { z } from "zod";

type FormValues = z.infer<typeof PatientProfileWizardSchema>;

type ControlledDatePickerProps = {
  name: Path<FormValues>;
  label?: string;
};

export function ControlledDatePicker({
  name,
  label,
}: ControlledDatePickerProps) {
  const {
    control,
    formState: { errors },
  } = useFormContext<FormValues>();

  const errorMsg = errors[name]?.message;
  const [show, setShow] = useState(false);

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { value, onChange } }) => {
        const displayDate = value
          ? new Date(value).toLocaleDateString()
          : "Select date";
        console.log(`${name} value:`, value);
        return (
          <View style={{ marginVertical: 8 }}>
            <Text style={{ marginBottom: 4 }}>{label}</Text>
            <Button title={displayDate} onPress={() => setShow(true)} />

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
