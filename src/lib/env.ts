import { z } from "zod";

const envSchema = z.object({
  NODE_ENV: z.enum(["development", "production"]),
  CACHE_TTL: z.coerce.number().min(0),

  // Upstash Redis Configuration
  UPSTASH_REDIS_KV_URL: z.url(),
  UPSTASH_REDIS_KV_REST_API_TOKEN: z.string().min(1).max(100),

  // Cloudflare R2 Configuration
  CLOUDFLARE_R2_ACCESS_KEY_ID: z.string().min(1),
  CLOUDFLARE_R2_SECRET_ACCESS_KEY: z.string().min(1),
  CLOUDFLARE_R2_BUCKET_NAME: z.string().min(1),
  CLOUDFLARE_R2_ENDPOINT: z.string().min(1),
  CLOUDFLARE_R2_PUBLIC_URL: z.url(),

  // Backblaze B2 Configuration
  BACKBLAZE_B2_ACCESS_KEY_ID: z.string().min(1),
  BACKBLAZE_B2_SECRET_ACCESS_KEY: z.string().min(1),
  BACKBLAZE_B2_BUCKET_NAME: z.string().min(1),
  BACKBLAZE_B2_ENDPOINT: z.string().min(1),
  BACKBLAZE_B2_DOWNLOAD_URL: z.url(),

  // Encryption Configuration
  DROP: z.string().min(1),

  // reCAPTCHA Configuration
  RECAPTCHA_SECRET_KEY: z.string().min(1),

  // Word Pool Configuration
  KEYS: z.string().min(1),

  // Rollbar configuration
  ROLLBAR_SERVER_TOKEN: z.string().min(1),

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
