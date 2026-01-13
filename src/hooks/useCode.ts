import React from "react";
import { detectLanguageFromContent } from "@/lib/languageDetection";
import { MAX_LINES as DEFAULT_MAX_LINES } from "@/components/create-drop/tab/code-tab/config";

interface Props {
  codeContent: string;
  setCodeContent: React.Dispatch<React.SetStateAction<string>>;
  selectedLanguage: string;
  setSelectedLanguage: React.Dispatch<React.SetStateAction<string>>;
  autoDetectLanguage: boolean;
  setAutoDetectLanguage: React.Dispatch<React.SetStateAction<boolean>>;
}

interface ReturnProps {
  lineCount: number;
  atCodeLineLimit: boolean;
  handleCodeChange: (value: string) => void;
  handleLanguageChange: (language: string) => void;
  handleCodePaste: (e: React.ClipboardEvent<HTMLTextAreaElement>) => void;
  leftLineNumbersRef: React.RefObject<HTMLDivElement | null>;
  handleScroll: (scrollTop: number) => void;
  clearCodeContent: () => void;
}

export default function useCode(
  options: Props,
  MAX_LINES: number = DEFAULT_MAX_LINES
): ReturnProps {
  const {
    codeContent,
    setCodeContent,
    selectedLanguage,
    setSelectedLanguage,
    autoDetectLanguage,
    setAutoDetectLanguage,
  } = options;

  const leftLineNumbersRef = React.useRef<HTMLDivElement>(null);

  const lineCount = React.useMemo(() => {
    const lines = codeContent.split("\n");
    return Math.max(lines.length, 1);
  }, [codeContent]);

  const atCodeLineLimit = React.useMemo(
    () => lineCount >= MAX_LINES,
    [lineCount, MAX_LINES]
  );

  React.useEffect(() => {
    if (!autoDetectLanguage || !codeContent.trim()) {
      return;
    }

    const timeoutId = setTimeout(() => {
      const detectedLang = detectLanguageFromContent(codeContent);
      if (detectedLang !== selectedLanguage) {
        setSelectedLanguage(detectedLang);
      }
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [codeContent, autoDetectLanguage, selectedLanguage, setSelectedLanguage]);

  const handleLanguageChange = React.useCallback(
    (language: string) => {
      setSelectedLanguage(language);
      setAutoDetectLanguage(false);
    },
    [setSelectedLanguage, setAutoDetectLanguage]
  );

  const handleCodeChange = React.useCallback(
    (value: string) => {
      const lines = value.split("\n");
      if (lines.length > MAX_LINES) {
        const truncatedContent = lines.slice(0, MAX_LINES).join("\n");
        setCodeContent(truncatedContent);
        return;
      }

      setCodeContent(value);

      if (!autoDetectLanguage && value.trim()) {
        setAutoDetectLanguage(true);
      }
    },
    [setCodeContent, autoDetectLanguage, setAutoDetectLanguage, MAX_LINES]
  );

  const handleCodePaste = React.useCallback(
    (e: React.ClipboardEvent<HTMLTextAreaElement>) => {
      const pastedText = e.clipboardData.getData("note");
      setCodeContent((prev) => prev + pastedText);
      setAutoDetectLanguage(true);
    },
    [setCodeContent, setAutoDetectLanguage]
  );

  const handleScroll = React.useCallback((scrollTop: number) => {
    if (leftLineNumbersRef.current) {
      leftLineNumbersRef.current.scrollTop = scrollTop;
    }
  }, []);

  // Additional helper function
  const clearCodeContent = React.useCallback(() => {
    setCodeContent("");
  }, [setCodeContent]);

  return {
    leftLineNumbersRef,
    lineCount,
    atCodeLineLimit,
    handleCodeChange,
    handleLanguageChange,
    handleCodePaste,
    handleScroll,
    clearCodeContent,
  };
}
