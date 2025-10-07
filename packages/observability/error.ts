import * as Sentry from "@sentry/nextjs";
import { log } from "./log";

export const parseError = (error: unknown): string => {
  let message = "An error occurred";

  if (error instanceof Error) {
    message = error.message;
  } else if (error && typeof error === "object" && "message" in error) {
    message = error.message as string;
  } else {
    message = String(error);
  }

  try {
    Sentry.captureException(error);
    log.error(`Parsing error: ${message}`);
  } catch (newError) {
    // biome-ignore lint/suspicious/noConsole: Need console here
    console.error("Error parsing error:", newError);
  }

  return message;
};
