import ButtonComponent from "@/components/Buttons/ButtonComponent";
import OnBoardingTemplate from "@/components/ui/Onboarding/OnboardingTemplate";
import { ONBOARDING_PAGES } from "@/constants/onBoardingPages";
import { Colors } from "@/constants/styles/Colors";
import { router } from "expo-router";
import React from "react";

export default function RecordData() {
  return (
    <OnBoardingTemplate
      text="Record Data is here for you"
      heading="Record Data"
      imageSource={require("@/assets/illustration(2).png")}
      pages={ONBOARDING_PAGES}
      currentPage="RecordData"
    >
      <ButtonComponent
        onPress={() => router.push("/Onboarding/OnboardingRegister")}
        title="Get Started !"
        textColor="white"
        backgroundColor={Colors.primary[500]}
        width={"90%"}
      />
    </OnBoardingTemplate>
  );
}
