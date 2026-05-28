import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const keys = () =>
  createEnv({
    skipValidation: process.env.SKIP_ENV_VALIDATION === "true",
    server: {
      OPENAI_API_KEY: z.string().startsWith("sk-").optional(),
    },
    runtimeEnv: {
      OPENAI_API_KEY: process.env.OPENAI_API_KEY,
    },
  });
