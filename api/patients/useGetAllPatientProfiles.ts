import { supabase } from "@/lib/supabase";
import { useQuery } from "@tanstack/react-query";

export function useGetAllPatientProfiles(userId: string | null) {
  return useQuery({
    queryKey: ["patient-profiles", userId],
    queryFn: async () => {
      if (!userId) return [];

      const { data, error } = await supabase
        .from("patient_profiles")
        .select("*")
        .eq("profile_id", userId);

      if (error) throw error;
      return data;
    },
    enabled: !!userId,
    staleTime: 1000 * 60 * 5,
  });
}
