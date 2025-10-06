import { Ratelimit, type RatelimitConfig } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import { keys } from "./keys";

export const redis = new Redis({
  url: keys().UPSTASH_REDIS_REST_URL,
  token: keys().UPSTASH_REDIS_REST_TOKEN,
});

export const createRateLimiter = (props: Omit<RatelimitConfig, "redis">) =>
  new Ratelimit({
    redis,
    limiter: props.limiter ?? Ratelimit.slidingWindow(10, "10 s"),
    prefix: props.prefix ?? "next-forge",
  });

export const { slidingWindow } = Ratelimit;
