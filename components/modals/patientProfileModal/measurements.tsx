import { ControlledText } from "@/components/modals/patientProfileModal/controlledText";

export default function PatientMeasurements() {
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
