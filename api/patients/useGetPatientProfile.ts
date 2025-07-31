import { supabase } from "@/lib/supabase";
import { useQuery } from "@tanstack/react-query";

export function useGetPatientProfile(patientId: string | null) {
  return useQuery({
    queryKey: ["patient-profile", patientId],
    queryFn: async () => {
      if (!patientId) return null;
      const { data, error } = await supabase
        .from("patient_profiles")
        .select("*")
        .eq("id", patientId)
        .maybeSingle();
      if (error) throw error;
      return data;
    },
    enabled: !!patientId,
  });
}
