import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const keys = () =>
  createEnv({
    server: {
      BLOB_READ_WRITE_TOKEN: z.string().optional(),
    },
    runtimeEnv: {
      BLOB_READ_WRITE_TOKEN: process.env.BLOB_READ_WRITE_TOKEN,
    },
  });
