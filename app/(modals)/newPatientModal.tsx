import CreatePatientProfileModal from "@/components/modals/patientProfileModal/createPatientProfileModal";
import {
  FormValues,
  PatientProfileModalSteps,
  PatientProfileWizardSchema,
  PatientProfileWizardValues,
} from "@/constants/modals/patientProfileModal";
import { zodResolver } from "@hookform/resolvers/zod";
import { router } from "expo-router";
import React, { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";

export default function NewPatientModal() {
  const methods = useForm<FormValues>({
    resolver: zodResolver(PatientProfileWizardSchema),
    defaultValues: PatientProfileWizardValues,
    mode: "onSubmit",
  });

  const [step, setStep] = useState(0);
  const currentStep = PatientProfileModalSteps[step];
  const isLast = step === PatientProfileModalSteps.length - 1;
  const canGoBack = step > 0;

  /** Validate only the fields that belong to the current step */
  const validateCurrentStep = async () => {
    const { trigger } = methods;
    return trigger(currentStep.name as any); // `name` is a string key
  };

  /** NEXT / SUBMIT */
  const handleNext = async () => {
    const isValid = await validateCurrentStep();
    if (!isValid) return;

    if (isLast) {
      methods.handleSubmit(async (data) => {
        console.log("SUBMIT:", data);
        // await supabase.from("patients").insert(data);
        router.dismiss(); // ⬅️ close modal route
      })();
    } else {
      setStep((s) => s + 1);
    }
  };

  /** BACK */
  const handleBack = () => step > 0 && setStep((s) => s - 1);

  /** SKIP (only for skippable steps) */

  return (
    <FormProvider {...methods}>
      <CreatePatientProfileModal
        headingText={currentStep.title}
        currentStep={currentStep}
        onNextPress={handleNext}
        onBackPress={handleBack}
        isLast={isLast}
        canGoBack={canGoBack}
      />
    </FormProvider>
  );
}
