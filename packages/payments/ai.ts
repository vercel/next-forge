import { StripeAgentToolkit } from "@stripe/agent-toolkit/ai-sdk";
import { keys } from "./keys";

export const paymentsAgentToolkit = new StripeAgentToolkit({
  secretKey: keys().STRIPE_SECRET_KEY,
  configuration: {
    actions: {
      paymentLinks: {
        create: true,
      },
      products: {
        create: true,
      },
      prices: {
        create: true,
      },
    },
  },
});
