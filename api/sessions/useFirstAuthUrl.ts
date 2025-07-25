import { useEffect, useState } from "react";
import * as Linking from "expo-linking";

/** Returns the first deep-link we see (cold-start ⬅ hot-link). */
export function useFirstAuthUrl(hotUrl: string | null) {
  const [chosen, setChosen] = useState<string | null>(null);

  useEffect(() => {
    let active = true;

    (async () => {
      const cold = await Linking.getInitialURL();
      if (active) setChosen(cold ?? hotUrl ?? null);
    })();

    return () => {
      active = false;
    };
  }, [hotUrl]);

  return chosen;
}
