import { OnboardingPage } from "@/constants/onBoardingPages";
import React from "react";
import {
  Image,
  ImageSourcePropType,
  StyleSheet,
  Text,
  View,
} from "react-native";
import NavigationPill from "./navigationpill";

interface OnBoardingTemplateProps {
  text: string;
  heading: string;
  imageSource: ImageSourcePropType;
  pages: OnboardingPage[];
  currentPage: OnboardingPage;
  children: React.ReactNode;
}

export default function OnBoardingTemplate({
  text,
  heading,
  imageSource,
  pages,
  currentPage,
  children,
}: OnBoardingTemplateProps) {
  return (
    <View>
      <View style={{ width: "100%", height: "65%" }}>
        <Image source={imageSource} />
      </View>
      <View style={{ width: "100%", height: "35%" }}>
        <NavigationPill pages={pages} currentPage={currentPage} />

        <View style={styles.container}>
          <Text style={{ fontSize: 30, fontWeight: "bold" }}>{heading}</Text>
          <Text>{text}</Text>
        </View>
        <View style={styles.buttonContainer}>{children}</View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    padding: 20,
    position: "relative",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "flex-end",
    paddingVertical: 50,
  },
});
