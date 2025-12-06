import { defineConfig } from "prisma/config";
import { keys } from "./keys";
import "dotenv/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    url: keys().DATABASE_URL,
  },
});
