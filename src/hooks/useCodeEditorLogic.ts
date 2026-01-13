import { useRef, useCallback, useEffect, useMemo } from "react";
import { useCodeTab } from "@/contexts/CodeTabContext";
import {
  getSyntaxHighlighterLanguage,
  getSyntaxHighlighterStyle,
} from "@/components/create-drop/tab/code-tab/utils";
import { useTheme } from "next-themes";

interface UseCodeEditorProps {
  disabled?: boolean;
  maxLength?: number;
  onScroll?: (scrollTop: number) => void;
}

export const useCodeEditorLogic = ({
  disabled = false,
  maxLength,
  onScroll,
}: UseCodeEditorProps) => {
  const { codeContent, selectedLanguage, handleCodeChange, handleCodePaste } =
    useCodeTab();
  const { theme } = useTheme();
  const editorRef = useRef<HTMLDivElement>(null);
  const hiddenTextareaRef = useRef<HTMLTextAreaElement>(null);

  // Get syntax highlighting configuration
  const syntaxHighlighterLanguage = useMemo(
    () => getSyntaxHighlighterLanguage(selectedLanguage),
    [selectedLanguage]
  );

  const syntaxHighlighterStyle = useMemo(
    () => getSyntaxHighlighterStyle(theme),
    [theme]
  );

  // Handle click to focus on textarea
  const handleEditorClick = useCallback(() => {
    if (hiddenTextareaRef.current && !disabled) {
      hiddenTextareaRef.current.focus();
    }
  }, [disabled]);

  // Handle textarea changes
  const handleTextareaChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      const newValue = e.target.value;

      if (maxLength && newValue.length > maxLength) {
        return;
      }

      handleCodeChange(newValue);
    },
    [handleCodeChange, maxLength]
  );

  // Handle textarea key events
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (e.key === "Tab") {
        e.preventDefault();
        const textarea = e.currentTarget;
        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        const value = textarea.value;

        // Insert tab (4 spaces) at cursor position
        const newValue =
          value.substring(0, start) + "    " + value.substring(end);
        handleCodeChange(newValue);

        // Set cursor position after the inserted tab
        setTimeout(() => {
          textarea.selectionStart = textarea.selectionEnd = start + 4;
        }, 0);
      }
    },
    [handleCodeChange]
  );

  // Sync textarea selection and scroll with visual display
  useEffect(() => {
    const textarea = hiddenTextareaRef.current;
    const editor = editorRef.current;

    if (!textarea || !editor) return;

    const handleScroll = () => {
      if (editor) {
        editor.scrollTop = textarea.scrollTop;
        editor.scrollLeft = textarea.scrollLeft;
      }
      // Notify parent about scroll changes
      if (onScroll) {
        onScroll(textarea.scrollTop);
      }
    };

    textarea.addEventListener("scroll", handleScroll);
    return () => textarea.removeEventListener("scroll", handleScroll);
  }, [onScroll]);

  // Style based on theme
  const editorStyle = useMemo(
    () => ({
      backgroundColor: theme === "dark" ? "#1a1a1a" : "#ffffff",
      color: theme === "dark" ? "#ffffff" : "#000000",
    }),
    [theme]
  );

  return {
    // Refs
    editorRef,
    hiddenTextareaRef,

    // Data
    codeContent,
    selectedLanguage,
    theme,

    // Syntax highlighting
    syntaxHighlighterLanguage,
    syntaxHighlighterStyle,

    // Handlers
    handleEditorClick,
    handleTextareaChange,
    handleCodePaste,
    handleKeyDown,

    // Styles
    editorStyle,
  };
};
