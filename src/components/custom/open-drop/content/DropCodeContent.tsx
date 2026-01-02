"use client";

import React from "react";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark, oneLight } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { useTheme } from 'next-themes';
import { useOpenDrop } from "@/contexts/OpenDropContext";

export const DropCodeContent: React.FC = React.memo(() => {
    const { decryptedDrop, selectedContentType } = useOpenDrop();
    const { theme } = useTheme();

    if (selectedContentType !== "code" || typeof decryptedDrop.decryptedCode !== "string") {
        return null;
    }

    return (
        <div className="absolute inset-0 flex flex-col shadow-inner backdrop-blur-sm overflow-y-auto">
            <SyntaxHighlighter
                language={decryptedDrop.decryptedLanguage ?? 'plaintext'}
                style={theme === 'dark' ? oneDark : oneLight}
                customStyle={{
                    margin: 0,
                    fontSize: 'clamp(0.875rem, 1.5vw, 1rem)',
                    lineHeight: 1.5,
                    padding: 'clamp(1rem, 2vw, 1.5rem)',
                    background: 'transparent',
                    overflow: 'visible',
                }}
                codeTagProps={{
                    style: {
                        userSelect: 'none',
                        pointerEvents: 'none',
                    },
                }}
                showLineNumbers={true}
                wrapLines={false}
            >
                {decryptedDrop.decryptedCode}
            </SyntaxHighlighter>
        </div>
    );
});

DropCodeContent.displayName = "DropCodeContent";
