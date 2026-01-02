export interface FormatCountdownResult {
  timeLeft: string;
  isExpired: boolean;
}

export function formatCountdown(
  expiresAt?: Date | string | number | null
): FormatCountdownResult {
  if (!expiresAt) {
    return { timeLeft: "", isExpired: false };
  }

  const now = Date.now();
  let expirationTime: number;
  if (expiresAt instanceof Date) {
    expirationTime = expiresAt.getTime();
  } else if (typeof expiresAt === "number") {
    expirationTime = expiresAt;
  } else {
    expirationTime = new Date(String(expiresAt)).getTime();
  }
  const difference = expirationTime - now;

  if (Number.isNaN(expirationTime) || difference <= 0) {
    return { timeLeft: "Expired", isExpired: true };
  }

  const days = Math.floor(difference / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((difference % (1000 * 60)) / 1000);

  let timeString = "";
  if (days > 0) {
    timeString = `${days}d ${hours}h ${minutes}m`;
  } else if (hours > 0) {
    timeString = `${hours}h ${minutes}m`;
  } else if (minutes > 1) {
    timeString = `${minutes}m`;
  } else if (minutes === 1) {
    timeString = `1m ${seconds}s`;
  } else {
    timeString = `${seconds}s`;
  }

  return { timeLeft: timeString, isExpired: false };
}
