// screens/LoadingCard.tsx
import { Shimmer } from "@/components/ui/loading/Shimmer";
import React from "react";
import { StyleSheet, View } from "react-native";

export default function LoadingSkeleton() {
  return (
    <View style={styles.card}>
      <Shimmer width={60} height={60} borderRadius={30} />
      <View style={{ marginLeft: 12 }}>
        <Shimmer width={180} height={20} />
        <View style={{ height: 8 }} />
        <Shimmer width={120} height={16} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#fff",
    margin: 16,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 10,
  },
});
