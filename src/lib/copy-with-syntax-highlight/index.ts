import { LIGHT_THEME_COLORS, DEFAULT_TEXT_COLOR } from "./config";
import { tokenizeCode } from "./tokenizer";
import { tokensToHTML, tokensToRTF } from "./formats";

/**
 * COPY CODE WITH SYNTAX HIGHLIGHTING
 */
export async function copyCodeWithSyntaxHighlight(
  code: string,
  language: string = "plaintext",
): Promise<boolean> {
  try {
    const tokenArray = tokenizeCode(code, language);
    if (!tokenArray) {
      return await copyPlainText(code);
    }

    const colorMap = LIGHT_THEME_COLORS;
    const textColor = DEFAULT_TEXT_COLOR; 

    const rtfContent = tokensToRTF(tokenArray, colorMap, textColor);

    const highlightedHTML = tokensToHTML(tokenArray, colorMap);
    const htmlContent = `<pre style="margin: 0; white-space: pre-wrap; color: ${textColor}; font-family: Consolas, Monaco, 'Courier New', monospace; font-size: 14px; line-height: 1.6;">${highlightedHTML}</pre>`;

    const clipboardItem = new ClipboardItem({
      "text/plain": new Blob([code], { type: "text/plain" }),
      "text/html": new Blob([htmlContent], { type: "text/html" }),
      "text/rtf": new Blob([rtfContent], { type: "text/rtf" }),
    });

    await navigator.clipboard.write([clipboardItem]);
    return true;
  } catch {
    return await copyPlainText(code);
  }
}

/**
 * COPY PLAIN TEXT TO CLIPBOARD (FALLBACK METHOD)
 */
async function copyPlainText(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    return false;
  }
}
