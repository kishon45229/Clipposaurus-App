"use client";

import React from "react";
import { KeyRound } from "lucide-react";
import { useUnlockDropDialogBox } from "@/contexts/UnlockDropDialogBoxContext";

/**
 * UnlockDropHeader component
 * Displays the icon, title and description for the unlock drop page
 */
export const UnlockDropHeader = React.memo(() => {
    const { data } = useUnlockDropDialogBox();
    const { title, description } = data;

    return (
        <div className="flex flex-col items-center gap-4 text-center">
            <div className="
        p-4
        rounded-2xl
        bg-emerald-100
        dark:bg-emerald-900/30
        border
        border-emerald-200
        dark:border-emerald-800
      ">
                <KeyRound className="w-12 h-12 text-emerald-600 dark:text-emerald-500" />
            </div>

            <h1 className="
        font-bold
        text-4xl
        md:text-5xl
        text-emerald-600
        dark:text-emerald-500
      ">
                {title}
            </h1>

            <p className="
        text-lg
        md:text-xl
        text-zinc-500
        dark:text-zinc-400
        max-w-md
      ">
                {description}
            </p>
        </div>
    );
});

UnlockDropHeader.displayName = "UnlockDropHeader";
