import { defineEvalConfig } from "eve/evals";

// No judge model is configured: the smoke eval is fully deterministic, so
// `eve eval` runs provider-free in CI. Add `judge: { model: "..." }` here when
// you introduce LLM-as-judge assertions.
export default defineEvalConfig({});
