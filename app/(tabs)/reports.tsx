import TabTemplate from "@/components/ui/tabs/tabTemplate";
import React from "react";
import { Text, View } from "react-native";

export default function Reports() {
  return (
    <TabTemplate headingText="Reports" showProfileAvatar={true}>
      <View>
        <Text>Reports</Text>
      </View>
    </TabTemplate>
  );
}
