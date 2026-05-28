import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const keys = () =>
  createEnv({
    skipValidation: process.env.SKIP_ENV_VALIDATION === "true",
    server: {
      SVIX_TOKEN: z
        .union([z.string().startsWith("sk_"), z.string().startsWith("testsk_")])
        .optional(),
    },
    runtimeEnv: {
      SVIX_TOKEN: process.env.SVIX_TOKEN,
    },
  });
