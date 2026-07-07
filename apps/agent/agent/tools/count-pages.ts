import { neonConfig } from "@neondatabase/serverless";
import { PrismaNeon } from "@prisma/adapter-neon";
// NOTE: imports the generated client + keys directly. @repo/database's index.ts
// carries a `server-only` guard, which only the Next.js runtime satisfies —
// eve agents run on Nitro. Proposed upstream: runtime-neutral entrypoints.
import { PrismaClient } from "@repo/database/generated/client";
import { keys } from "@repo/database/keys";
import { defineTool } from "eve/tools";
import ws from "ws";
import { z } from "zod";

let database: PrismaClient | undefined;

const getDatabase = () => {
  if (!database) {
    neonConfig.webSocketConstructor = ws;
    const adapter = new PrismaNeon({ connectionString: keys().DATABASE_URL });
    database = new PrismaClient({ adapter });
  }
  return database;
};

/**
 * Demonstrates the monorepo advantage: the agent's tools reuse the same
 * schema, generated client, and env keys as the apps. Degrades gracefully
 * when the database is unreachable — mirroring next-forge's
 * optional-integration philosophy.
 */
export default defineTool({
  description:
    "Count the Page records in the application database (via @repo/database).",
  inputSchema: z.object({}),
  execute: async () => {
    try {
      const count = await getDatabase().page.count();
      return { ok: true, count };
    } catch (error) {
      // Log the full error server-side; return only a generic reason so raw
      // connection details never reach the model or the caller.
      console.error("[count-pages] database unreachable:", error);
      return {
        ok: false,
        disabled: true,
        reason:
          "Database is not reachable. Set DATABASE_URL in apps/agent/.env to enable this tool.",
      };
    }
  },
});
