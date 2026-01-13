import React, { useRef, useCallback, useMemo, useEffect } from "react";
import { useTheme } from "next-themes";
import {
  getSyntaxHighlighterLanguage,
  getSyntaxHighlighterStyle,
} from "../components/create-drop/tab/code-tab/utils";

interface UseCodeEditorOptions {
  value: string;
  onChange: (value: string) => void;
  onScroll: (e: React.UIEvent<HTMLTextAreaElement>) => void;
  language: string;
  maxLength?: number;
}

interface UseCodeEditorReturn {
  // Refs
  textareaRef: React.RefObject<HTMLTextAreaElement | null>;
  highlighterRef: React.RefObject<HTMLDivElement | null>;

  // Syntax highlighting config
  syntaxHighlighterLanguage: string;
  syntaxHighlighterStyle: { [key: string]: React.CSSProperties };

  // Event handlers
  handleChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  handleScroll: (e: React.UIEvent<HTMLTextAreaElement>) => void;
}

export function useCodeEditor(
  options: UseCodeEditorOptions
): UseCodeEditorReturn {
  const { value, onChange, onScroll, language, maxLength } = options;
  const { theme } = useTheme();

  // Refs
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const highlighterRef = useRef<HTMLDivElement>(null);

  // Syntax highlighting configuration
  const syntaxHighlighterLanguage = useMemo(
    () => getSyntaxHighlighterLanguage(language),
    [language]
  );

  const syntaxHighlighterStyle = useMemo(
    () => getSyntaxHighlighterStyle(theme),
    [theme]
  );

  // Synchronize scroll position on content change or initialization
  useEffect(() => {
    if (textareaRef.current && highlighterRef.current) {
      const { scrollTop, scrollLeft } = textareaRef.current;
      highlighterRef.current.style.transform = `translate(-${scrollLeft}px, -${scrollTop}px)`;
    }
  }, [value]);

  // Text change handler with maxLength validation
  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      const newValue = e.target.value;

      if (maxLength && newValue.length > maxLength) {
        return;
      }

      onChange(newValue);
    },
    [onChange, maxLength]
  );

  // Scroll synchronization handler
  const handleScroll = useCallback(
    (e: React.UIEvent<HTMLTextAreaElement>) => {
      if (highlighterRef.current) {
        const { scrollTop, scrollLeft } = e.currentTarget;
        // Use transform with requestAnimationFrame for smoother sync
        requestAnimationFrame(() => {
          if (highlighterRef.current) {
            highlighterRef.current.style.transform = `translate(-${scrollLeft}px, -${scrollTop}px)`;
          }
        });
      }
      onScroll(e);
    },
    [onScroll]
  );

  return {
    textareaRef,
    highlighterRef,
    syntaxHighlighterLanguage,
    syntaxHighlighterStyle,
    handleChange,
    handleScroll,
  };
}
