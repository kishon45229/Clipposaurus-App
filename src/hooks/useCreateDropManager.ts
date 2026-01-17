import React from "react";
import { useRouter } from "next/navigation";
import type { CreateDropAlertStatus } from "@/types";
import { navigation } from "@/lib/navigation";
import { sendCreateDropRequest } from "@/services/dropService";
import {
  generateIdentifier,
  generateSystemSecret,
  markKeyAsUsed,
  releaseKey,
  validateIdentifier,
} from "@/services/dropKeyService";

export interface DropData {
  textContent: string;
  codeContent: string;
  selectedLanguage: string;
}

export interface UseCreateDropManagerReturn {
  dropData: DropData;
  setTextContent: React.Dispatch<React.SetStateAction<string>>;
  setCodeContent: React.Dispatch<React.SetStateAction<string>>;
  setSelectedLanguage: React.Dispatch<React.SetStateAction<string>>;

  autoDetectLanguage: boolean;
  setAutoDetectLanguage: React.Dispatch<React.SetStateAction<boolean>>;

  identifier: string;
  setIdentifier: React.Dispatch<React.SetStateAction<string>>;
  systemSecret: string;
  setSystemSecret: React.Dispatch<React.SetStateAction<string>>;
  userSecret: string;
  setUserSecret: React.Dispatch<React.SetStateAction<string>>;
  isLoadingKeys: boolean;

  handleKeyGeneration: () => Promise<void>;

  handleCreateDrop(): Promise<void>;

  setCreateDropRequestStatus: React.Dispatch<
    React.SetStateAction<CreateDropAlertStatus>
  >;
  createDropRequestStatus: CreateDropAlertStatus;
  handleDialogBoxOpenChange: (open: boolean) => void;
  handleDialogClose: () => void;

  handleClearContent: () => void;

  copied: boolean;
  handleCopy: () => void;

  setRetention: React.Dispatch<React.SetStateAction<string>>;
  retention: string;

  fullKeyVisible: boolean;
  setFullKeyVisible: React.Dispatch<React.SetStateAction<boolean>>;

  uploadProgress: number;
}

export function useCreateDropManager(): UseCreateDropManagerReturn {
  const router = useRouter();
  const [textContent, setTextContent] = React.useState<string>("");
  const [codeContent, setCodeContent] = React.useState<string>("");
  const [selectedLanguage, setSelectedLanguage] = React.useState<string>("");
  const [autoDetectLanguage, setAutoDetectLanguage] =
    React.useState<boolean>(true);
  const [createDropRequestStatus, setCreateDropRequestStatus] =
    React.useState<CreateDropAlertStatus>("idle");
  const [copied, setCopied] = React.useState(false);
  const [identifier, setIdentifier] = React.useState<string>("");
  const [systemSecret, setSystemSecret] = React.useState<string>("");
  const [userSecret, setUserSecret] = React.useState<string>("");
  const [retention, setRetention] = React.useState<string>("keep-30-minutes");
  const [isLoadingKeys, setIsLoadingKeys] = React.useState<boolean>(false);
  const [fullKeyVisible, setFullKeyVisible] = React.useState(false);
  const [uploadProgress, setUploadProgress] = React.useState<number>(0);
  const isGeneratingRef = React.useRef<boolean>(false);
  const shouldCleanupRef = React.useRef<boolean>(true);
  const identifierExpiryRef = React.useRef<number | null>(null);
  const validationIntervalRef = React.useRef<NodeJS.Timeout | null>(null);

  const dropData: DropData = React.useMemo(
    () => ({
      textContent,
      codeContent,
      selectedLanguage,
    }),
    [textContent, codeContent, selectedLanguage]
  );

  // CLEAR CONTENT HANDLER
  const handleClearContent = React.useCallback(() => {
    setTextContent("");
    setCodeContent("");
    setSelectedLanguage("");
  }, []);

  // RELEASE IDENTIFIER HANDLER
  const handleReleaseIdentifier = React.useCallback(async () => {
    shouldCleanupRef.current = false;

    if (!identifier) return;

    try {
      await releaseKey(identifier);
    } catch (error) {
      throw error;
    }
  }, [identifier]);

  // KEY GENERATION HANDLER
  const handleKeyGeneration = React.useCallback(async () => {
    if (isLoadingKeys || isGeneratingRef.current) return;

    try {
      isGeneratingRef.current = true;
      setIsLoadingKeys(true);

      const identifierData = await generateIdentifier();
      const newSystemSecret = await generateSystemSecret();

      if (identifierData && newSystemSecret) {
        setIdentifier(identifierData.identifier);
        setSystemSecret(newSystemSecret);
        shouldCleanupRef.current = true;
        identifierExpiryRef.current =
          Date.now() + identifierData.expiresIn * 1000;
      }
    } catch (error) {
      setCreateDropRequestStatus("error");
      throw error;
    } finally {
      setIsLoadingKeys(false);
      isGeneratingRef.current = false;
    }
  }, [isLoadingKeys]);

  // DIALOG BOX CLOSE HANDLER
  const handleDialogClose = React.useCallback(async () => {
    if (createDropRequestStatus === "empty") {
      setCreateDropRequestStatus("idle");
      return;
    }

    if (createDropRequestStatus !== "success" && identifier) {
      await handleReleaseIdentifier();
    }

    setCreateDropRequestStatus("idle");
    setIdentifier("");
    setSystemSecret("");
    setUserSecret("");
    if (createDropRequestStatus === "success") {
      router.push(navigation.home);
    }
  }, [
    setCreateDropRequestStatus,
    setIdentifier,
    setSystemSecret,
    setUserSecret,
    router,
    createDropRequestStatus,
    identifier,
    handleReleaseIdentifier,
  ]);

  // DIALOG BOX OPEN CHANGE HANDLER
  const handleDialogBoxOpenChange = React.useCallback(
    (open: boolean) => {
      if (
        !open &&
        createDropRequestStatus !== "creating") {
        handleDialogClose();
      }
    },
    [createDropRequestStatus, handleDialogClose]
  );

  // CREATE DROP HANDLER
  const handleCreateDrop = React.useCallback(async () => {
    if (!identifier || !systemSecret || !userSecret) {
      setCreateDropRequestStatus("nullUserSecret");
      return;
    }

    if (!textContent && !codeContent) {  
      setCreateDropRequestStatus("empty");
      return;
    }

    setCreateDropRequestStatus("creating");
    setUploadProgress(0);

    try {
      shouldCleanupRef.current = false;

      const validationResult = await validateIdentifier(identifier);
      if (!validationResult.valid) {
        await handleKeyGeneration();
        return;
      }

      const createDropRequestResult = await sendCreateDropRequest(
        textContent,
        codeContent,
        selectedLanguage,
        retention,
        identifier,
        systemSecret,
        userSecret,
      );

      try {
        await markKeyAsUsed(identifier, createDropRequestResult.ttlSeconds);
        shouldCleanupRef.current = false;
      } catch (error) {
        setCreateDropRequestStatus("error");
        shouldCleanupRef.current = false;
        await handleReleaseIdentifier();
        throw error;
      }

      if (createDropRequestResult.status === 429) {
        setCreateDropRequestStatus("rateLimited");
        shouldCleanupRef.current = false;
        await handleReleaseIdentifier();
        return;
      }

      if (
        !createDropRequestResult.success ||
        createDropRequestResult.status === 400 ||
        createDropRequestResult.status === 500
      ) {
        setCreateDropRequestStatus("error");
        shouldCleanupRef.current = false;
        await handleReleaseIdentifier();
        return;
      }

      if (createDropRequestResult.success) {
        setCreateDropRequestStatus("success");
        shouldCleanupRef.current = false;
        handleClearContent();
      } else {
        setCreateDropRequestStatus("error");
        shouldCleanupRef.current = false;
        await handleReleaseIdentifier();
      }
    } catch (error) {
      setCreateDropRequestStatus("error");
      shouldCleanupRef.current = false;
      await handleReleaseIdentifier();
      throw error;
    }
  }, [
    textContent,
    codeContent,
    selectedLanguage,
    handleClearContent,
    identifier,
    systemSecret,
    userSecret,
    retention,
    handleReleaseIdentifier,
    handleKeyGeneration,
  ]);

  // COPY TO CLIPBOARD HANDLER
  const handleCopy = async () => {
    if (!identifier || !systemSecret || !userSecret) return;

    try {
      await navigator.clipboard.writeText(
        `${identifier}-${systemSecret}-${userSecret}`
      );
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      handleCopy();
    }
  };

  // VALIDATE IDENTIFIER HANDLER
  const validateCurrentIdentifier = React.useCallback(async () => {
    if (!identifier) return;

    try {
      const result = await validateIdentifier(identifier);

      if (!result.valid && result.expired) {
        await handleKeyGeneration();
      }
    } catch (error) {
      throw error;
    }
  }, [identifier, handleKeyGeneration]);

  // GENERATE INITIAL IDENTIFIER
  React.useEffect(() => {
    if (!identifier && !systemSecret && !isLoadingKeys) {
      handleKeyGeneration();
    }
  }, [identifier, systemSecret, isLoadingKeys, handleKeyGeneration]);

  // SET UP VALIDATION INTERVAL TO CHECK IDENTIFIER EXPIRY
  React.useEffect(() => {
    if (identifier && identifierExpiryRef.current) {
      validationIntervalRef.current = setInterval(() => {
        const now = Date.now();
        const timeLeft = identifierExpiryRef.current! - now;

        if (timeLeft < 30000) {
          // 30 seconds
          validateCurrentIdentifier();
        }
      }, 15000); // 15 seconds

      return () => {
        if (validationIntervalRef.current) {
          clearInterval(validationIntervalRef.current);
        }
      };
    }
  }, [identifier, validateCurrentIdentifier]);

  // CLEANUP ON UNMOUNT
  React.useEffect(() => {
    return () => {
      if (shouldCleanupRef.current && identifier) {
        handleReleaseIdentifier();
      }
      if (validationIntervalRef.current) {
        clearInterval(validationIntervalRef.current);
      }
    };
    // Only run on mount/unmount, not on every state change
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    dropData,
    setTextContent,
    setCodeContent,
    setSelectedLanguage,

    autoDetectLanguage,
    setAutoDetectLanguage,

    identifier,
    setIdentifier,
    systemSecret,
    setSystemSecret,
    userSecret,
    setUserSecret,
    isLoadingKeys,

    handleKeyGeneration,

    handleCreateDrop,

    setCreateDropRequestStatus,
    createDropRequestStatus,

    handleDialogClose,
    handleDialogBoxOpenChange,

    handleClearContent,

    copied,
    handleCopy,

    setRetention,
    retention,

    fullKeyVisible,
    setFullKeyVisible,

    uploadProgress,
  };
}
