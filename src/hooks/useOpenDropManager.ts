"use client";

import React from "react";
import type { DecryptedDrop } from "@/types/decryption";
import type { OpenDropAlertStatus, DropContentType } from "@/types";
import { copyTextToClipboard } from "@/lib/openDropUtils";
import { copyCodeWithSyntaxHighlight } from "@/lib/copy-with-syntax-highlight/index";
import { getDropSession } from "@/lib/sessionStorage";

export interface UseOpenDropReturn {
  decryptedDrop: DecryptedDrop;

  availableContentTypes: AvailableContentType[];
  selectedContentType: DropContentType | null;
  setSelectedContentType: (type: DropContentType | null) => void;
  handleDefaultContentType: () => DropContentType | null;

  alertType: OpenDropAlertStatus;
  setAlertType: React.Dispatch<React.SetStateAction<OpenDropAlertStatus>>;
  handleClose: () => void;

  hasTextContent: boolean;
  hasCodeContent: boolean;

  handleCopyError: () => void;
  copiedStates: { [key: string]: boolean };
  handleCopy: (
    text: string,
    itemId: string,
    language?: string,
  ) => Promise<void>;

  showCopyButton: boolean;
  isCopied: boolean;
  onCopy: () => Promise<void>;
}

export interface AvailableContentType {
  type: DropContentType;
  label: string;
  language?: string | null;
}

export function useOpenDropManager(): UseOpenDropReturn {
  const [alertType, setAlertType] = React.useState<OpenDropAlertStatus>("idle");
  const [selectedContentType, setSelectedContentType] =
    React.useState<DropContentType | null>(null);
  const [copiedStates, setCopiedStates] = React.useState<{
    [key: string]: boolean;
  }>({});

  const decryptedDrop = getDropSession()!;

  // CONTENT TYPE PRESENCE
  const hasTextContent = React.useMemo(
    () => Boolean(decryptedDrop.decryptedText),
    [decryptedDrop.decryptedText],
  );

  const hasCodeContent = React.useMemo(
    () => Boolean(decryptedDrop.decryptedCode),
    [decryptedDrop.decryptedCode],
  );

  const hasCodeLanguage = React.useMemo(
    () => Boolean(decryptedDrop.decryptedLanguage),
    [decryptedDrop.decryptedLanguage],
  );

  // HANDLERS
  const handleClose = React.useCallback(() => {
    sessionStorage.removeItem("Drop");
    setAlertType("idle");
  }, [setAlertType]);

  const handleCopy = React.useCallback(
    async (text: string, itemId: string, language?: string) => {
      let success = false;

      if (language) {
        success = await copyCodeWithSyntaxHighlight(text, language);
      } else {
        success = await copyTextToClipboard(text);
      }

      if (success) {
        setCopiedStates((prev) => ({ ...prev, [itemId]: true }));
        setTimeout(() => {
          setCopiedStates((prev) => ({ ...prev, [itemId]: false }));
        }, 2000);
      }
    },
    [],
  );

  const handleCopyError = React.useCallback(() => {
    setAlertType("copy-error");
  }, [setAlertType]);

  const availableContentTypes = React.useMemo<AvailableContentType[]>(() => {
    const contentTypes: AvailableContentType[] = [];

    if (hasTextContent) {
      contentTypes.push({
        type: "note",
        label: "Note",
      });
    }

    if (hasCodeContent) {
      contentTypes.push({
        type: "code",
        label: "Code",
        language: hasCodeLanguage ? decryptedDrop.decryptedLanguage : null,
      });
    }

    return contentTypes;
  }, [
    hasTextContent,
    hasCodeContent,
    hasCodeLanguage,
    decryptedDrop.decryptedLanguage,
  ]);

  const handleDefaultContentType =
    React.useCallback((): DropContentType | null => {
      if (hasTextContent) return "note";
      if (hasCodeContent) return "code";
      return null;
    }, [hasTextContent, hasCodeContent]);

  React.useEffect(() => {
    if (selectedContentType === null) {
      const defaultType = handleDefaultContentType();
      setSelectedContentType(defaultType);
    }
  }, [selectedContentType, handleDefaultContentType]);

  // ACTION BAR OPTIONS
  const drop = `${decryptedDrop?.identifier}`;
  const copiedKeyText = `main-${drop}-text`;
  const copiedKeyCode = `main-${drop}-code`;

  const showCopyButton = React.useMemo(() => {
    return (
      (selectedContentType === "note" && hasTextContent) ||
      (selectedContentType === "code" && hasCodeContent)
    );
  }, [selectedContentType, hasTextContent, hasCodeContent]);

  const isCopied = React.useMemo(() => {
    return Boolean(
      copiedStates?.[copiedKeyText] || copiedStates?.[copiedKeyCode],
    );
  }, [copiedStates, copiedKeyText, copiedKeyCode]);

  const onCopy = React.useCallback(async () => {
    try {
      if (selectedContentType === "note" && decryptedDrop?.decryptedText) {
        await handleCopy(decryptedDrop.decryptedText, `main-${drop}-text`);
      } else if (
        selectedContentType === "code" &&
        decryptedDrop?.decryptedCode
      ) {
        await handleCopy(
          decryptedDrop.decryptedCode,
          `main-${drop}-code`,
          decryptedDrop.decryptedLanguage || "plaintext",
        );
      }
    } catch {
      // ignore
    }
  }, [selectedContentType, decryptedDrop, handleCopy, drop]);

  return {
    availableContentTypes,
    decryptedDrop,

    selectedContentType,
    setSelectedContentType,
    handleDefaultContentType,

    alertType,
    setAlertType,
    handleClose,

    hasTextContent,
    hasCodeContent,

    handleCopyError,

    copiedStates,
    handleCopy,

    showCopyButton,
    isCopied,
    onCopy,
  };
}
