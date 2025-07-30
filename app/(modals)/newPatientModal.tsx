import { useUser } from "@/api/auth/useUser";
import { useCreatePatientProfile } from "@/api/patients/useCreatePatientProfile";
import CreatePatientProfileModal from "@/components/modals/patientProfileModal/createPatientProfileModal";
import {
  FormValues,
  PatientProfileModalSteps,
  PatientProfileWizardSchema,
  PatientProfileWizardValues,
} from "@/constants/modals/patientProfileModal";
import { usePatientProfileStore } from "@/store/patientProfileStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { router } from "expo-router";
import React, { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import Toast from "react-native-toast-message";

export default function NewPatientModal() {
  const setActivePatientId = usePatientProfileStore(
    (s) => s.setActivePatientId
  );
  const createPatientProfile = useCreatePatientProfile();
  const user = useUser();
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
    const { trigger, getValues } = methods;

    const currentField = currentStep.name;
    const currentValue = getValues(currentField);

    console.log(`🔍 Validating step ${step} - ${currentField}:`, currentValue);

    const valid = await trigger(currentField);

    if (!valid) {
      console.warn(`❌ Validation failed for "${currentField}"`);
    } else {
      console.log(`✅ Validation passed for "${currentField}"`);
    }

    return valid;
  };

  /** NEXT / SUBMIT */
  const handleNext = async () => {
    const isValid = await validateCurrentStep();
    if (!isValid) return;

    if (!isLast) {
      setStep((s) => s + 1);
    } else {
      methods.handleSubmit(async (data) => {
        console.log("Submitted data:", data);
        if (!user.user) return;

        try {
          const created = await createPatientProfile.mutateAsync({
            formData: data,
            userId: user.user.id,
          });
          setActivePatientId(created.id); 
          Toast.show({
            type: "success",
            text1: "Patient profile created",
          });

          router.dismiss();
        } catch (err) {
          Toast.show({
            type: "error",
            text1: "Failed to create patient profile",
          });
          console.error("❌ Failed to create profile:", err);
        }
      })();
    }
  };

  /** BACK */
  const handleBack = () => {
    if (canGoBack) {
      console.log(`⬅️ Going back to step ${step - 1}`);
      setStep((s) => s - 1);
    }
  };

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
