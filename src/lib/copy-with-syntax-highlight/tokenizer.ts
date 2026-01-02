import Prism from "prismjs";
import { LANGUAGE_MAP } from "./config";

/**
 * GET NORMALIZED LANGUAGE NAME
 */
export function normalizeLanguage(language: string): string {
  return LANGUAGE_MAP[language.toLowerCase()] || language.toLowerCase();
}

/**
 * GET PRISM GRAMMAR FOR A LANGUAGE
 */
export function getPrismGrammar(language: string) {
  const normalizedLanguage = normalizeLanguage(language);
  return (
    Prism.languages[normalizedLanguage] ||
    Prism.languages.plain ||
    Prism.languages.plaintext
  );
}

/**
 * TOKENIZE CODE USING PRISM
 */
export function tokenizeCode(code: string, language: string) {
  const grammar = getPrismGrammar(language);
  if (!grammar) {
    // fallback to plaintext
    return null;
  }
  return Prism.tokenize(code, grammar);
}
