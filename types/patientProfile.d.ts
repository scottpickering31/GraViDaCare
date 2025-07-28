export interface SetPatientProfileData {
  // Patient Demographics
  firstName?: string;
  lastName?: string;
  dob: string;
  gender: "Male" | "Female" | "Other";

  // Seizure Types
  primaryDiagnosis: string;
  seizure_types: string[];
  first_seizure_at?: string;

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
}

export type PatientProfile = {
  id: string;
  profile_id: string;
  profile_name: string;
  caregiver_role: string;
  gender: "Male" | "Female" | "Other"; 
  dob: string; 
  first_seizure_date: string; 
  seizure_types: string[]; 
  seizure_frequency: string;
  maintenance_medication: string[];
  rescue_medication: string[];
  video_recordings: "Yes" | "No"; 
  weight_kg: number;
  height_cm: number;
  share_code: string | null;
  created_at: string;
  updated_at: string;
};
