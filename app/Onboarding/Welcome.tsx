import ButtonComponent from "@/components/Buttons/ButtonComponent";
import OnBoardingTemplate from "@/components/ui/Onboarding/OnboardingTemplate";
import { Colors } from "@/constants/styles/Colors";
import { ONBOARDING_PAGES } from "@/constants/onBoardingPages";
import { useOnboardingNavigation } from "@/hooks/useOnboardingNavigation";
import React from "react";

export default function Welcome() {
  const { goNext, skip } = useOnboardingNavigation("Welcome");

  return (
    <OnBoardingTemplate
      text="Welcome to Gravicare"
      heading="Welcome"
      imageSource={require("@/assets/illustration.png")}
      pages={ONBOARDING_PAGES}
      currentPage="Welcome"
    >
      <ButtonComponent
        title="Skip"
        onPress={skip}
        borderWidth={1}
        borderColor={Colors.gray[200]}
        backgroundColor={Colors.gray[50]}
        textColor="black"
        width={"45%"}
      />
      <ButtonComponent
        title="Next"
        onPress={goNext}
        textColor="white"
        backgroundColor={Colors.primary[500]}
        width={"45%"}
      />
    </OnBoardingTemplate>
  );
}
