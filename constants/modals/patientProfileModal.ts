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

const videoRecordings = ["Yes", "No"] as const;

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
  weight_kg: z.number().positive("Must be greater than 0").min(1, "Required"),

  height_cm: z.number().positive("Must be greater than 0").min(1, "Required"),
  seizure_types: z.array(z.enum(seizureTypes)).min(1, "Required"),
  first_seizure_date: z.string().optional(),
  seizure_frequency: z.string().optional(),
  rescue_medication: z.array(z.enum(rescueMedications)).min(1, "Required"),
  video_recordings: z.string().min(1, "Required"),
});

export type FormValues = z.infer<typeof PatientProfileWizardSchema>;

/** Default values */
export const PatientProfileWizardValues: FormValues = {
  profile_name: "",
  caregiver_role: "Self",
  dob: "",
  gender: "Male",
  weight_kg: 0,
  height_cm: 0,
  seizure_types: [],
  first_seizure_date: "",
  seizure_frequency: undefined,
  rescue_medication: [],
  video_recordings: "",
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
  {
    step: 0,
    name: "profile_name",
    title: "What’s the patient’s name or profile name?",
    type: "text",
  },
  {
    step: 1,
    name: "caregiver_role",
    title: "What is your relationship to the patient?",
    type: "selector",
    options: caregiverRoles,
  },
  {
    step: 2,
    name: "dob",
    title: "Date of birth of the patient?",
    type: "date",
  },
  {
    step: 3,
    name: "gender",
    title: "What is the patient’s biological sex or gender identity",
    type: "selector",
    options: genders,
  },
  {
    step: 4,
    name: "weight_kg",
    title: "What is the patient’s weight (kg)?",
    type: "number",
  },
  {
    step: 5,
    name: "height_cm",
    title: "What is the patient’s height (cm)?",
    type: "number",
  },
  {
    step: 6,
    name: "seizure_types",
    title: "What types of seizures does the patient experience?",
    type: "multi-select",
    options: seizureTypes,
  },
  {
    step: 7,
    name: "first_seizure_date",
    title: "When did the first seizure occur?",
    type: "date",
  },
  {
    step: 8,
    name: "seizure_frequency",
    title: "How often do seizures typically happen?",
    type: "selector",
    options: seizureFrequencies,
  },
  {
    step: 9,
    name: "rescue_medication",
    title: "Is there a prescribed rescue medication?",
    type: "multi-select",
    options: rescueMedications,
  },
  {
    step: 10,
    name: "video_recordings",
    title: "Would you like to track seizures with video recordings?",
    type: "selector",
    options: videoRecordings,
  },
];
