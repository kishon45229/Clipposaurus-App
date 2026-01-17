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
        <div className="flex-shrink-0 flex items-center gap-[clamp(0.25rem,1vw,0.5rem)] px-[clamp(0.75rem,3vw,1rem)] py-[clamp(0.25rem,1.5vw,0.6rem)] bg-gradient-to-b from-zinc-100/70 to-zinc-50/50 dark:from-zinc-900/70 dark:to-zinc-950/50 border border-zinc-200/50 dark:border-zinc-800/50 shadow-inner backdrop-blur-xl rounded-2xl">
            <span className="text-[clamp(0.75rem,2.5vw,1rem)] text-zinc-700 dark:text-zinc-300 shrink-0">
                {dropKeyLabel}
            </span>
            {displayKey ? (
                <>
                    <span className="text-[clamp(0.75rem,2.5vw,1rem)] font-medium text-zinc-900 dark:text-zinc-100 tracking-tight truncate">
                        {displayKey}
                    </span>
                    <button
                        onMouseEnter={() => setIsVisible(true)}
                        onMouseLeave={() => setIsVisible(false)}
                        className="shrink-0 p-1 rounded hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors cursor-target"
                        aria-label={isVisible ? "Hide key" : "Show key"}
                    >
                        {isVisible ? (
                            <EyeOff className="w-[clamp(0.75rem,2vw,1rem)] h-[clamp(0.75rem,2vw,1rem)] text-zinc-600 dark:text-zinc-400" />
                        ) : (
                            <Eye className="w-[clamp(0.75rem,2vw,1rem)] h-[clamp(0.75rem,2vw,1rem)] text-zinc-600 dark:text-zinc-400" />
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