"use client";

import React from "react";
import { Copy, Download, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useOpenDrop } from "@/contexts/OpenDropContext";

export const DropActionBarOptions = React.memo(() => {
    const {
        showCopyButton,
        showDownloadButton,
        isCopied,
        onCopy,
        onDownloadAll,
        decryptedDrop,
        selectedContentType,
    } = useOpenDrop();

    const iconSize = "clamp(0.75rem, 1.2vw, 1rem)";
    const textSize = "clamp(0.7rem, 1.4vw, 0.95rem)";
    const paddingY = "clamp(0.3rem, 0.8vw, 0.45rem)";
    const paddingX = "clamp(0.5rem, 1.2vw, 0.75rem)";
    const gap = "clamp(0.25rem, 0.8vw, 0.4rem)";

    return (
        <>
            {selectedContentType === "code" && decryptedDrop.decryptedLanguage && (
                <Badge
                    variant="secondary"
                    style={{ fontSize: textSize, padding: `${paddingY} ${paddingX}` }}
                    className="rounded-lg"
                >
                    {decryptedDrop.decryptedLanguage}
                </Badge>
            )}

            {showCopyButton && (
                <Button
                    variant="outline"
                    size="sm"
                    onClick={onCopy}
                    style={{
                        fontSize: textSize,
                        padding: `${paddingY} ${paddingX}`,
                        gap,
                    }}
                    className="rounded-xl hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-all cursor-pointer"
                >
                    {isCopied ? (
                        <>
                            <Check style={{ width: iconSize, height: iconSize }} />
                            <span>Copied</span>
                        </>
                    ) : (
                        <>
                            <Copy style={{ width: iconSize, height: iconSize }} />
                            <span>Copy</span>
                        </>
                    )}
                </Button>
            )}

            {showDownloadButton && (
                <Button
                    onClick={onDownloadAll}
                    size="sm"
                    variant="outline"
                    style={{
                        fontSize: textSize,
                        padding: `${paddingY} ${paddingX}`,
                        gap,
                    }}
                    className="rounded-xl hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-all cursor-pointer"
                >
                    <Download style={{ width: iconSize, height: iconSize }} />
                    <span>Download all</span>
                </Button>
            )}
        </>
    );
});

DropActionBarOptions.displayName = "DropActionBarOptions";
