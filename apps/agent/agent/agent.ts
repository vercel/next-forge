import { defineAgent } from "eve";
import { mockModel } from "eve/evals";

// Model selection follows next-forge's graceful-degradation philosophy.
//
// - With an AI Gateway credential — `AI_GATEWAY_API_KEY` locally, or the Vercel
//   OIDC token that Vercel injects on a deployment — the agent talks to a real
//   model through the Vercel AI Gateway. Swap the id for any model in the
//   catalog: https://vercel.com/ai-gateway/models
// - Without one, the agent stays fully functional but answers from a
//   deterministic offline fixture. That keeps `bun run dev`, `bun run build`,
//   and `eve eval` green with zero API keys — the first thing a fresh
//   next-forge user experiences — and makes CI provider-free.
//
// `||` (not `??`) so an empty `AI_GATEWAY_API_KEY=""` from `.env.example` falls
// through to the OIDC token instead of masking it.
const gatewayReady = Boolean(
  process.env.AI_GATEWAY_API_KEY || process.env.VERCEL_OIDC_TOKEN
);

// Warn once, at request time (not build time — the OIDC token only exists at
// runtime on Vercel), so degraded mode is visible in server logs.
let warnedOffline = false;
const warnOfflineOnce = () => {
  if (warnedOffline) {
    return;
  }
  warnedOffline = true;
  console.warn(
    "[agent] No AI Gateway credential — serving from the deterministic offline " +
      "fallback model. Set AI_GATEWAY_API_KEY (or deploy on Vercel with the AI " +
      "Gateway enabled) for live responses."
  );
};

export default defineAgent(
  gatewayReady
    ? {
        // Live path: eve resolves the context window from the gateway catalog,
        // so compaction works with no extra config.
        model: "anthropic/claude-sonnet-5",
      }
    : {
        model: mockModel({
          modelId: "offline-fallback",
          provider: "next-forge",
          respond: ({ toolResults }) => {
            warnOfflineOnce();
            // First turn: exercise the monorepo-native tool so the offline path
            // still proves the wiring works end to end.
            if (toolResults.length === 0) {
              return { toolCalls: [{ name: "count-pages", input: {} }] };
            }
            const result = toolResults[0]?.output as
              | { ok?: boolean; count?: number }
              | undefined;
            const data = result?.ok
              ? `The database reports ${result.count} page(s).`
              : "The database tool is currently disabled.";
            return {
              text:
                "I'm running in offline fallback mode because no AI Gateway " +
                `credential is configured. ${data} Set AI_GATEWAY_API_KEY for ` +
                "live model responses, and DATABASE_URL in apps/agent/.env for " +
                "live data.",
            };
          },
        }),
        // The offline fixture has no AI Gateway catalog entry; hand eve the
        // context-window size directly (documented escape hatch) so compaction
        // still compiles provider-free.
        modelContextWindowTokens: 200_000,
      }
);
