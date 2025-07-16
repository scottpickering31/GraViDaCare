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

export const PatientProfileModalSteps = [
  {
    title: "Profile name",
    name: "profile_name",
    step: 1,
    type: "text",
  },
  {
    title: "Caregiver Role",
    name: "caregiver_role",
    step: 2,
    type: "selector",
    options: caregiverRoles,
  },
  {
    title: "Patient Date of Birth",
    name: "dob",
    step: 3,
    type: "date",
  },
  {
    title: "Patient Gender",
    name: "gender",
    step: 4,
    type: "selector",
    options: genders,
  },
  {
    title: "Patient Weight (kg)",
    name: "weight_kg",
    step: 5,
    type: "number",
  },
  {
    title: "Patient Height (cm)",
    name: "height_cm",
    step: 6,
    type: "number",
  },
  {
    title: "Patient Seizure Types",
    name: "seizure_types",
    step: 7,
    type: "multi-select",
    options: seizureTypes,
  },
  {
    title: "First Recorded Seizure Date",
    name: "first_seizure_date",
    step: 8,
    type: "date",
  },
  {
    title: "Seizure Frequency",
    name: "seizure_frequency",
    step: 9,
    type: "number",
  },
  {
    title: "Rescue Medication",
    name: "rescue_medication",
    step: 10,
    type: "multi-select",
    options: rescueMedications,
  },
] as const;
