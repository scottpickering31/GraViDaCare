import { FormValues } from "@/constants/modals/patientProfileModal";
import { supabase } from "@/lib/supabase";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useCreatePatientProfile() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      formData,
      userId,
    }: {
      formData: FormValues;
      userId: string;
    }) => {
      const { error, data } = await supabase
        .from("patient_profiles")
        .insert([{ ...formData, profile_id: userId }])
        .select()
        .single();

      if (error) throw new Error(error.message);
      return data;
    },
    onSuccess: (_data, _variables) => {
      queryClient.invalidateQueries({
        queryKey: ["patient-profile", _variables.userId],
      });
    },
  });
}
