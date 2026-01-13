export const CODE_EDITOR_CONSTANTS = {
  PADDING: "12px",
  FONT_SIZE: "14px",
  LINE_HEIGHT: "24px",
  FONT_FAMILY:
    'ui-monospace, SFMono-Regular, "SF Mono", Consolas, "Liberation Mono", Menlo, monospace',
  TAB_SIZE: 4,
  Z_INDEX: {
    TEXTAREA: 10,
    SYNTAX_HIGHLIGHTER: 1,
  },
} as const;

export const CODE_EDITOR_STYLES = {
  base: {
    padding: CODE_EDITOR_CONSTANTS.PADDING,
    fontSize: CODE_EDITOR_CONSTANTS.FONT_SIZE,
    lineHeight: CODE_EDITOR_CONSTANTS.LINE_HEIGHT,
    fontFamily: CODE_EDITOR_CONSTANTS.FONT_FAMILY,
    tabSize: CODE_EDITOR_CONSTANTS.TAB_SIZE,
  },

  syntaxHighlighter: {
    margin: 0,
    padding: CODE_EDITOR_CONSTANTS.PADDING,
    backgroundColor: "transparent",
    whiteSpace: "pre" as const,
    overflow: "visible",
    height: "100%",
    fontSize: CODE_EDITOR_CONSTANTS.FONT_SIZE,
    lineHeight: CODE_EDITOR_CONSTANTS.LINE_HEIGHT,
    fontFamily: CODE_EDITOR_CONSTANTS.FONT_FAMILY,
  },

  codeTag: {
    padding: 0,
    background: "transparent",
    fontFamily: "inherit",
  },

  placeholder: {
    fontSize: CODE_EDITOR_CONSTANTS.FONT_SIZE,
    lineHeight: CODE_EDITOR_CONSTANTS.LINE_HEIGHT,
    fontFamily: CODE_EDITOR_CONSTANTS.FONT_FAMILY,
  },
} as const;
