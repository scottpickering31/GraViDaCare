import { LinearGradient } from "expo-linear-gradient";
import { MotiView } from "moti";
import React from "react";
import { StyleSheet, View, ViewStyle } from "react-native";

type ShimmerProps = {
  width?: number | string;
  height?: number;
  borderRadius?: number;
};

export const Shimmer = ({
  width = "100%",
  height = 20,
  borderRadius = 8,
}: ShimmerProps) => {
  const style = {
    width,
    height,
    borderRadius,
  } as ViewStyle;

  return (
    <View style={[styles.container, style]}>
      <MotiView
        from={{ translateX: -200 }}
        animate={{ translateX: 200 }}
        transition={{
          loop: true,
          type: "timing",
          duration: 1500,
        }}
        style={StyleSheet.absoluteFill}
      >
        <LinearGradient
          colors={["transparent", "rgba(255,255,255,0.3)", "transparent"]}
          start={{ x: 0, y: 0.5 }}
          end={{ x: 1, y: 0.5 }}
          style={StyleSheet.absoluteFill}
        />
      </MotiView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#e0e0e0",
    overflow: "hidden",
  },
});
