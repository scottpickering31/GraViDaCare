import {
  GoogleSignin,
  isErrorWithCode,
  isSuccessResponse,
  statusCodes,
} from "@react-native-google-signin/google-signin";

export const configureGoogle = () =>
  GoogleSignin.configure({
    scopes: ["https://www.googleapis.com/auth/drive.readonly"],
    webClientId:
      "786222720733-scg7a83m71svu7llnqfm39etgfse38i3.apps.googleusercontent.com",
  });

// googleAuth.ts
export const useGoogleSignIn = () => {
  const signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const res = await GoogleSignin.signIn();

      if (isSuccessResponse(res)) {
        console.log("Google user", JSON.stringify(res, null, 2));
        // TODO: send tokens to your backend, navigate, etc.
      } else {
        // user cancelled
      }
    } catch (err) {
      if (isErrorWithCode(err)) {
        switch (err.code) {
          case statusCodes.IN_PROGRESS:
            // already signing in
            break;
          case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
            // prompt update
            break;
          default:
            console.warn("Google sign-in error", err.code);
        }
      } else {
        console.error("Unexpected error", err);
      }
    }
  };

  return signIn; // safe to hand directly to onPress
};
