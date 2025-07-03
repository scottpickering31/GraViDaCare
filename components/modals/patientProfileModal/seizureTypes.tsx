import { ControlledText } from "@/components/modals/patientProfileModal/controlledText";


export default function SeizureTypes() {
  

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
