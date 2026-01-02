import {
  oneDark,
  oneLight,
} from "react-syntax-highlighter/dist/esm/styles/prism";
import { languageMap } from "@/lib/languageDetection";

// Get syntax highlighter language mapping
export const getSyntaxHighlighterLanguage = (language: string): string => {
  return languageMap[language] || "text";
};

// Get syntax highlighter style based on theme
export const getSyntaxHighlighterStyle = (theme: string | undefined) => {
  return theme === "dark" ? oneDark : oneLight;
};
