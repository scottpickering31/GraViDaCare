import { useButtonAnimation } from "@/hooks/useButtonAnimation";
import React from "react";
import { Animated, Pressable, StyleSheet, Text } from "react-native";

interface SocialButtonProps {
  title: string;
  onPress: () => void;
  textColor: string;
  backgroundColor: string;
  borderColor?: string;
  borderWidth?: number;
  width: `${number}%`;
}

export default function SocialButton({
  title,
  onPress,
  textColor,
  backgroundColor,
  borderColor,
  borderWidth,
  width,
}: SocialButtonProps) {
  const { animatedStyle, handlePressIn, handlePressOut } = useButtonAnimation();
  return (
    <Animated.View
      style={[
        animatedStyle,
        styles.container,
        {
          backgroundColor: backgroundColor,
          borderWidth: borderWidth,
          borderColor: borderColor,
          width: width,
        },
      ]}
    >
      <Pressable onPressIn={handlePressIn} onPressOut={handlePressOut}>
        <Text>SocialButton</Text>
      </Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 24,
    paddingVertical: 14,
    borderRadius: 8,
  },
});
