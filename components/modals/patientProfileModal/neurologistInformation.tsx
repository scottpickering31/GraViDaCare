import { ControlledText } from "@/components/modals/patientProfileModal/controlledText";

export default function NeurologistInformation() {
 

  return (
    <>
      <ControlledText name="neurologistName" label="Neurologist Name" />
      <ControlledText name="hospital" label="Hospital"/>
      <ControlledText name="rescueMedication" label="Rescue Medication"/>
      <ControlledText name="rescueMedicationDoseMg" label="Rescue Medication Dose (mg)"/>
    </>
  );
}
// neurologist_name?: string;
// hospital?: string;
// rescue_medication?: string;
// rescue_medication_dose_mg?: number;