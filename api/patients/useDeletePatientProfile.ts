import { supabase } from "@/lib/supabase";
import { usePatientProfileStore } from "@/store/patientProfileStore";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Toast from "react-native-toast-message";

export function useDeletePatientProfile() {
  const { activePatientId, setActivePatientId } = usePatientProfileStore();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ profileId }: { profileId: string }) => {
      const { error } = await supabase
        .from("patient_profiles")
        .delete()
        .eq("id", profileId);

      if (error) throw new Error(error.message);
    },
    onSuccess: async (_, variables) => {
      // Fetch latest profiles directly from Supabase
      const { data: updatedProfilesRaw, error } = await supabase
        .from("patient_profiles")
        .select("*")
        .order("created_at", { ascending: true });

      if (error) {
        console.error("Error fetching updated profiles:", error);
        return;
      }

      const updatedProfiles = updatedProfilesRaw ?? [];

      console.log("Updated profiles after refetch:", updatedProfiles);

      // Manually update query cache for consistency
      queryClient.setQueryData(["patient-profiles"], updatedProfiles);

      // Invalidate just in case
      queryClient.invalidateQueries({ queryKey: ["patient-profiles"] });

      // Handle switching the active profile
      if (activePatientId === variables.profileId) {
        if (updatedProfiles.length > 0) {
          console.log("Setting activePatientId to:", updatedProfiles[0].id);
          setActivePatientId(updatedProfiles[0].id);
        } else {
          console.log("No profiles left, setting activePatientId to null");
          setActivePatientId(null);
        }
      }

      Toast.show({
        type: "success",
        text1: "Profile deleted",
        text2: updatedProfiles.length
          ? `Now using: ${updatedProfiles[0].profile_name}`
          : "No profiles left. Please create a new one.",
      });
    },
  });
}
