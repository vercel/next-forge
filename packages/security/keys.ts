import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const keys = () =>
  createEnv({
    server: {
      ARCJET_KEY: z.string().startsWith("ajkey_").optional(),
    },
    runtimeEnv: {
      ARCJET_KEY: process.env.ARCJET_KEY,
    },
  });
