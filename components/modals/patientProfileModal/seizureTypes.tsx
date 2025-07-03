import { ControlledText } from "@/components/modals/patientProfileModal/controlledText";
import { patientInfoModalFormValues } from "@/types/patientInfoModalFormValues";
import { useFormContext } from "react-hook-form";

export default function SeizureTypes() {
  const { control } = useFormContext<patientInfoModalFormValues>();

  return (
    <>
      <ControlledText name="primaryDiagnosis" label="Primary Diagnosis" />
      <ControlledText name="seizureTypes" label="Seizure Types" />
      <ControlledText name="firstSeizureDate" label="First Seizure Date" />
    </>
  );
}

// primaryDiagnosis: string;
//   seizure_types: string[];
//   first_seizure_at?: string;
