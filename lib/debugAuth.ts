import { supabase } from "@/lib/supabase";
import { GoogleSignin } from "@react-native-google-signin/google-signin";

export async function debugResetAuth() {
  try {
    await GoogleSignin.revokeAccess(); // destroys Play-Services refresh-token
    await GoogleSignin.signOut(); // clears SDK cache
    await supabase.auth.signOut(); // clears Supabase session
    console.log("✅ Google + Supabase credentials wiped");
  } catch (err) {
    console.warn("Reset failed", err);
  }
}
