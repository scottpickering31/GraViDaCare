import TabTemplate from "@/components/ui/tabs/tabTemplate";
import React from "react";
import { Text, View } from "react-native";

export default function Insights() {
  return (
    <TabTemplate headingText="Insights" showProfileAvatar={true} scroll={true}>
      <View>
        <Text>Insights</Text>
      </View>
    </TabTemplate>
  );
}
