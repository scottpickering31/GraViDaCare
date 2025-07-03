import CreatePatientProfileModal from "@/components/modals/patientProfileModal/createPatientProfileModal";
import {
  defaultIntroModalValues,
  fullWizardSchema,
  steps,
} from "@/constants/modals/introModal";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";

type FormValues = z.infer<typeof fullWizardSchema>;

export default function NewPatientModal() {
  const methods = useForm<FormValues>({
    resolver: zodResolver(fullWizardSchema),
    ...defaultIntroModalValues,
  });

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

  const handleBack = () => {
    if (step === 0) return;
    setStep((s) => s - 1);
  };

  return (
    <FormProvider {...methods}>
      <CreatePatientProfileModal
        headingText={steps[step].heading}
        onNextPress={handleNext}
        onBackPress={handleBack}
      >
        <Current />
      </CreatePatientProfileModal>
    </FormProvider>
  );
}
