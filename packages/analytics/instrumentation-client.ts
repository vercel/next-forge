import posthog from "posthog-js";
import { keys } from "./keys";

export const initializeAnalytics = () => {
  const { NEXT_PUBLIC_POSTHOG_KEY, NEXT_PUBLIC_POSTHOG_HOST } = keys();

  if (!NEXT_PUBLIC_POSTHOG_KEY || !NEXT_PUBLIC_POSTHOG_HOST) {
    return;
  }

  posthog.init(NEXT_PUBLIC_POSTHOG_KEY, {
    api_host: NEXT_PUBLIC_POSTHOG_HOST,
    defaults: "2025-05-24",
  });
};
