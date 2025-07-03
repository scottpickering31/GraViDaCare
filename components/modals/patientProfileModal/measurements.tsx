import { ControlledText } from "@/components/modals/patientProfileModal/controlledText";
import { patientInfoModalFormValues } from "@/types/patientInfoModalFormValues";
import { useFormContext } from "react-hook-form";

export default function Measurements() {
  const { control } = useFormContext<patientInfoModalFormValues>();

  return (
    <>
      <ControlledText name="head_circumference_cm" label="Head Circumference" />
      <ControlledText name="weight_kg" label="Weight" />
      <ControlledText name="height_cm" label="Height" />
    </>
  );
}
// head_circumference_cm?: number;
//   weight_kg?: number;
//   height_cm?: number;
