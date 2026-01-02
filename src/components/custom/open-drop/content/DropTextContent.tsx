"use client";

import React from "react";
import { useOpenDrop } from "@/contexts/OpenDropContext";

export const DropTextContent: React.FC = React.memo(() => {
    const { decryptedDrop, selectedContentType } = useOpenDrop();

    if (selectedContentType !== "note" || typeof decryptedDrop.decryptedText !== "string") {
        return null;
    }

    return (
        <div className="absolute inset-0 flex flex-col p-[clamp(0.5rem,2vw,1rem)]">
            <pre className="flex-1 overflow-y-auto whitespace-pre-wrap font-mono 
                            text-[clamp(0.875rem,2vw,1rem)] text-zinc-800 dark:text-zinc-200 
                            leading-relaxed">
                {decryptedDrop.decryptedText}
            </pre>
        </div>
    );
});

DropTextContent.displayName = "DropTextContent";
