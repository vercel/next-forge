import { config } from "dotenv";
import { defineConfig } from "prisma/config";
import { keys } from "./keys";

config();

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    url: keys().DATABASE_URL,
  },
});
