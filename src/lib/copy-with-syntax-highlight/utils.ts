/**
 * GET COLOR FOR A TOKEN TYPE
 */
export function getColorForType(
  type: string | string[],
  colorMap: Record<string, string>
): string | null {
  if (Array.isArray(type)) {
    for (const t of type) {
      const color = colorMap[t];
      if (color) return color;
    }
    return null;
  }
  return colorMap[type] || null;
}

/**
 * ESCAPE HTML SPECIAL CHARACTERS
 */
export function escapeHtml(text: string): string {
  const map: Record<string, string> = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
  };
  return text.replace(/[&<>"']/g, (char) => map[char]);
}

/**
 * ESCAPE RTF SPECIAL CHARACTERS
 */
export function escapeRTF(text: string): string {
  return text
    .replace(/\\/g, "\\\\")
    .replace(/\{/g, "\\{")
    .replace(/\}/g, "\\}")
    .replace(/\n/g, "\\par\n")
    .replace(/\t/g, "\\tab ");
}

/**
 * CONVERT HEX COLOR TO RTF COLOR
 */
export function hexToRTFColor(hex: string): string {
  const r = parseInt(hex.substring(1, 3), 16);
  const g = parseInt(hex.substring(3, 5), 16);
  const b = parseInt(hex.substring(5, 7), 16);
  return `\\red${r}\\green${g}\\blue${b};`;
}
