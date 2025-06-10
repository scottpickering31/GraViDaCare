import { Colors } from "@/constants/Colors";
import { router } from "expo-router";
import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import ButtonComponent from "../../components/buttons/ButtonComponent";

export default function Welcome() {
  return (
    <View>
      <Image
        source={require("../../assets/illustration.png")}
        style={{ width: "100%", height: "65%" }}
      />
      <View
        style={{
          justifyContent: "center",
          flexDirection: "column",
          padding: 20,
          flex: 1,
          position: "relative",
        }}
      >
        <View
          style={{
            position: "absolute",
            flexDirection: "row",
            width: "55%",
            top: 0,
            padding: 20,
            gap: 7,
          }}
        >
          <View style={styles.line} />
          <View style={styles.line} />
          <View style={styles.line} />
        </View>
        <Text style={{ fontSize: 30, fontWeight: "bold" }}>Welcome!</Text>
        <Text>
          We will assist you in efficiently and easily scheduling appointments
          with doctors. Let's get started!
        </Text>
      </View>
      <View
        style={{
          flexDirection: "row",

          justifyContent: "space-around",
          alignItems: "flex-end",
        }}
      >
        <ButtonComponent
          title="Skip"
          onPress={() => {
            router.replace("/(onboarding)/epilepsydata");
          }}
        />
        <ButtonComponent
          title="Next"
          onPress={() => {
            router.replace("/(onboarding)/epilepsydata");
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  line: {
    height: 4,
    backgroundColor: Colors.primary[500],
    borderRadius: 90,
    width: 42,
  },
});
