import { supabase } from "@/lib/supabase";
import { useQuery } from "@tanstack/react-query";

export function useGetPatientProfile(patientId: string | null) {
  return useQuery({
    queryKey: ["patient-profile", patientId],
    queryFn: async () => {
      console.log("Fetching patient profile from Supabase...", patientId);
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
    staleTime: 1000 * 60 * 5,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });
}
