interface TimeoutProps {
  interval: number;
  errMsg: string;
}

export default function getTimeout({ interval, errMsg }: TimeoutProps) {
  return new Promise<never>((_, reject) => {
    setTimeout(() => reject(new Error(errMsg)), interval);
  });
}

export function calculateExpiration(retention: string): {
  expiresAt: string;
  ttlSeconds: number;
} {
  const now = Date.now();
  let ttlSeconds: number;

  switch (retention) {
    case "keep-30-minutes":
      ttlSeconds = 30 * 60; // 30 minutes
      break;
    case "keep-1-hour":
    case "delete-on-access":
    default:
      ttlSeconds = 60 * 60; // 1 hour
  }

  const expiresAt = new Date(now + ttlSeconds * 1000).toISOString();
  return { expiresAt, ttlSeconds };
}
