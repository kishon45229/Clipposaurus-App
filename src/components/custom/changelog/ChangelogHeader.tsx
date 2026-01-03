"use client";

import React from "react";
import { useChangelog } from "@/contexts/ChangelogContext";

export const ChangelogHeader = React.memo(() => {
    const { data } = useChangelog();
    const { headline, description } = data;

    return (
        <header className="mb-12 gap-[clamp(0.75rem,2vw,1rem)]">
            <div className="font-bold tracking-tight text-zinc-900 dark:text-emerald-500 text-[clamp(1.8rem,4vw,2.4rem)]">
                {headline}
            </div>
            <div className="text-zinc-500 dark:text-zinc-400 text-[clamp(0.75rem,1.2vw,0.9rem)]">
                {description}
            </div>

            <div className="h-px w-full mt-4 bg-gradient-to-r from-transparent via-zinc-200 dark:via-zinc-800 to-transparent" />
        </header>
    );
});

ChangelogHeader.displayName = "ChangelogHeader";