"use client";

import React from "react";
import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useOpenDrop } from "@/contexts/OpenDropContext";
import { formatFileSize } from "@/lib/openDropUtils";

export const DropFilesContent: React.FC = React.memo(() => {
    const { decryptedDrop, selectedContentType, handleDownload } = useOpenDrop();
    const dropKey = decryptedDrop.dropKey || decryptedDrop.identifier;

    if (selectedContentType !== "files" || !Array.isArray(decryptedDrop.decryptedFiles)) {
        return null;
    }

    return (
        <div className="absolute inset-0 flex flex-col p-4 overflow-y-auto space-y-2">
            {decryptedDrop.decryptedFiles.map((file) => (
                <div
                    key={file.id}
                    className="flex items-center justify-between p-4 border border-zinc-200/50 dark:border-zinc-700/60 rounded-2xl 
                               bg-gradient-to-br from-zinc-50 to-zinc-100 dark:from-emerald-950/10 dark:to-emerald-900/10 
                               transition-colors"
                >
                    <div className="flex-1 min-w-0">
                        <div className="font-medium truncate text-zinc-900 dark:text-zinc-100 text-[clamp(0.875rem,2.5vw,1rem)]">
                            {file.name}
                        </div>
                        <div className="text-zinc-500 dark:text-zinc-400 text-[clamp(0.75rem,2vw,0.875rem)]">
                            {formatFileSize(file.size)}
                        </div>
                    </div>
                    <Button
                        onClick={() => handleDownload(file.url, file.name, dropKey)}
                        className="flex items-center gap-1 bg-emerald-500 text-zinc-50 font-semibold rounded-2xl 
                                   hover:scale-[1.02] shadow-lg shadow-emerald-600/30 transition-all duration-300 
                                   hover:-translate-y-1 hover:shadow-xl disabled:opacity-70 px-3 py-2"
                    >
                        <Download className="size-3.5" />
                        <span className="hidden sm:block text-[clamp(0.75rem,1.5vw,0.875rem)]">Download</span>
                    </Button>
                </div>
            ))}
        </div>
    );
});

DropFilesContent.displayName = "DropFilesContent";
