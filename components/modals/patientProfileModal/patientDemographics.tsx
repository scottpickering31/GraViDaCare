import { ControlledText } from "@/components/modals/patientProfileModal/controlledText";
import { patientInfoModalFormValues } from "@/types/patientInfoModalFormValues";
import { useFormContext } from "react-hook-form";

export default function PatientDemographics() {
  const { control } = useFormContext<patientInfoModalFormValues>();

  return (
    <>
      <ControlledText name="firstName" label="First Name" />
      <ControlledText name="lastName" label="Last Name" />
      <ControlledText name="dob" label="Date of Birth" />
      <ControlledText name="gender" label="Gender" />
    </>
  );
}

// firstName?: string;
//   lastName?: string;
//   dob: string;
//   gender: "Male" | "Female" | "Other";
