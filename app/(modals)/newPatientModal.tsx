import CreatePatientProfileModal from "@/components/modals/modalTemplate";
import Allergies from "@/components/modals/patientProfileModal/allergies";
import PatientMeasurements from "@/components/modals/patientProfileModal/measurements";
import NeurologistInformation from "@/components/modals/patientProfileModal/neurologistInformation";
import PatientDemographics from "@/components/modals/patientProfileModal/patientDemographics";
import SeizureTypes from "@/components/modals/patientProfileModal/seizureTypes";
import React, { useState } from "react";

const steps = [
  {
    heading: "Patient Demographics",
    Component: PatientDemographics,
  },
  {
    heading: "Height & weight",
    Component: PatientMeasurements,
  },
  {
    heading: "Allergies",
    Component: Allergies,
  },
  {
    heading: "Neurologist Information",
    Component: NeurologistInformation,
  },
  {
    heading: "Seizure Types",
    Component: SeizureTypes,
  },
];

export default function NewPatientModal() {
  const [step, setStep] = useState(0);
  const [visible, setVisible] = useState(true);

  const isLast = step === steps.length - 1;
  const Current = steps[step].Component;

  const handleNext = () => {
    if (isLast) {
      // TODO: submit to Supabase
      setVisible(false);
    } else {
      setStep((s) => s + 1);
    }
  };

  return (
    <CreatePatientProfileModal
      headingText={steps[step].heading}
      onPress={handleNext}
    >
      <Current />
    </CreatePatientProfileModal>
  );
}
