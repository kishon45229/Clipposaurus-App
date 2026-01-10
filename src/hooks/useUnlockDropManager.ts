"use client";

import React from "react";
import { useRouter } from "next/navigation";
import ReCAPTCHA from "react-google-recaptcha";
import { navigation } from "@/lib/navigation";
import { sendOpenDropRequest } from "@/services/dropService";
import { decryptFullDrop } from "@/lib/dropDecryption";
import type {
  CreateDropRequestStatus,
  DropKeyVerificationRequestStatus,
  RetrivedDrop,
} from "@/types";
import type { DecryptedDrop } from "@/types/decryption";
import { setDropSession } from "@/lib/sessionStorage";

interface UseUnlockDropProps {
  identifier: string;
  systemSecret: string;
  userSecret: string;
  isValidDropKey: boolean;
  handleClearDropKey: () => void;
}

interface UseUnlockDropReturn {
  dropKeyVerificationRequestStatus: DropKeyVerificationRequestStatus;
  createDropRequestStatus: CreateDropRequestStatus;
  handleCaptchaChange: (token: string | null) => void;
  handleCreateDrop: () => void;
  handleOpenDrop: () => void;
  handleKeyPress: (e: React.KeyboardEvent) => void;
  handleTryAgain: () => void;
  handleRateLimit: () => void;
  recaptchaRef: React.RefObject<ReCAPTCHA | null>;
  shouldShowRecaptcha: boolean;
  redirectUrl: string | null;
  isEnterKeyStep: boolean;
  isVerifyStep: boolean;
  isAccessStep: boolean;
  emptyFields: string[];
}

const action = {
  createDrop: "create_drop",
  openDrop: "open_drop",
};

export function useUnlockDropManager({
  identifier,
  systemSecret,
  userSecret,
  isValidDropKey,
  handleClearDropKey,
}: UseUnlockDropProps): UseUnlockDropReturn {
  const [createDropRequestStatus, setCreateDropRequestStatus] =
    React.useState<CreateDropRequestStatus>("idle");
  const [
    dropKeyVerificationRequestStatus,
    setDropKeyVerificationRequestStatus,
  ] = React.useState<DropKeyVerificationRequestStatus>("idle");
  const [redirectUrl, setRedirectUrl] = React.useState<string | null>(null);

  const router = useRouter();
  const recaptchaRef = React.useRef<ReCAPTCHA>(null);
  const recaptchaSiteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;
  const shouldDisableRecaptcha = process.env.NODE_ENV === "development";
  const shouldShowRecaptcha = Boolean(
    recaptchaSiteKey && !shouldDisableRecaptcha
  );

  const isEnterKeyStep =
    dropKeyVerificationRequestStatus === "idle" ||
    dropKeyVerificationRequestStatus === "incomplete";
  const isVerifyStep =
    dropKeyVerificationRequestStatus === "verifying" ||
    dropKeyVerificationRequestStatus === "error" ||
    dropKeyVerificationRequestStatus === "notfound" ||
    dropKeyVerificationRequestStatus === "rateLimited" ||
    dropKeyVerificationRequestStatus === "decryptionError";
  const isAccessStep = dropKeyVerificationRequestStatus === "success";

  const emptyFields: string[] = [];
  if (!identifier) emptyFields.push("first word");
  if (!systemSecret) emptyFields.push("second word");
  if (!userSecret) emptyFields.push("third word");

  const handleDropKeyVerification = React.useCallback(
    async (recaptchaToken?: string | null) => {
      setDropKeyVerificationRequestStatus("verifying");

      try {
        const rateLimitResponse = await fetch(
          "/api/rate-limit?action=" + action.openDrop
        );
        if (rateLimitResponse.ok) {
          const rateLimitData = await rateLimitResponse.json();
          if (!rateLimitData.allowed) {
            setDropKeyVerificationRequestStatus("rateLimited");
            return;
          }
        }

        const openDropRequestResult = await sendOpenDropRequest(
          identifier,
          recaptchaToken ? recaptchaToken : null
        );

        if (openDropRequestResult.status === 429) {
          setDropKeyVerificationRequestStatus("rateLimited");
          return;
        }

        if (
          openDropRequestResult.status === 404 ||
          !openDropRequestResult.success ||
          !openDropRequestResult.data
        ) {
          setDropKeyVerificationRequestStatus("notfound");
          return;
        }

        if (
          openDropRequestResult.status === 400 ||
          openDropRequestResult.status === 500
        ) {
          setDropKeyVerificationRequestStatus("error");
          return;
        }

        try {
          const dropData = openDropRequestResult.data.data as RetrivedDrop;

          const decryptionResult = await decryptFullDrop(
            dropData,
            identifier,
            systemSecret,
            userSecret
          );

          if (!decryptionResult.success) {
            setDropKeyVerificationRequestStatus("notfound");
            return;
          }

          if (setDropSession(decryptionResult.data as DecryptedDrop)) {
            setDropKeyVerificationRequestStatus("success");
          }
        } catch {
          // ignore error logging
          setDropKeyVerificationRequestStatus("notfound");
          return;
        }

        setRedirectUrl(
          `${navigation.openDrop}?drop=${encodeURIComponent(
            `${identifier}-${systemSecret}-${userSecret}`
          )}`
        );
      } catch (error) {
        setDropKeyVerificationRequestStatus("error");
        throw error;
      } finally {
        recaptchaRef.current?.reset();
        setCreateDropRequestStatus("idle");
      }
    },
    [setRedirectUrl, identifier, systemSecret, userSecret]
  );

  const handleCaptchaChange = React.useCallback(
    (token: string | null) => {
      if (token && isValidDropKey && identifier && systemSecret && userSecret) {
        try {
          handleDropKeyVerification(token);
        } catch (error) {
          throw error;
        }
      }
    },
    [
      handleDropKeyVerification,
      isValidDropKey,
      identifier,
      systemSecret,
      userSecret,
    ]
  );

  const handleCreateDrop = React.useCallback(async () => {
    if (createDropRequestStatus === "redirecting") return;
    setCreateDropRequestStatus("redirecting");

    try {
      const rateLimitResponse = await fetch(
        "/api/rate-limit?action=" + action.createDrop
      );
      if (rateLimitResponse.ok) {
        const rateLimitData = await rateLimitResponse.json();
        if (!rateLimitData.allowed) {
          setCreateDropRequestStatus("rateLimited");
          return;
        }

        setCreateDropRequestStatus("success");
        router.push(navigation.createDrop);
      }
    } catch (error) {
      setCreateDropRequestStatus("error");
      throw error;
    }
  }, [router, createDropRequestStatus]);

  const handleOpenDrop = React.useCallback(() => {
    if (!isValidDropKey || !identifier || !systemSecret || !userSecret) {
      setDropKeyVerificationRequestStatus("incomplete");
      return;
    }

    if (shouldShowRecaptcha) {
      recaptchaRef.current?.execute();
    } else {
      try {
        handleDropKeyVerification();
      } catch (error) {
        throw error;
      }
    }
  }, [
    identifier,
    systemSecret,
    userSecret,
    shouldShowRecaptcha,
    isValidDropKey,
    handleDropKeyVerification,
  ]);

  const handleKeyPress = React.useCallback(
    (e: React.KeyboardEvent) => {
      if (
        e.key === "Enter" &&
        isValidDropKey &&
        identifier &&
        systemSecret &&
        userSecret
      ) {
        e.preventDefault();
        handleOpenDrop();
      } else if (e.key === "Enter" && !isValidDropKey) {
        e.preventDefault();
        setDropKeyVerificationRequestStatus("incomplete");
      }
    },
    [isValidDropKey, identifier, systemSecret, userSecret, handleOpenDrop]
  );

  const handleUnlockDropStatus = React.useCallback(() => {
    if (dropKeyVerificationRequestStatus === "rateLimited") {
      setDropKeyVerificationRequestStatus("idle");
      handleClearDropKey();
      router.push("/");
    }

    setDropKeyVerificationRequestStatus("idle");
    handleClearDropKey();
  }, [handleClearDropKey]);

  const handleTryAgain = React.useCallback(() => {
    setDropKeyVerificationRequestStatus("idle");
    handleClearDropKey();
  }, [handleClearDropKey]);

  const handleRateLimit = React.useCallback(() => {
    setDropKeyVerificationRequestStatus("idle");
    handleClearDropKey();
    router.push("/");
  }, [handleClearDropKey, router]);

  return {
    dropKeyVerificationRequestStatus,
    createDropRequestStatus,
    handleCaptchaChange,
    handleCreateDrop,
    handleOpenDrop,
    handleKeyPress,
    handleTryAgain,
    handleRateLimit,
    recaptchaRef,
    shouldShowRecaptcha,
    redirectUrl,
    isEnterKeyStep,
    isVerifyStep,
    isAccessStep,
    emptyFields,
  };
}
