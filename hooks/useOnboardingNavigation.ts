import { ONBOARDING_PAGES } from "@/constants/onBoardingPages";
import { useRouter } from "expo-router";

export function useOnboardingNavigation(currentPage: string) {
  const router = useRouter();
  const currentIndex = ONBOARDING_PAGES.indexOf(currentPage);

  const nextPage = ONBOARDING_PAGES[currentIndex + 1];
  const isLast = currentIndex === ONBOARDING_PAGES.length - 1;

  return {
    goNext: () =>
      isLast
        ? router.push("/(tabs)/dashboard")
        : router.push(`../(onboarding)/${nextPage}`),
    skip: () => router.push("/(tabs)/dashboard"),
  };
}
