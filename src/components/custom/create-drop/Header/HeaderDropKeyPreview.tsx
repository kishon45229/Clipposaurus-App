"use client";

import { useState } from "react";
import { useHeader } from "@/contexts/HeaderContext";
import { Eye, EyeOff } from "lucide-react";

export const HeaderDropKeyPreview = () => {
    const { data, identifier, systemSecret, userSecret } = useHeader();
    const [isVisible, setIsVisible] = useState(false);
    
    if (!data) return null;
    const { keySection } = data!;
    const { dropKeyLabel, dropKeyPlaceholder } = keySection;

    const maskKey = (key: string) => {
        if (key.length <= 3) return "*".repeat(key.length);
        return key.slice(0, 2) + "*".repeat(key.length - 4) + key.slice(-2);
    };

    const displayKey = userSecret.trim() 
        ? `${isVisible ? identifier : maskKey(identifier)}-${isVisible ? systemSecret : maskKey(systemSecret)}-${isVisible ? userSecret.trim() : maskKey(userSecret.trim())}`
        : null;

    return (
        <div className="flex-shrink-0 flex items-center gap-2 px-3 py-1.5 rounded-md bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700">
            <span className="text-xs font-medium text-zinc-700 dark:text-zinc-300 shrink-0">
                {dropKeyLabel}
            </span>
            {displayKey ? (
                <>
                    <span className="font-mono text-xs font-medium text-zinc-900 dark:text-zinc-100 tracking-tight truncate">
                        {displayKey}
                    </span>
                    <button
                        onClick={() => setIsVisible(!isVisible)}
                        className="shrink-0 p-1 rounded hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors"
                        aria-label={isVisible ? "Hide key" : "Show key"}
                    >
                        {isVisible ? (
                            <EyeOff className="w-3.5 h-3.5 text-zinc-600 dark:text-zinc-400" />
                        ) : (
                            <Eye className="w-3.5 h-3.5 text-zinc-600 dark:text-zinc-400" />
                        )}
                    </button>
                </>
            ) : (
                <span className="text-xs italic text-zinc-500 dark:text-zinc-500 truncate">
                    {dropKeyPlaceholder}
                </span>
            )}
        </div>
    );
};