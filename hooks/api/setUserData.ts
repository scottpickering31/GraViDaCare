import { supabase } from "@/lib/supabase";
import { useAuthStore } from "@/store/authStore";
import { useLoadingStore } from "@/store/loadingStore";

interface SetUserData {
  firstName: string;
  lastName: string;
  dob: string;
  gender: string;
}

export default async function setUserData({
  firstName,
  lastName,
  dob,
  gender,
}: SetUserData) {
  const { session } = useAuthStore();
  const { setLoading } = useLoadingStore();
  try {
    setLoading(true);
    if (session?.user) throw new Error("No user on the session");

    const { data, error, status } = await supabase
      .from("profiles")
      .update({
        first_name: firstName,
        last_name: lastName,
        gender: gender,
        date_of_birth: dob,
      })
      .eq("id", session?.user.id);

    return { data, error };
  } catch (error) {
    return { data: null, error };
  }
}
