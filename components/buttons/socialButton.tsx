import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

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
  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: backgroundColor,
          borderWidth: borderWidth,
          borderColor: borderColor,
          width: width,
        },
      ]}
    >
      <Pressable>
        <Text>SocialButton</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 24,
    paddingVertical: 14,
    borderRadius: 8,
  },
});
