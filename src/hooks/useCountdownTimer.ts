"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { navigation } from "@/lib/navigation";
import { useOpenDrop } from "@/contexts/OpenDropContext";
import { formatCountdown } from "@/lib/countdown";
import { error } from "console";

interface CountdownResult {
  timeLeft: string;
  isExpired: boolean;
}

export function useCountdownTimer(): CountdownResult {
  const [timeLeft, setTimeLeft] = React.useState<string>("");
  const [isExpired, setIsExpired] = React.useState(false);
  const hasHandledExpiry = React.useRef(false);
  const router = useRouter();

  const { setAlertType, decryptedDrop } = useOpenDrop();

  const expiresAt = decryptedDrop.decryptedExpirationDateTime;

  React.useEffect(() => {
    if (!expiresAt) {
      setAlertType("common-error");
    }
  }, [expiresAt, setAlertType]);

  React.useEffect(() => {
    hasHandledExpiry.current = false;

    const updateCountdown = () => {
      const { timeLeft: formatted, isExpired: expired } =
        formatCountdown(expiresAt);

      setTimeLeft(formatted);
      setIsExpired(expired);

      if (expired && expiresAt instanceof Date && expiresAt.getTime() > 0) {
        if (!hasHandledExpiry.current) {
          hasHandledExpiry.current = true;
          try {
            router.push(navigation.home);
          } catch (error) {
            throw error;
          }
        }
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);

    return () => clearInterval(interval);
  }, [expiresAt, router]);

  return { timeLeft, isExpired };
}
