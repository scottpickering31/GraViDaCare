import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

interface ButtonComponentProps {
  onPress: () => void;
  title: string;
  textColor: string;
  backgroundColor: string;
  borderColor?: string;
  borderWidth?: number;
  width: `${number}%`;
}

export default function ButtonComponent({
  title,
  onPress,
  textColor,
  backgroundColor,
  borderColor,
  borderWidth,
  width,
}: ButtonComponentProps) {
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
      <Pressable onPress={onPress}>
        <Text style={[styles.text, { color: textColor }]}>{title}</Text>
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
  text: {
    textAlign: "center",
  },
});
