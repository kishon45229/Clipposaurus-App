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

interface UseOpenDropModalProps {
  identifier: string;
  systemSecret: string;
  userSecret: string;
  isValidDropKey: boolean;
}

interface UseOpenDropModalReturn {
  dropKeyVerificationRequestStatus: DropKeyVerificationRequestStatus;
  createDropRequestStatus: CreateDropRequestStatus;
  isModalOpen: boolean;
  shouldShowModal: boolean;
  handleOpenModal: () => void;
  handleCloseModal: () => void;
  handleOpenChange: (open: boolean) => void;
  handleCaptchaChange: (token: string | null) => void;
  handleCreateDrop: () => void;
  handleOpenDrop: () => void;
  handleKeyPress: (e: React.KeyboardEvent) => void;
  handleClose: () => void;
  handleDialogClose: () => void;
  handleDropKeyVerificationSuccess: () => void;
  recaptchaRef: React.RefObject<ReCAPTCHA | null>;
  shouldShowRecaptcha: boolean;
  redirectUrl: string | null;
}

const action = {
  createDrop: "create_drop",
  openDrop: "open_drop",
};

export function useOpenDropModal({
  identifier,
  systemSecret,
  userSecret,
  isValidDropKey,
}: UseOpenDropModalProps): UseOpenDropModalReturn {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
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

  const verifyDropKey = React.useCallback(
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
          verifyDropKey(token);
        } catch (error) {
          throw error;
        }
      }
    },
    [verifyDropKey, isValidDropKey, identifier, systemSecret, userSecret]
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
        verifyDropKey();
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
    verifyDropKey,
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

  const handleOpenModal = React.useCallback(() => {
    setIsModalOpen(true);
  }, []);

  const handleCloseModal = React.useCallback(() => {
    setIsModalOpen(false);
  }, []);

  // Hide modal when DialogBox is active
  const isDialogBoxActive =
    dropKeyVerificationRequestStatus !== "idle" ||
    createDropRequestStatus === "rateLimited";
  const shouldShowModal = isModalOpen && !isDialogBoxActive;

  // Close modal when clicking outside or pressing Escape
  const handleOpenChange = React.useCallback(
    (open: boolean) => {
      if (!open && dropKeyVerificationRequestStatus !== "verifying") {
        handleCloseModal();
      }
    },
    [dropKeyVerificationRequestStatus, handleCloseModal]
  );

  const handleClose = React.useCallback(() => {
    setDropKeyVerificationRequestStatus("idle");
    setCreateDropRequestStatus("idle");
    setIsModalOpen(false);
  }, []);

  const handleDialogClose = React.useCallback(() => {
    setDropKeyVerificationRequestStatus("idle");
    setCreateDropRequestStatus("idle");
    // Keep the modal open - only reset verification states
  }, []);

  const handleDropKeyVerificationSuccess = React.useCallback(() => {
    if (!redirectUrl) return;

    try {
      const timer = setTimeout(() => {
        router.push(redirectUrl as string);
      }, 2000);

      return () => clearTimeout(timer);
    } catch (error) {
      handleClose();
      throw error;
    }
  }, [redirectUrl, router, handleClose]);

  return {
    dropKeyVerificationRequestStatus,
    createDropRequestStatus,
    isModalOpen,
    shouldShowModal,
    handleOpenModal,
    handleCloseModal,
    handleOpenChange,
    handleCaptchaChange,
    handleCreateDrop,
    handleOpenDrop,
    handleKeyPress,
    handleClose,
    handleDialogClose,
    handleDropKeyVerificationSuccess,
    recaptchaRef,
    shouldShowRecaptcha,
    redirectUrl,
  };
}
