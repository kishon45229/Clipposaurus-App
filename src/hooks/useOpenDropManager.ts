"use client";

import React from "react";
import type { DecryptedDrop } from "@/types/decryption";
import type { OpenDropAlertStatus, DropContentType } from "@/types";
import {
  copyTextToClipboard,
  downloadFileWithFallback,
} from "@/lib/openDropUtils";
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
  hasFiles: boolean;

  handleCopyError: () => void;
  handleDownloadError: () => void;
  copiedStates: { [key: string]: boolean };
  handleCopy: (
    text: string,
    itemId: string,
    language?: string
  ) => Promise<void>;
  handleDownload: (
    url: string,
    fileName: string,
    identifier?: string,
    systemSecret?: string,
    userSecret?: string
  ) => Promise<void>;

  // Action bar options
  showCopyButton: boolean;
  showDownloadButton: boolean;
  isCopied: boolean;
  onCopy: () => Promise<void>;
  onDownloadAll: () => Promise<void>;
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
    [decryptedDrop.decryptedText]
  );

  const hasCodeContent = React.useMemo(
    () => Boolean(decryptedDrop.decryptedCode),
    [decryptedDrop.decryptedCode]
  );

  const hasCodeLanguage = React.useMemo(
    () => Boolean(decryptedDrop.decryptedLanguage),
    [decryptedDrop.decryptedLanguage]
  );

  const hasFiles = React.useMemo(
    () =>
      Boolean(
        decryptedDrop.decryptedFiles && decryptedDrop.decryptedFiles.length > 0
      ),
    [decryptedDrop.decryptedFiles]
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
    []
  );

  const handleDownload = React.useCallback(
    async (url: string, fileName: string, dropKey?: string) => {
      await downloadFileWithFallback(url, fileName, dropKey);
    },
    []
  );

  const handleCopyError = React.useCallback(() => {
    setAlertType("copy-error");
  }, [setAlertType]);

  const handleDownloadError = React.useCallback(() => {
    setAlertType("download-error");
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

    if (hasFiles) {
      contentTypes.push({
        type: "files",
        label: "Files",
      });
    }

    return contentTypes;
  }, [
    hasTextContent,
    hasCodeContent,
    hasFiles,
    hasCodeLanguage,
    decryptedDrop.decryptedLanguage,
  ]);

  const handleDefaultContentType =
    React.useCallback((): DropContentType | null => {
      if (hasTextContent) return "note";
      if (hasCodeContent) return "code";
      if (hasFiles) return "files";
      return null;
    }, [hasTextContent, hasCodeContent, hasFiles]);

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

  const showDownloadButton = React.useMemo(() => {
    return selectedContentType === "files" && hasFiles;
  }, [selectedContentType, hasFiles]);

  const isCopied = React.useMemo(() => {
    return Boolean(
      copiedStates?.[copiedKeyText] || copiedStates?.[copiedKeyCode]
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
          decryptedDrop.decryptedLanguage || "plaintext"
        );
      }
    } catch {
      // ignore
    }
  }, [selectedContentType, decryptedDrop, handleCopy, drop]);

  const onDownloadAll = React.useCallback(async () => {
    if (decryptedDrop?.decryptedFiles) {
      const dropKey = decryptedDrop.dropKey || decryptedDrop.identifier;
      for (const f of decryptedDrop.decryptedFiles) {
        await handleDownload(f.url, f.name, dropKey);
      }
    }
  }, [decryptedDrop, handleDownload]);

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
    hasFiles,

    handleCopyError,
    handleDownloadError,

    copiedStates,
    handleCopy,
    handleDownload,

    showCopyButton,
    showDownloadButton,
    isCopied,
    onCopy,
    onDownloadAll,
  };
}
