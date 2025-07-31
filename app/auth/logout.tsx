import ButtonComponent from "@/components/buttons/buttonComponent";
import { Colors } from "@/constants/styles/Colors";
import { supabase } from "@/lib/supabase";
import { router } from "expo-router";
import { Alert, View } from "react-native";

interface LogoutButtonProps {
  width: `${number}%`;
}

export default function LogoutButton({ width }: LogoutButtonProps) {
  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;

      router.replace("/onboarding");
    } catch (err: any) {
      Alert.alert("Logout failed", err.message);
    }
  };

  return (
    <View>
      <ButtonComponent
        backgroundColor={Colors.primary[500]}
        onPress={handleLogout}
        textColor="white"
        title={"Click here to log out"}
        width={width}
      />
    </View>
  );
}
