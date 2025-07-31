import TabTemplate from "@/components/ui/tabs/tabTemplate";
import React from "react";
import { Text, View } from "react-native";

export default function Log() {
  return (
    <TabTemplate headingText="Log" showProfileAvatar={true} scroll={true}>
      <View>
        <Text>Log</Text>
      </View>
    </TabTemplate>
  );
}
