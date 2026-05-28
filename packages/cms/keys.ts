import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const keys = () =>
  createEnv({
    skipValidation: process.env.SKIP_ENV_VALIDATION === "true",
    server: {
      BASEHUB_TOKEN: z.string().startsWith("bshb_pk_").optional(),
    },
    runtimeEnv: {
      BASEHUB_TOKEN: process.env.BASEHUB_TOKEN,
    },
  });
