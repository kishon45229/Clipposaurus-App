import type Prism from "prismjs";
import { getColorForType, escapeHtml, escapeRTF, hexToRTFColor } from "./utils";

/**
 * Convert Prism tokens to HTML with inline styles (Word-compatible)
 */
export function tokensToHTML(
  tokens: (string | Prism.Token)[],
  colorMap: Record<string, string>
): string {
  let html = "";

  const processToken = (token: string | Prism.Token): string => {
    if (typeof token === "string") {
      return escapeHtml(token);
    }

    const color = getColorForType(token.type, colorMap);

    let content: string;
    if (typeof token.content === "string") {
      content = escapeHtml(token.content);
    } else if (Array.isArray(token.content)) {
      content = token.content.map(processToken).join("");
    } else {
      content = processToken(token.content as string | Prism.Token);
    }

    // Use font tags for better Word compatibility
    if (color) {
      return `<font color="${color}">${content}</font>`;
    }
    return content;
  };

  for (const token of tokens) {
    html += processToken(token);
  }

  return html;
}

/**
 * Convert Prism tokens to RTF format (like Notepad++)
 */
export function tokensToRTF(
  tokens: (string | Prism.Token)[],
  colorMap: Record<string, string>,
  textColor: string
): string {
  // Build color table (no background color)
  const colorSet = new Set([textColor]);
  const tokenColors = new Set<string>();

  // Collect all colors from tokens
  const collectColors = (token: string | Prism.Token) => {
    if (typeof token === "string") return;

    const color = getColorForType(token.type, colorMap);
    if (color) tokenColors.add(color);

    if (Array.isArray(token.content)) {
      token.content.forEach(collectColors);
    } else if (typeof token.content === "object") {
      collectColors(token.content as Prism.Token);
    }
  };

  tokens.forEach(collectColors);
  tokenColors.forEach((color) => colorSet.add(color));

  // Create color table
  const colorArray = Array.from(colorSet);
  const colorTable = colorArray.map(hexToRTFColor).join("");

  // Process tokens to RTF
  let rtfContent = "";

  const processToken = (token: string | Prism.Token): string => {
    if (typeof token === "string") {
      return escapeRTF(token);
    }

    const color = getColorForType(token.type, colorMap);
    const colorIndex = color
      ? colorArray.indexOf(color)
      : colorArray.indexOf(textColor);

    let content: string;
    if (typeof token.content === "string") {
      content = escapeRTF(token.content);
    } else if (Array.isArray(token.content)) {
      content = token.content.map(processToken).join("");
    } else {
      content = processToken(token.content as string | Prism.Token);
    }

    return `\\cf${colorIndex}${content}`;
  };

  for (const token of tokens) {
    rtfContent += processToken(token);
  }

  // RTF document structure (no background color)
  const textColorIndex = colorArray.indexOf(textColor);

  return `{\\rtf1\\ansi\\deff0 {\\fonttbl {\\f0 Consolas;}{\\f1 Monaco;}{\\f2 Courier New;}} {\\colortbl;${colorTable}} \\f0\\fs28\\cf${textColorIndex} ${rtfContent}}`;
}
