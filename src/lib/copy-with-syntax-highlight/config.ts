/**
 * CONFIGURATION FOR COPYWITHSYNTAXHIGHLIGHT UTILITY
 */

import "prismjs";
import "prismjs/components/prism-javascript";
import "prismjs/components/prism-typescript";
import "prismjs/components/prism-jsx";
import "prismjs/components/prism-tsx";
import "prismjs/components/prism-python";
import "prismjs/components/prism-java";
import "prismjs/components/prism-c";
import "prismjs/components/prism-cpp";
import "prismjs/components/prism-csharp";
import "prismjs/components/prism-php";
import "prismjs/components/prism-ruby";
import "prismjs/components/prism-go";
import "prismjs/components/prism-rust";
import "prismjs/components/prism-swift";
import "prismjs/components/prism-kotlin";
import "prismjs/components/prism-sql";
import "prismjs/components/prism-json";
import "prismjs/components/prism-yaml";
import "prismjs/components/prism-markdown";
import "prismjs/components/prism-bash";
import "prismjs/components/prism-css";
import "prismjs/components/prism-scss";
import "prismjs/components/prism-markup"; // HTML, XML, SVG

/**
 * DARK THEME COLORS
 */
export const DARK_THEME_COLORS: Record<string, string> = {
  comment: "#7C7C7C",
  prolog: "#7C7C7C",
  doctype: "#7C7C7C",
  cdata: "#7C7C7C",
  punctuation: "#ABB2BF",
  property: "#E06C75",
  tag: "#E06C75",
  boolean: "#D19A66",
  number: "#D19A66",
  constant: "#D19A66",
  symbol: "#61AFEF",
  deleted: "#E06C75",
  selector: "#98C379",
  "attr-name": "#D19A66",
  string: "#98C379",
  char: "#98C379",
  builtin: "#E5C07B",
  inserted: "#98C379",
  operator: "#56B6C2",
  entity: "#56B6C2",
  url: "#56B6C2",
  variable: "#E06C75",
  atrule: "#C678DD",
  "attr-value": "#98C379",
  function: "#61AFEF",
  "class-name": "#E5C07B",
  keyword: "#C678DD",
  regex: "#98C379",
  important: "#C678DD",
  bold: "#E5C07B",
  italic: "#C678DD",
};

/**
 * LIGHT THEME COLORS
 */
export const LIGHT_THEME_COLORS: Record<string, string> = {
  comment: "#6A737D",
  prolog: "#6A737D",
  doctype: "#6A737D",
  cdata: "#6A737D",
  punctuation: "#24292E",
  property: "#D73A49",
  tag: "#22863A",
  boolean: "#005CC5",
  number: "#005CC5",
  constant: "#005CC5",
  symbol: "#6F42C1",
  deleted: "#B31D28",
  selector: "#22863A",
  "attr-name": "#6F42C1",
  string: "#032F62",
  char: "#032F62",
  builtin: "#6F42C1",
  inserted: "#22863A",
  operator: "#D73A49",
  entity: "#6F42C1",
  url: "#032F62",
  variable: "#E36209",
  atrule: "#D73A49",
  "attr-value": "#032F62",
  function: "#6F42C1",
  "class-name": "#6F42C1",
  keyword: "#D73A49",
  regex: "#032F62",
  important: "#D73A49",
  bold: "#24292E",
  italic: "#24292E",
};

/**
 * MAP LANGUAGE ALIASES TO PRISM LANGUAGE NAMES
 */
export const LANGUAGE_MAP: Record<string, string> = {
  js: "javascript",
  ts: "typescript",
  py: "python",
  rb: "ruby",
  sh: "bash",
  yml: "yaml",
  json: "json",
  md: "markdown",
  cs: "csharp",
  c: "c",
  "c++": "cpp",
  cpp: "cpp",
  rs: "rust",
  kt: "kotlin",
  html: "markup",
  xml: "markup",
  svg: "markup",
  plaintext: "plain",
};

/**
 * DEFAULT TEXT COLOR
 */
export const DEFAULT_TEXT_COLOR = "#24292E";
