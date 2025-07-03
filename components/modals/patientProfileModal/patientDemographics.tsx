import { ControlledText } from "@/components/modals/patientProfileModal/controlledText";

export default function PatientDemographics() {


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
