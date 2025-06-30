import CompleteProfileModal from "@/components/modals/completeProfileModal";
import { useProfile } from "@/hooks/api/useProfile";
import { useAuthStore } from "@/store/authStore";
import { ActivityIndicator, Text, View } from "react-native";
import Logout from "../auth/logout";

export default function DashboardGate() {
  const { session } = useAuthStore();

  const { data: profile, isLoading, isError } = useProfile();

  console.log("profile ", JSON.stringify(profile, null, 2));

  /** 2️⃣  Still loading? */
  if (!session || isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator />
      </View>
    );
  }

  /** 3️⃣  Check completeness */
  // const needsMoreInfo =
  //   !profile.first_name || !profile.last_name || !profile.date_of_birth;

  /** 4️⃣  Render either the modal or the dashboard */
  return (
    <View style={{ flex: 1 }}>
      {/* {needsMoreInfo && ( */}
      <CompleteProfileModal
      // initialValues={profile}
      // onDone={/* refetch profile or invalidate query */}
      />
      {/* )} */}

      {/* Your actual dashboard */}
      <View style={{ flex: 1 }}>
        <Text>Dashboard</Text>
        <Text>Welcome sailor</Text>
        <Logout />
      </View>
    </View>
  );
}
