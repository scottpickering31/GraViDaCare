export default interface SetPatientProfileData {
  // Patient Demographics
  firstName?: string;
  lastName?: string;
  dob: string;
  gender: "Male" | "Female" | "Other";

  // Seizure Typings
  primaryDiagnosis: string;
  seizure_types: string[];

  // Neurologist Information
  neurologist_name?: string;
  hospital?: string;
  rescue_medication?: string;
  rescue_medication_dose_mg?: number;

  // Allergies and Emergency Contact
  allergies?: string[];
  emergency_phone?: string;

  // Patient Measurements
  head_circumference_cm?: number;
  weight_kg?: number;
  height_cm?: number;
  first_seizure_at?: string;
}
