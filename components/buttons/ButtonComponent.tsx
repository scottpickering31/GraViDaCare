import { Colors } from "@/constants/Colors";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

interface ButtonComponentProps {
  onPress: () => void;
  title: string;
}

export default function ButtonComponent({
  title,
  onPress,
}: ButtonComponentProps) {
  return (
    <View style={styles.container}>
      <Pressable onPress={onPress}>
        <Text style={styles.text}>{title}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 24,
    paddingVertical: 14,
    backgroundColor: Colors.primary[500],
    borderRadius: 8,
    width: "40%",
  },
  text: {
    textAlign: "center",
    color: Colors.base.white,
  },
});
