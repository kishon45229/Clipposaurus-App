export function detectLanguageFromContent(content: string): string {
  if (!content.trim()) return "plaintext";

  const code = content.trim();

  if (
    (code.startsWith("{") && code.endsWith("}")) ||
    (code.startsWith("[") && code.endsWith("]"))
  ) {
    try {
      JSON.parse(code);
      return "json";
    } catch {
      // Not valid JSON, continue with other checks
    }
  }

  // HTML detection
  if (/<\/?[a-z][\s\S]*>/i.test(code) || code.includes("<!DOCTYPE")) {
    return "html";
  }

  // XML detection
  if (code.startsWith("<?xml") || (code.includes("<") && code.includes(">"))) {
    return "xml";
  }

  // CSS detection
  if (
    /[.#][\w-]+\s*\{[\s\S]*\}/.test(code) ||
    code.includes("@media") ||
    code.includes("@import")
  ) {
    return "css";
  }

  // SQL detection
  if (/\b(SELECT|INSERT|UPDATE|DELETE|CREATE|ALTER|DROP)\b/i.test(code)) {
    return "sql";
  }

  // Bash/Shell detection
  if (
    code.startsWith("#!/bin/bash") ||
    code.startsWith("#!/bin/sh") ||
    /\b(echo|grep|sed|awk|ls|cd|mkdir)\b/.test(code)
  ) {
    return "bash";
  }

  // Python detection
  if (
    /\b(def|class|import|from|if __name__|print\(|\.py\b)/i.test(code) ||
    code.includes("import ") ||
    code.includes("from ") ||
    /^\s*(def|class)\s+\w+/.test(code)
  ) {
    return "python";
  }

  // Rust detection
  if (
    /\b(fn|let\s+mut|impl|trait|struct|enum|pub|use|match)\b/.test(code) ||
    /println!|unwrap\(|Result<|Option<|&str|&mut/.test(code) ||
    code.includes("::")
  ) {
    return "rust";
  }

  // JSX/TSX detection (before JavaScript/TypeScript)
  const hasJsxSyntax = /<[A-Z][\w.]*[^>]*>|<\/[A-Z][\w.]*>|<>|<\/>/.test(code);

  if (hasJsxSyntax) {
    // Check for TypeScript specific patterns for TSX
    if (
      /\b(interface|type|enum)\s+\w+|:\s*\w+(\[\])?(\s*=|\s*;|\s*,)|\w+\s*:\s*(string|number|boolean|any|React\.)/.test(
        code
      )
    ) {
      return "tsx";
    }
    return "jsx";
  }

  // JavaScript/TypeScript detection
  if (
    /\b(function|const|let|var|=>\s*{|console\.log|require\(|import\s+.*from)\b/.test(
      code
    )
  ) {
    // Check for TypeScript specific patterns
    if (
      /\b(interface|type|enum)\s+\w+|:\s*\w+(\[\])?(\s*=|\s*;|\s*,)|\w+\s*:\s*(string|number|boolean|any)/.test(
        code
      )
    ) {
      return "typescript";
    }
    return "javascript";
  }

  // Java detection
  if (
    /\b(public|private|protected)\s+(static\s+)?(void|int|String|boolean)|class\s+\w+\s*{|import\s+java\./.test(
      code
    )
  ) {
    return "java";
  }

  // C# detection
  if (
    /\b(using\s+System|namespace\s+\w+|public\s+(static\s+)?void\s+Main|Console\.WriteLine)\b/.test(
      code
    )
  ) {
    return "csharp";
  }

  // C++ detection
  if (
    /#include\s*<.*>|std::|cout\s*<<|cin\s*>>|\busing\s+namespace\s+std\b/.test(
      code
    )
  ) {
    return "cpp";
  }

  // Ruby detection
  if (/\b(def|class|module|end|puts|require)\b|#.*ruby/.test(code)) {
    return "ruby";
  }

  // Go detection
  if (/\b(package|import|func|var|type|fmt\.Print)\b|\.go\b/.test(code)) {
    return "go";
  }

  // PHP detection
  if (
    code.startsWith("<?php") ||
    /\$\w+|echo\s+|print\s+|\bfunction\s+\w+\s*\(/.test(code)
  ) {
    return "php";
  }

  // Swift detection
  if (
    /\b(import\s+Foundation|var|let|func|class|struct)\s+\w+|Swift/.test(code)
  ) {
    return "swift";
  }

  // Kotlin detection
  if (
    /\b(fun|val|var)\s+\w+|import\s+kotlin\.|package\s+|data\s+class/.test(code)
  ) {
    return "kotlin";
  }

  // Dart detection
  if (
    /\b(void\s+main\(|import\s+['"]dart:|class\s+\w+\s+extends\s+(StatelessWidget|StatefulWidget)|Widget)\b/.test(
      code
    )
  ) {
    return "dart";
  }

  // Scala detection
  if (
    /\b(object|trait|val|def)\s+\w+|import\s+scala\.|extends\s+|case\s+class/.test(
      code
    )
  ) {
    return "scala";
  }

  // R detection
  if (
    /<-|\blibrary\(|\bfunction\(.*\)\s*{|\bc\(|\bdata\.frame|ggplot/.test(code)
  ) {
    return "r";
  }

  // Perl detection
  if (
    /^\s*#!.*perl|\buse\s+strict|\bmy\s+[$@%]|\$\w+\s*=|sub\s+\w+\s*{/.test(
      code
    )
  ) {
    return "perl";
  }

  // Lua detection
  if (/\b(local|function)\s+\w+|\bend\b|require\s*["'(]|\.\.\s/.test(code)) {
    return "lua";
  }

  // YAML detection
  if (
    /^[\w-]+:\s*[^{}[\]]*$/m.test(code) &&
    !code.includes("{") &&
    (code.includes(":\n") || /^\s*-\s+/m.test(code))
  ) {
    return "yaml";
  }

  // Markdown detection
  if (
    /^#{1,6}\s+.+$/m.test(code) ||
    /\[.+\]\(.+\)/.test(code) ||
    /```[\w]*/.test(code) ||
    /^[*-]\s+.+$/m.test(code)
  ) {
    return "markdown";
  }

  // Dockerfile detection
  if (
    /^\s*(FROM|RUN|CMD|COPY|ADD|ENTRYPOINT|ENV|WORKDIR|EXPOSE)\s+/im.test(code)
  ) {
    return "dockerfile";
  }

  // Default to plaintext if no language detected
  return "plaintext";
}

// Language mapping for react-syntax-highlighter
export const languageMap: Record<string, string> = {
  javascript: "javascript",
  typescript: "typescript",
  jsx: "jsx",
  tsx: "tsx",
  python: "python",
  java: "java",
  csharp: "csharp",
  cpp: "cpp",
  rust: "rust",
  ruby: "ruby",
  go: "go",
  php: "php",
  swift: "swift",
  kotlin: "kotlin",
  dart: "dart",
  scala: "scala",
  r: "r",
  perl: "perl",
  lua: "lua",
  html: "html",
  css: "css",
  json: "json",
  xml: "xml",
  yaml: "yaml",
  markdown: "markdown",
  sql: "sql",
  bash: "bash",
  dockerfile: "dockerfile",
  plaintext: "text",
};
