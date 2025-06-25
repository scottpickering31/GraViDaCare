import { useAuthStore } from "@/store/authStore";
import React from "react";
import { Text, View } from "react-native";

export default function Dashboard() {
  const { session } = useAuthStore();

  console.log(
    JSON.stringify(session, null, 2) +
      " This is in the Dashboard file, lets see if this works!"
  );
  return (
    <View>
      <Text>Dashboard</Text>
      <Text> Welcome</Text>
    </View>
  );
}
