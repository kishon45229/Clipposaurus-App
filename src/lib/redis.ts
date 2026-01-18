import { Redis } from "@upstash/redis";
import env from "@/lib/env";

export const upstashRedis = new Redis({
  url: env.UPSTASH_REDIS_KV_REST_API_URL,
  token: env.UPSTASH_REDIS_KV_REST_API_TOKEN,
});
