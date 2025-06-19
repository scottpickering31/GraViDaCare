import ButtonComponent from "@/components/buttons/buttonComponent";
import OnBoardingTemplate from "@/components/ui/onboarding/onBoardingTempalte";
import { ONBOARDING_PAGES } from "@/constants/onBoardingPages";
import { Colors } from "@/constants/styles/Colors";
import { useOnboardingNavigation } from "@/hooks/useOnboardingNavigation";
import React from "react";

export default function Welcome() {
  const { goNext, skip } = useOnboardingNavigation("welcome");

  return (
    <OnBoardingTemplate
      text="Welcome to Gravidacare"
      heading="Welcome"
      imageSource={require("@/assets/illustration.png")}
      pages={ONBOARDING_PAGES}
      currentPage="welcome"
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
