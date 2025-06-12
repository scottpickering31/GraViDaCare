import { Colors } from "@/constants/styles/Colors";
import React from "react";
import { StyleSheet, View } from "react-native";

interface NavigationPillProps {
  pages: string[];
  currentPage: string;
}

export default function NavigationPill({
  pages,
  currentPage,
}: NavigationPillProps) {
  return (
    <View style={styles.pillContainer}>
      {pages.map((page, index) => (
        <View
          key={index}
          style={[
            styles.line,
            {
              backgroundColor:
                page === currentPage ? Colors.primary[500] : Colors.gray[200],
            },
          ]}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  pillContainer: {
    flexDirection: "row",
    gap: 8,
    paddingHorizontal: 20,
    position: "absolute",
  },
  line: {
    height: 4,
    borderRadius: 90,
    width: 42,
  },
});
