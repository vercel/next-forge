import "server-only";
import Stripe from "stripe";
import { keys } from "./keys";

export const stripe = new Stripe(keys().STRIPE_SECRET_KEY, {
  apiVersion: "2026-02-25.clover",
});

export type { Stripe } from "stripe";
