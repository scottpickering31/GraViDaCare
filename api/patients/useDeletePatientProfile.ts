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
    onSuccess: (_, variables) => {
      // Update cache manually (optional)
      const existingProfiles =
        queryClient.getQueryData<any[]>(["patient-profiles"]) ?? [];

      const updatedProfiles = existingProfiles.filter(
        (profile) => profile.id !== variables.profileId
      );

      queryClient.setQueryData(["patient-profiles"], updatedProfiles);

      // Invalidate query to refetch fresh data
      queryClient.invalidateQueries({ queryKey: ["patient-profiles"] });

      // Handle active profile switch
      if (activePatientId === variables.profileId) {
        if (updatedProfiles.length > 0) {
          setActivePatientId(updatedProfiles[0].id);
        } else {
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
    onError: () => {
      Toast.show({
        type: "error",
        text1: "Failed to delete patient profile",
      });
    },
  });
}
