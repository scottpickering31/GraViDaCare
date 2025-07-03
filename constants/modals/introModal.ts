import Allergies from "@/components/modals/patientProfileModal/allergies";
import PatientMeasurements from "@/components/modals/patientProfileModal/measurements";
import NeurologistInformation from "@/components/modals/patientProfileModal/neurologistInformation";
import PatientDemographics from "@/components/modals/patientProfileModal/patientDemographics";
import SeizureTypes from "@/components/modals/patientProfileModal/seizureTypes";
import {z} from "zod"


export const defaultIntroModalValues = {
    firstName: "",
    lastName: "",
    dob: "",
    gender: "",
    allergies: "",
    emergency_phone: "",
    head_circumference_cm: 0,
    weight_kg: 0,
    height_cm: 0,
    neurologistName: "",
    hospital: "",
    rescueMedication: "",
    rescueMedicationDoseMg: 0,
    primaryDiagnosis: "",
    firstSeizureDate: "",
    seizureTypes: [],
  };

  export const fullWizardSchema = z.object({
    firstName: z.string(),
    lastName: z.string(),
    dob: z.string(),
    gender: z.string(),
    allergies: z.string(),
    emergency_phone: z.string(),
    head_circumference_cm: z.number(),
    weight_kg: z.number(),
    height_cm: z.number(),
    neurologistName: z.string(),
    hospital: z.string(),
    rescueMedication: z.string(),
    rescueMedicationDoseMg: z.number(),
    primaryDiagnosis: z.string(),
    firstSeizureDate: z.string(),
    seizureTypes: z.array(z.string()),
  });
  
  export const steps = [
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