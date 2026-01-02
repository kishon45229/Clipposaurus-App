import { z } from "zod";

const envSchema = z.object({
  NODE_ENV: z.enum(["development", "production"]),
  DB_NAME: z.string().min(1).max(14),
  DB_URI: z.string().min(1).max(131),
  CACHE_TTL: z.coerce.number().min(0),

  // Upstash Redis Configuration
  UPSTASH_REDIS_REST_URL: z.string().min(1).max(100),
  UPSTASH_REDIS_REST_TOKEN: z.string().min(1).max(100),

  // Cloudflare R2 Configuration
  CLOUDFLARE_R2_ACCESS_KEY_ID: z.string().min(1),
  CLOUDFLARE_R2_SECRET_ACCESS_KEY: z.string().min(1),
  CLOUDFLARE_R2_BUCKET_NAME: z.string().min(1),
  CLOUDFLARE_R2_ENDPOINT: z.string().min(1),
  CLOUDFLARE_R2_PUBLIC_URL: z.string().min(1),

  // Backblaze B2 Configuration
  BACKBLAZE_B2_ACCESS_KEY_ID: z.string().min(1),
  BACKBLAZE_B2_SECRET_ACCESS_KEY: z.string().min(1),
  BACKBLAZE_B2_BUCKET_NAME: z.string().min(1),
  BACKBLAZE_B2_ENDPOINT: z.string().min(1),
  BACKBLAZE_B2_DOWNLOAD_URL: z.string().min(1),
  
  // Encryption Configuration
  DROP: z.string().min(1),

  // reCAPTCHA Configuration
  RECAPTCHA_SECRET_KEY: z.string().min(1),

  // Word Pool Configuration
  KEYS: z.string().min(1),

  // Rollbar configuration
  ROLLBAR_SERVER_TOKEN: z.string().min(1),

  // Contentful Configuration
  CONTENTFUL_SPACE_ID: z.string().min(1),
  CONTENTFUL_ENVIRONMENT: z.string().min(1),
  CONTENTFUL_ACCESS_TOKEN: z.string().min(1),
  CONTENTFUL_HOME_PAGE_ID: z.string().min(1),
  CONTENTFUL_CREATE_DROP_PAGE_ID: z.string().min(1),
  CONTENTFUL_OPEN_DROP_PAGE_ID: z.string().min(1),
  CONTENTFUL_PRIVACY_POLICY_PAGE_ID: z.string().min(1),
  CONTENTFUL_TERMS_OF_SERVICE_PAGE_ID: z.string().min(1),
  CONTENTFUL_DOCS_PAGE_ID: z.string().min(1),
  CONTENTFUL_HERO_COMPONENT_ID: z.string().min(1),
  CONTENTFUL_OPTIONS_COMPONENT_ID: z.string().min(1),
  CONTENTFUL_INPUT_CODE_COMPONENT_ID: z.string().min(1),
});

const _env = envSchema.safeParse(process.env);
if (!_env.success) {
  console.error("Invalid environment variables:", _env.error);
  throw new Error("Invalid environment variables");
}

const env = _env.data;
export default env;
