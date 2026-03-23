import { useEffect, useState } from "react";
import { ACCESSIBILITY } from "@/lib/constants";

export const usePrefersReducedMotion = (): boolean => {
  const [reduced, setReduced] = useState(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia(ACCESSIBILITY.REDUCED_MOTION_MEDIA_QUERY).matches,
  );

  useEffect(() => {
    const mq = window.matchMedia(ACCESSIBILITY.REDUCED_MOTION_MEDIA_QUERY);
    const update = () => setReduced(mq.matches);

    if (mq.addEventListener) {
      mq.addEventListener("change", update);
      return () => mq.removeEventListener("change", update);
    }

    mq.addListener(update);
    return () => mq.removeListener(update);
  }, []);

  return reduced;
};
