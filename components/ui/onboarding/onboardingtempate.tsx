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
      <Image source={imageSource} style={{ width: "100%", height: "65%" }} />
      <View>
        <NavigationPill pages={pages} currentPage={currentPage} />
      </View>
      <View style={styles.container}>
        <Text style={{ fontSize: 30, fontWeight: "bold" }}>{heading}</Text>
        <Text>{text}</Text>
      </View>
      <View style={styles.buttonContainer}>{children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    flexDirection: "column",
    padding: 20,
    flex: 1,
    position: "relative",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "flex-end",
  },
});
