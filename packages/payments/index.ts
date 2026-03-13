import "server-only";
import Stripe from "stripe";
import { keys } from "./keys";

const { STRIPE_SECRET_KEY } = keys();

export const stripe = STRIPE_SECRET_KEY
  ? new Stripe(STRIPE_SECRET_KEY, {
      apiVersion: "2026-02-25.clover",
    })
  : undefined;

export type { Stripe } from "stripe";
