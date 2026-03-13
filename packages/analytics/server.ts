import "server-only";
import { PostHog } from "posthog-node";
import { keys } from "./keys";

const { NEXT_PUBLIC_POSTHOG_KEY, NEXT_PUBLIC_POSTHOG_HOST } = keys();

export const analytics =
  NEXT_PUBLIC_POSTHOG_KEY && NEXT_PUBLIC_POSTHOG_HOST
    ? new PostHog(NEXT_PUBLIC_POSTHOG_KEY, {
        host: NEXT_PUBLIC_POSTHOG_HOST,

        // Don't batch events and flush immediately - we're running in a serverless environment
        flushAt: 1,
        flushInterval: 0,
      })
    : undefined;
