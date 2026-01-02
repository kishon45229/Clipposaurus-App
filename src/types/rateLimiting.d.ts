// Enterprise rate limiting types

export interface ClientFingerprint {
  /** Browser fingerprint hash */
  browserHash: string;
  /** User agent string */
  userAgent: string;
  /** Accept headers fingerprint */
  acceptHeaders: string;
  /** Language preferences */
  acceptLanguage: string;
  /** Timezone offset */
  timezone?: number;
  /** Screen resolution (if available) */
  screenResolution?: string;
  /** Platform information */
  platform?: string;
}

export interface GeolocationData {
  /** Country code (ISO 3166-1 alpha-2) */
  countryCode: string;
  /** Region/state code */
  region?: string;
  /** City name */
  city?: string;
  /** ISP information */
  isp?: string;
  /** Organization name */
  org?: string;
  /** ASN (Autonomous System Number) */
  asn?: string;
}

export interface RateLimitStrategy {
  /** Strategy identifier */
  id: string;
  /** Strategy name */
  name: string;
  /** Maximum requests allowed */
  maxRequests: number;
  /** Time window in milliseconds */
  windowMs: number;
  /** Priority level (higher = more important) */
  priority: number;
  /** Whether this strategy can block requests */
  canBlock: boolean;
}

export interface RateLimitContext {
  /** Client IP address */
  ip: string;
  /** Client fingerprint */
  fingerprint?: ClientFingerprint;
  /** Geolocation data */
  geolocation?: GeolocationData;
  /** Request path */
  path: string;
  /** HTTP method */
  method: string;
  /** Request headers */
  headers: Record<string, string>;
  /** Request timestamp */
  timestamp: number;
  /** User session ID (if available) */
  sessionId?: string;
  /** Custom action identifier */
  action?: string;
}

export interface RateLimitResult {
  /** Whether the request is allowed */
  allowed: boolean;
  /** Remaining requests in the window */
  remaining: number;
  /** Reset time (timestamp) */
  resetTime: number;
  /** Applied strategy details */
  appliedStrategies: AppliedStrategy[];
  /** Total score from all strategies */
  totalScore: number;
  /** Reason for blocking (if blocked) */
  blockReason?: string;
  /** Recommended retry after (seconds) */
  retryAfter?: number;
}

export interface AppliedStrategy {
  /** Strategy identifier */
  strategyId: string;
  /** Strategy name */
  strategyName: string;
  /** Current usage count */
  currentCount: number;
  /** Maximum allowed */
  maxAllowed: number;
  /** Whether this strategy would block */
  wouldBlock: boolean;
  /** Contribution to total score */
  score: number;
}

export interface SuspiciousActivityPattern {
  /** Pattern identifier */
  id: string;
  /** Pattern description */
  description: string;
  /** Severity level (1-10) */
  severity: number;
  /** Detection threshold */
  threshold: number;
  /** Action to take when detected */
  action: "warn" | "throttle" | "block" | "captcha";
}

export interface AdaptiveConfig {
  /** Enable adaptive rate limiting */
  enabled: boolean;
  /** Base load factor (1.0 = normal) */
  loadFactor: number;
  /** Maximum rate limit multiplier */
  maxMultiplier: number;
  /** Minimum rate limit multiplier */
  minMultiplier: number;
  /** Load calculation window (ms) */
  loadWindowMs: number;
}

export interface RateLimitConfig {
  /** Default strategies to apply */
  defaultStrategies: RateLimitStrategy[];
  /** Path-specific strategies */
  pathStrategies: Record<string, RateLimitStrategy[]>;
  /** Geographic rate limits */
  geoStrategies: Record<string, RateLimitStrategy[]>;
  /** Suspicious activity patterns */
  suspiciousPatterns: SuspiciousActivityPattern[];
  /** Adaptive configuration */
  adaptive: AdaptiveConfig;
  /** Whitelist of IPs/fingerprints */
  whitelist: {
    ips: string[];
    fingerprints: string[];
    asns: string[];
  };
  /** Blacklist of IPs/fingerprints */
  blacklist: {
    ips: string[];
    fingerprints: string[];
    asns: string[];
    temporaryBlocks: Record<string, number>; // key -> expiry timestamp
  };
}

export interface RateLimitMetrics {
  /** Total requests processed */
  totalRequests: number;
  /** Requests blocked */
  blockedRequests: number;
  /** Requests by strategy */
  strategyMetrics: Record<
    string,
    {
      applied: number;
      blocked: number;
      avgScore: number;
    }
  >;
  /** Geographic distribution */
  geoMetrics: Record<
    string,
    {
      requests: number;
      blocked: number;
    }
  >;
  /** Top blocked IPs */
  topBlockedIps: Array<{
    ip: string;
    count: number;
    lastSeen: number;
  }>;
  /** Suspicious patterns detected */
  suspiciousActivity: Array<{
    pattern: string;
    count: number;
    lastDetected: number;
  }>;
}

export interface RateLimitStorage {
  /** Get current count for a key */
  get(key: string): Promise<number>;
  /** Increment count and set expiry */
  increment(key: string, expireMs: number): Promise<number>;
  /** Get remaining TTL for a key */
  ttl(key: string): Promise<number>;
  /** Set a value with expiry */
  set(
    key: string,
    value: string | number | object,
    expireMs: number
  ): Promise<void>;
  /** Delete a key */
  delete(key: string): Promise<void>;
  /** Get multiple keys at once */
  mget(keys: string[]): Promise<Record<string, string | number | object>>;
  /** Set multiple keys at once */
  mset(
    data: Record<string, string | number | object>,
    expireMs: number
  ): Promise<void>;
}
