import LoadingSkeleton from "@/components/ui/loading/LoadingSkeleton";
import TabTemplate from "@/components/ui/tabs/tabTemplate";
import { useAuthStore } from "@/store/authStore";
import React from "react";
import { View } from "react-native";

export default function DashboardGate() {
  const { session } = useAuthStore();

  const meta = session?.user.user_metadata ?? {};

  return (  
    <TabTemplate headingText="Dashboard" showHeadingText={false}>
      <LoadingSkeleton />
      <View></View>
    </TabTemplate>
  );
}
