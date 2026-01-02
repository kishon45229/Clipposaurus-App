import React from "react";
import {
  countChars,
  truncateToChars,
} from "../components/custom/create-drop/tab/text-tab/textTabUtils";
import { MAX_CHARS } from "@/components/custom/create-drop/tab/text-tab/textTabConfig";

interface UseTextOptions {
  textContent: string;
  setTextContent: React.Dispatch<React.SetStateAction<string>>;
}

interface UseTextReturn {
  charCount: number;
  atCharLimit: boolean;
  MAX_CHARS: number;
  handleTextChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  handleTextPaste: (e: React.ClipboardEvent<HTMLTextAreaElement>) => void;
  clearTextContent: () => void;
}

export function useText(options: UseTextOptions): UseTextReturn {
  const { textContent, setTextContent } = options;

  const charCount = React.useMemo(() => countChars(textContent), [textContent]);
  const atCharLimit = React.useMemo(() => charCount >= MAX_CHARS, [charCount]);

  const handleTextChange = React.useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      const value = e.target.value;
      const chars = countChars(value);
      if (chars > MAX_CHARS) {
        const truncated = truncateToChars(value, MAX_CHARS);
        setTextContent(truncated);
      } else {
        setTextContent(value);
      }
    },
    [setTextContent]
  );

  const handleTextPaste = React.useCallback(
    (e: React.ClipboardEvent<HTMLTextAreaElement>) => {
      const value = e.clipboardData.getData("note");
      setTextContent((prev) => prev + value);
    },
    [setTextContent]
  );

  const clearTextContent = React.useCallback(() => {
    setTextContent("");
  }, [setTextContent]);

  return {
    charCount,
    atCharLimit,
    MAX_CHARS,
    handleTextChange,
    handleTextPaste,
    clearTextContent
  };
}
