import ButtonComponent from "@/components/buttons/ButtonComponent";
import OnBoardingTemplate from "@/components/ui/onboarding/onboardingtempate";
import { Colors } from "@/constants/Colors";
import { ONBOARDING_PAGES } from "@/constants/onBoardingPages";
import { router } from "expo-router";
import React from "react";

export default function RecordData() {
  return (
    <OnBoardingTemplate
      text="Record Data is here for you"
      heading="Record Data"
      imageSource={require("@/assets/illustration(2).png")}
      pages={ONBOARDING_PAGES}
      currentPage="recorddata"
    >
      <ButtonComponent
        onPress={() => router.push("/auth/register")}
        title="Get Started !"
        textColor="white"
        backgroundColor={Colors.primary[500]}
        width={"90%"}
      />
    </OnBoardingTemplate>
  );
}
