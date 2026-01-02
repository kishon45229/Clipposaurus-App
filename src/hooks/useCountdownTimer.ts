"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { navigation } from "@/lib/navigation";
import { useOpenDrop } from "@/contexts/OpenDropContext";
import { useDropSidebar } from "@/contexts/DropSidebarContext";
import { formatCountdown } from "@/lib/countdown";

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
        console.log("🚨 Drop expired - redirecting to home");
        if (!hasHandledExpiry.current) {
          hasHandledExpiry.current = true;
          try {
            router.push(navigation.home);
          } catch (error) {
            throw error;
          }
        }
      } else if (
        expired &&
        expiresAt instanceof Date &&
        expiresAt.getTime() === 0
      ) {
        console.log(
          "⏳ Drop appears expired but still decrypting or invalid timestamp - not redirecting"
        );
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);

    return () => clearInterval(interval);
  }, [expiresAt, router]);

  return { timeLeft, isExpired };
}
