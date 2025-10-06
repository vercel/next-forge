import { log as logtail } from "@logtail/next";

export const log = process.env.NODE_ENV === "production" ? logtail : console;
