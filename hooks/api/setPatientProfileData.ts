import { supabase } from "@/lib/supabase";
import { useAuthStore } from "@/store/authStore";
import { useLoadingStore } from "@/store/loadingStore";
import SetPatientProfileData from "@/types/patientProfile";

/**
 * Upsert the *current caregiver's active patient profile*.
 * If you intend to let one caregiver manage multiple patients,
 * pass an extra `patientId` param and use it in the .eq().
 */

export default async function setPatientProfileData(
  payload: SetPatientProfileData
) {
  const { session } = useAuthStore();
  const { setLoading } = useLoadingStore();

  if (!session?.user) {
    return { data: null, error: new Error("No signed‑in user") };
  }

  try {
    setLoading(true);

    const { data, error } = await supabase
      .from("patient_profiles")
      .update({
        first_name: payload.firstName,
        last_name: payload.lastName,
        date_of_birth: payload.dob,
        gender: payload.gender,

        primary_diagnosis: payload.primaryDiagnosis,
        seizure_types: payload.seizure_types,

        neurologist_name: payload.neurologist_name,
        hospital: payload.hospital,
        rescue_medication: payload.rescue_medication,
        rescue_medication_dose_mg: payload.rescue_medication_dose_mg,

        allergies: payload.allergies,
        emergency_phone: payload.emergency_phone,

        head_circumference_cm: payload.head_circumference_cm,
        weight_kg: payload.weight_kg,
        height_cm: payload.height_cm,
        first_seizure_at: payload.first_seizure_at,
        updated_at: new Date().toISOString(),
      })
      .eq("profile_id", session.user.id)
      .single();

    return { data, error };
  } finally {
    setLoading(false);
  }
}
