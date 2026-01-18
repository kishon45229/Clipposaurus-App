import { z } from "zod";

const envSchema = z.object({
  NODE_ENV: z.enum(["development", "production"]),
  CACHE_TTL: z.coerce.number().min(0),

  // Upstash Redis Configuration
  UPSTASH_REDIS_KV_REST_API_URL: z.url(),
  UPSTASH_REDIS_KV_REST_API_TOKEN: z.string().min(1),


  // Encryption Configuration
  DROP: z.string().min(1),

  // reCAPTCHA Configuration
  RECAPTCHA_SECRET_KEY: z.string().min(1),

  // Word Pool Configuration
  KEYS: z.string().min(500),

  // Rollbar configuration
  ROLLBAR_SERVER_TOKEN: z.string().min(1),

  // Marketing URL
  NEXT_PUBLIC_DEVELOPMENT_MARKETING_URL: z.url(),
  NEXT_PUBLIC_PRODUCTION_MARKETING_URL: z.url(),

  // Documentation URL
  NEXT_PUBLIC_DEVELOPMENT_DOCS_URL: z.url(),
  NEXT_PUBLIC_PRODUCTION_DOCS_URL: z.url(),
});

const _env = envSchema.safeParse(process.env);
if (!_env.success) {
  console.error("Invalid environment variables:", _env.error);
  throw new Error("Invalid environment variables");
}

const env = _env.data;
export default env;
