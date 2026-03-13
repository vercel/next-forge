import { initializeSentry } from "@repo/observability/instrumentation";

export const register = initializeSentry;
export { onRequestError } from "@repo/observability/instrumentation";
