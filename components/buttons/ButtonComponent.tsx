import React from "react";
import {
  Image,
  ImageSourcePropType,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

interface ButtonComponentProps {
  onPress: () => void;
  title: string;
  textColor: string;
  backgroundColor: string;
  borderColor?: string;
  borderWidth?: number;
  width: `${number}%`;
  icon?: ImageSourcePropType;
}

export default function ButtonComponent({
  title,
  onPress,
  textColor,
  backgroundColor,
  borderColor,
  borderWidth,
  width,
  icon,
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
      <Pressable onPress={onPress} style={styles.pressable}>
        <View style={styles.content}>
          {icon && <Image source={icon} style={styles.icon} />}
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
  icon: {
    width: 24,
    height: 24,
    resizeMode: "contain",
  },
  text: {
    fontSize: 14,
    textAlign: "center",
  },
});
