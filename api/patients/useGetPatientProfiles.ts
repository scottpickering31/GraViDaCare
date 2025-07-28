import { supabase } from "@/lib/supabase";
import { useAuthStore } from "@/store/authStore";
import { PatientProfile } from "@/types/patientProfile";
import { useQuery } from "@tanstack/react-query";

export const useGetPatientProfiles = () => {
  const profileId = useAuthStore((s) => s.session?.user.id);

  return useQuery<PatientProfile[]>({
    queryKey: ["patients", profileId],
    enabled: !!profileId,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("patient_profiles")
        .select("*")
        .eq("profile_id", profileId);

      if (error) throw error;
      console.log("🚀 ~ file: useGetPatientProfiles.ts:15 ~ data:", data);
      return data;
    },
    staleTime: 1000 * 60 * 5,
    refetchOnMount: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
  });
};
