import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { SvgProps } from "react-native-svg";

interface ButtonComponentProps {
  onPress: () => void;
  title: string;
  textColor: string;
  backgroundColor: string;
  borderColor?: string;
  borderWidth?: number;
  width: `${number}%`;
  icon?: React.FC<SvgProps>;
}

export default function ButtonComponent({
  title,
  onPress,
  textColor,
  backgroundColor,
  borderColor,
  borderWidth,
  width,
  icon: Icon,
}: ButtonComponentProps) {
  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor,
          borderWidth,
          borderColor,
          width,
        },
      ]}
    >
      <Pressable onPress={onPress} style={styles.pressable}>
        <View style={styles.content}>
          {Icon && <Icon width={20} height={20} />}
          <Text
            style={[
              styles.text,
              { color: textColor, fontFamily: "ManropeBold" },
            ]}
          >
            {title}
          </Text>
        </View>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 24,
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  pressable: {
    width: "100%",
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
  },
  text: {
    fontSize: 14,
    textAlign: "center",
  },
});
