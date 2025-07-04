import Allergies from "@/components/modals/patientProfileModal/allergies";
import PatientMeasurements from "@/components/modals/patientProfileModal/measurements";
import NeurologistInformation from "@/components/modals/patientProfileModal/neurologistInformation";
import PatientDemographics from "@/components/modals/patientProfileModal/patientDemographics";
import SeizureTypes from "@/components/modals/patientProfileModal/seizureTypes";
import { z } from "zod";

export const fullWizardSchema = z.object({
  /** DEMOGRAPHICS (required) */
  firstName: z.string().min(1, "Required"),
  lastName: z.string().min(1, "Required"),
  dob: z.string().min(1, "Required"),
  gender: z.string().min(1, "Required"),

  /** MEASUREMENTS (optional) */
  head_circumference_cm: z.number().optional(),
  weight_kg: z.number().optional(),
  height_cm: z.number().optional(),

  /** ALLERGIES (optional) */
  allergies: z.string().optional(),
  emergency_phone: z.string().optional(),

  /** NEURO INFO (optional) */
  neurologistName: z.string().optional(),
  hospital: z.string().optional(),
  rescueMedication: z.string().optional(),
  rescueMedicationDoseMg: z.number().optional(),

  /** SEIZURE TYPES (optional for now) */
  primaryDiagnosis: z.string().optional(),
  firstSeizureDate: z.string().optional(),
  seizureTypes: z.array(z.string()).optional(),
});
export type FormValues = z.infer<typeof fullWizardSchema>;

/** Default values */
export const defaultIntroModalValues: FormValues = {
  firstName: "",
  lastName: "",
  dob: "",
  gender: "",

  head_circumference_cm: undefined,
  weight_kg: undefined,
  height_cm: undefined,

  allergies: "",
  emergency_phone: "",

  neurologistName: "",
  hospital: "",
  rescueMedication: "",
  rescueMedicationDoseMg: undefined,

  primaryDiagnosis: "",
  firstSeizureDate: "",
  seizureTypes: [],
};

/** Wizard steps – which fields belong to each screen */
export const steps = [
  {
    heading: "Patient demographics",
    Component: PatientDemographics,
    fields: ["firstName", "lastName", "dob", "gender"] as const,
    /** cannot skip until these are valid */
    skippable: false,
  },
  {
    heading: "Height & weight",
    Component: PatientMeasurements,
    fields: ["head_circumference_cm", "weight_kg", "height_cm"] as const,
    skippable: true,
  },
  {
    heading: "Allergies",
    Component: Allergies,
    fields: ["allergies", "emergency_phone"] as const,
    skippable: true,
  },
  {
    heading: "Neurologist information",
    Component: NeurologistInformation,
    fields: [
      "neurologistName",
      "hospital",
      "rescueMedication",
      "rescueMedicationDoseMg",
    ] as const,
    skippable: true,
  },
  {
    heading: "Seizure types",
    Component: SeizureTypes,
    fields: ["primaryDiagnosis", "firstSeizureDate", "seizureTypes"] as const,
    skippable: true,
  },
] as const;
