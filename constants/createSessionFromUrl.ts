import { supabase } from "@/lib/supabase";
import * as QueryParams from "expo-auth-session/build/QueryParams";

// WebBrowser.maybeCompleteAuthSession();
// const redirectUri = makeRedirectUri();

export const createSessionFromUrl = async (url: string) => {
  const { params, errorCode } = QueryParams.getQueryParams(url);

  if (errorCode) throw new Error(`Auth callback error: ${errorCode}`);
  const { access_token, refresh_token, type } = params;

  if (!access_token || !refresh_token) {
    throw new Error("Missing tokens in URL");
  }

  const { data, error } = await supabase.auth.setSession({
    access_token,
    refresh_token,
  });

  if (error) throw new Error(error.message);

  return {
    session: data.session,
    type,
  };
};
