"use client";

import React from "react";
import { validateAndSanitizeDropKey } from "@/lib/dropKeyUtil";

interface UseDropKeyReturn {
  identifier: string;
  systemSecret: string;
  userSecret: string;
  handleIdentifierChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSystemSecretChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleUserSecretChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleClearDropKey: () => void;
  isValidDropKey: boolean;
}

const MAX_WORD_LENGTH = 8 as const;

export function useDropKeyManager(): UseDropKeyReturn {
  const [identifier, setIdentifier] = React.useState<string>("");
  const [systemSecret, setSystemSecret] = React.useState<string>("");
  const [userSecret, setUserSecret] = React.useState<string>("");

  const handleIdentifierChange = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const validationResult = validateAndSanitizeDropKey(
        e.target.value,
        MAX_WORD_LENGTH
      );

      setIdentifier(
        validationResult.isValid ? validationResult.sanitizedValue : ""
      );
    },
    []
  );

  const handleSystemSecretChange = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const validationResult = validateAndSanitizeDropKey(
        e.target.value,
        MAX_WORD_LENGTH
      );

      setSystemSecret(
        validationResult.isValid ? validationResult.sanitizedValue : ""
      );
    },
    []
  );

  const handleUserSecretChange = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const validationResult =
        e.target.value.length > MAX_WORD_LENGTH
          ? e.target.value.substring(0, MAX_WORD_LENGTH)
          : e.target.value;
      setUserSecret(validationResult);
    },
    []
  );

  const handleClearDropKey = React.useCallback(() => {
    setIdentifier("");
    setSystemSecret("");
    setUserSecret("");
  }, []);

  const isValidDropKey = !!identifier && !!systemSecret && !!userSecret;

  return {
    identifier,
    systemSecret,
    userSecret,
    handleIdentifierChange,
    handleSystemSecretChange,
    handleUserSecretChange,
    handleClearDropKey,
    isValidDropKey,
  };
}
