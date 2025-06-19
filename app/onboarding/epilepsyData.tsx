import ButtonComponent from "@/components/buttons/buttonComponent";
import OnBoardingTemplate from "@/components/ui/onboarding/onBoardingTemplate";
import { ONBOARDING_PAGES } from "@/constants/onBoardingPages";
import { Colors } from "@/constants/styles/Colors";
import { useOnboardingNavigation } from "@/hooks/useOnboardingNavigation";

import React from "react";

export default function EpilepsyData() {
  const { goNext, skip } = useOnboardingNavigation("epilepsyData");
  return (
    <OnBoardingTemplate
      text="Epilepsy Data is here for you"
      heading="Epilepsy Data"
      imageSource={require("@/assets/illustration(1).png")}
      pages={ONBOARDING_PAGES}
      currentPage="epilepsyData"
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
