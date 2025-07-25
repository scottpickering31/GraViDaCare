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

const seizureTypes = [
  "Focal aware seizure (simple partial)",
  "Focal impaired awareness seizure (complex partial)",
  "Focal to bilateral tonic-clonic seizure",
  "Generalized tonic-clonic seizure (formerly grand mal)",
  "Absence seizure (petit mal)",
  "Myoclonic seizure",
  "Atonic seizure (drop seizure)",
  "Tonic seizure",
  "Clonic seizure",
  "Gelastic seizure",
  "Infantile spasms (West syndrome)",
  "Febrile seizure",
  "Other",
] as const;

const seizureFrequencies = [
  "Never (seizure-free)",
  "Less than once a month",
  "1–3 seizures per month",
  "1–2 seizures per week",
  "3–6 seizures per week",
  "Daily",
  "Multiple times per day",
  "Only during sleep",
  "Only during illness or fever",
  "Unpredictable/varies",
] as const;

const videoRecordings = ["Yes", "No"] as const;

const rescueMedications = [
  "Diazepam (Diastat)",
  "Midazolam (Nayzilam/Buccolam)",
  "Lorazepam (Ativan)",
  "Clonazepam (Klonopin)",
  "VNS Magnet Activation",
  "Phenobarbital ",
  "Fosphenytoin (Cerebyx)",
  "Rectal Diazepam",
  "Intranasal Midazolam",
  "Intramuscular Midazolam",
  "IV Lorazepam",
  "Other",
  "None prescribed",
] as const;

const maintenanceMedications = [
  "Phenobarbital (Barbitone)",
  "Levetiracetam (Keppra)",
  "Valproate (Depakote)",
  "Carbamazepine (Tegretol)",
  "Oxcarbazepine (Trileptal)",
  "Lamotrigine (Lamictal)",
  "Topiramate (Topamax)",
  "Ethosuximide (Zarontin)",
  "Zonisamide (Zonegran)",
  "Lacosamide (Vimpat)",
  "Clobazam (Onfi)",
  "Rufinamide (Banzel)",
  "Perampanel (Fycompa)",
  "Brivaracetam (Briviact)",
  "Cannabidiol (Epidiolex)",
  "Felbamate (Felbatol)",
  "Tiagabine (Gabitril)",
  "Primidone (Mysoline)",
  "Other",
  "None prescribed",
] as const;

export const PatientProfileWizardSchema = z.object({
  profile_name: z.string().min(1, "Required"),
  caregiver_role: z.string().min(1, "Required"),
  dob: z.string().min(1, "Required"),
  gender: z.string().min(1, "Required"),
  weight_kg: z.number().positive("Must be greater than 0").min(1, "Required"),

  height_cm: z.number().positive("Must be greater than 0").min(1, "Required"),
  seizure_types: z.array(z.enum(seizureTypes)).min(1, "Required"),
  first_seizure_date: z.string().min(1, "Required"),
  seizure_frequency: z.string().min(1, "Required"),
  rescue_medication: z.array(z.enum(rescueMedications)).min(1, "Required"),
  maintenance_medication: z
    .array(z.enum(maintenanceMedications))
    .min(1, "Required"),

  video_recordings: z.string().min(1, "Required"),
});

export type FormValues = z.infer<typeof PatientProfileWizardSchema>;

/** Default values */
export const PatientProfileWizardValues: FormValues = {
  profile_name: "",
  caregiver_role: "",
  dob: "",
  gender: "",
  weight_kg: 0,
  height_cm: 0,
  seizure_types: [],
  first_seizure_date: "",
  seizure_frequency: "",
  rescue_medication: [],
  maintenance_medication: [],
  video_recordings: "",
};

/** Modal Object */

type StepType =
  | {
      step: number;
      name: keyof FormValues;
      title: string;
      type: "text" | "number" | "date";
      placeholder?: string;
    }
  | {
      step: number;
      name: keyof FormValues;
      title: string;
      type: "selector" | "multi-select";
      options: readonly string[];
      placeholder?: string;
    };

export type PatientProfileStep = StepType;

export const PatientProfileModalSteps: PatientProfileStep[] = [
  {
    step: 0,
    name: "profile_name",
    title: "What’s the patient’s name or profile name?",
    placeholder: "Please create a profile name",
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
    placeholder: "Please enter a weight",
    type: "number",
  },
  {
    step: 5,
    name: "height_cm",
    title: "What is the patient’s height (cm)?",
    placeholder: "Please enter a height",
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
    title:
      "Is there a prescribed rescue medication? (fast-acting, emergency use)",
    type: "multi-select",
    options: rescueMedications,
  },
  {
    step: 10,
    name: "maintenance_medication",
    title:
      "Is there a prescribed maintenance medication? (daily, long-term use)",
    type: "multi-select",
    options: maintenanceMedications,
  },
  {
    step: 11,
    name: "video_recordings",
    title: "Would you like to track seizures with video recordings?",
    type: "selector",
    options: videoRecordings,
  },
];
