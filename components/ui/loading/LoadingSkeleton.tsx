// screens/LoadingSkeleton.tsx
import { Shimmer } from "@/components/ui/loading/Shimmer";
import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";

export default function LoadingSkeleton() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Header Placeholder */}
      <View style={styles.header}>
        <Shimmer width={200} height={32} borderRadius={8} />
        <Shimmer width={120} height={20} borderRadius={6} />
      </View>

      {/* Profile/Avatar Row */}
      <View style={styles.avatarRow}>
        <Shimmer width={60} height={60} borderRadius={30} />
        <View style={{ marginLeft: 12 }}>
          <Shimmer width={180} height={20} />
          <View style={{ height: 8 }} />
          <Shimmer width={120} height={16} />
        </View>
      </View>

      {/* Card Placeholders */}
      {Array.from({ length: 2 }).map((_, index) => (
        <View key={index} style={styles.card}>
          <Shimmer width="100%" height={20} />
          <View style={{ height: 12 }} />
          <Shimmer width="70%" height={16} />
          <View style={{ height: 12 }} />
          <Shimmer width="90%" height={14} />
        </View>
      ))}

      {/* Button-like Placeholder */}
      <View style={styles.button}>
        <Shimmer width="100%" height={48} borderRadius={12} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  header: {
    marginBottom: 24,
  },
  avatarRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 24,
  },
  card: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 10,
  },
  button: {
    marginTop: 24,
  },
});
