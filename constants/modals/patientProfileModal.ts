import { z } from "zod";

const caregiverRoles = [
  "Self",
  "Mother",
  "Father",
  "Grandparent",
  "Sibling",
  "Guardian",
  "Other",
] as const;

const genders = ["Male", "Female", "Other"] as const;

const seizureTypes = ["seizure_type_1", "seizure_type_2"] as const;

const seizureFrequencies = [
  "seizure_frequency_1",
  "seizure_frequency_2",
  "seizure_frequency_3",
] as const;

const rescueMedications = [
  "rescue_medicine_1",
  "rescue_medicine_2",
  "rescue_medicine_3",
] as const;

export const PatientProfileWizardSchema = z.object({
  profile_name: z.string().min(1, "Required"),
  caregiver_role: z.string().min(1, "Required"),
  dob: z.string().min(1, "Required"),
  gender: z.string().min(1, "Required"),
  weight_kg: z.number().optional(),
  height_cm: z.number().optional(),
  seizure_types: z.array(z.enum(seizureTypes)).min(1, "Required"),
  first_seizure_date: z.string().optional(),
  seizure_frequency: z.string().optional(),
  rescue_medication: z.array(z.enum(rescueMedications)).min(1, "Required"),
});

export type FormValues = z.infer<typeof PatientProfileWizardSchema>;

/** Default values */
export const PatientProfileWizardValues: FormValues = {
  profile_name: "",
  caregiver_role: "Self",
  dob: "",
  gender: "Male",
  weight_kg: undefined,
  height_cm: undefined,
  seizure_types: [],
  first_seizure_date: "",
  seizure_frequency: undefined,
  rescue_medication: [],
};

/** Modal Object */

type StepType =
  | {
      step: number;
      name: keyof FormValues;
      title: string;
      type: "text" | "number" | "date";
    }
  | {
      step: number;
      name: keyof FormValues;
      title: string;
      type: "selector" | "multi-select";
      options: readonly string[];
    };

export type PatientProfileStep = StepType;

export const PatientProfileModalSteps: PatientProfileStep[] = [
  { step: 0, name: "profile_name", title: "Profile Name", type: "text" },
  {
    step: 1,
    name: "caregiver_role",
    title: "Caregiver Role",
    type: "selector",
    options: caregiverRoles,
  },
  { step: 2, name: "dob", title: "Date of Birth", type: "date" },
  {
    step: 3,
    name: "gender",
    title: "Gender",
    type: "selector",
    options: genders,
  },
  { step: 4, name: "weight_kg", title: "Weight (kg)", type: "number" },
  { step: 5, name: "height_cm", title: "Height (cm)", type: "number" },
  {
    step: 6,
    name: "seizure_types",
    title: "Seizure Types",
    type: "multi-select",
    options: seizureTypes,
  },
  {
    step: 7,
    name: "first_seizure_date",
    title: "First Seizure Date",
    type: "date",
  },
  {
    step: 8,
    name: "seizure_frequency",
    title: "Seizure Frequency",
    type: "selector",
    options: seizureFrequencies,
  },
  {
    step: 9,
    name: "rescue_medication",
    title: "Rescue Medication",
    type: "multi-select",
    options: rescueMedications,
  },
];
