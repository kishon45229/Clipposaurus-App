"use client";

import React from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { useCodeEditorLogic } from "@/hooks/useCodeEditorLogic";
import { CodePreTag } from "./CodePreTag";
import { CODE_EDITOR_STYLES } from "./constants";

interface Props {
    disabled?: boolean;
    maxLength?: number;
    onScroll?: (scrollTop: number) => void;
}

export const CodeEditor = React.memo(({ disabled = false, maxLength, onScroll }: Props) => {
    const {
        // Refs
        editorRef,
        hiddenTextareaRef,

        // Data
        codeContent,
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
    } = useCodeEditorLogic({ disabled, maxLength, onScroll });

    return (
        <div className="relative h-full min-h-0 overflow-hidden m-0 p-0 bg-transparent dark:bg-input/30">
            <div
                ref={editorRef}
                onClick={handleEditorClick}
                className="absolute inset-0 cursor-text font-mono text-sm leading-6 overflow-auto"
                style={{
                    ...editorStyle,
                    pointerEvents: disabled ? 'none' : 'auto'
                }}
            >
                <SyntaxHighlighter
                    language={syntaxHighlighterLanguage}
                    style={syntaxHighlighterStyle}
                    customStyle={CODE_EDITOR_STYLES.syntaxHighlighter}
                    codeTagProps={{
                        style: CODE_EDITOR_STYLES.codeTag
                    }}
                    PreTag={CodePreTag}
                    showLineNumbers={false}
                    wrapLines={false}
                >
                    {codeContent || ' '}
                </SyntaxHighlighter>

                {/* Placeholder when empty */}
                {!codeContent && (
                    <div
                        className="absolute top-3 left-3 text-muted-foreground pointer-events-none"
                        style={CODE_EDITOR_STYLES.placeholder}
                    >
                        Paste or type your code here...
                    </div>
                )}
            </div>

            {/* Hidden textarea for actual text input */}
            <textarea
                ref={hiddenTextareaRef}
                value={codeContent}
                onChange={handleTextareaChange}
                onPaste={handleCodePaste}
                onKeyDown={handleKeyDown}
                disabled={disabled}
                className="absolute inset-0 w-full h-full resize-none bg-transparent text-transparent caret-current outline-none overflow-auto"
                style={{
                    ...CODE_EDITOR_STYLES.base,
                    zIndex: 10,
                    caretColor: theme === 'dark' ? '#ffffff' : '#000000',
                    whiteSpace: 'pre',
                    overflowWrap: 'normal',
                    wordBreak: 'normal',
                }}
                spellCheck={false}
                autoComplete="off"
                autoCorrect="off"
                autoCapitalize="off"
                wrap="off"
                aria-label="Code editor"
            />
        </div>
    );
});

CodeEditor.displayName = 'CodeEditor';