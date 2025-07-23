import Logout from "@/app/auth/logout";
import React from "react";
import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Account() {
  return (
    <SafeAreaView>
      <Text>Account</Text>
      <Logout width="50%" />
    </SafeAreaView>
  );
}
