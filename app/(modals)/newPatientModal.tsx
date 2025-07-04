import CreatePatientProfileModal from "@/components/modals/patientProfileModal/createPatientProfileModal";
import {
  defaultIntroModalValues,
  FormValues,
  fullWizardSchema,
  steps,
} from "@/constants/modals/introModal";
import { zodResolver } from "@hookform/resolvers/zod";
import { router } from "expo-router";
import React, { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";

export default function NewPatientModal() {
  const methods = useForm<FormValues>({
    resolver: zodResolver(fullWizardSchema),
    defaultValues: defaultIntroModalValues,
    mode: "onChange",
  });

  const [step, setStep] = useState(0);
  const currentStep = steps[step];
  const isLast = step === steps.length - 1;
  const canGoBack = step > 0;
  const showSkip = step > 0 && currentStep.skippable;

  /** Validate only the fields that belong to the current step */
  const validateCurrentStep = async () => {
    const { trigger } = methods;
    return trigger(currentStep.fields);
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
  const handleSkip = () => {
    methods.handleSubmit(async (data) => {
      console.log("SUBMIT:", data);
      // await supabase.from("patients").insert(data);
      router.dismiss(); // ⬅️ close modal route
    })();
  };

  return (
    <FormProvider {...methods}>
      <CreatePatientProfileModal
        headingText={currentStep.heading}
        onNextPress={handleNext}
        onBackPress={handleBack}
        onSkipPress={showSkip ? handleSkip : undefined}
        isLast={isLast}
        canGoBack={canGoBack}
      >
        <currentStep.Component />
      </CreatePatientProfileModal>
    </FormProvider>
  );
}
