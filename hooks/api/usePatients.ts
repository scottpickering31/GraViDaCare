import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { useAuthStore } from "@/store/authStore";

export const usePatients = () => {
  const profileId = useAuthStore((s) => s.session?.user.id);

  return useQuery({
    queryKey: ["patients", profileId],     
    enabled: !!profileId,                  
    queryFn: async () => {
      const { data, error } = await supabase
        .from("patient_profiles")
        .select("*")
        .eq("profile_id", profileId);

      if (error) throw error;
      return data;
    },
    initialData: [],
  });
};
