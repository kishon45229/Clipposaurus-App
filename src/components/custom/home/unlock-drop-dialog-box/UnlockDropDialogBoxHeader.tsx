"use client";

import React from "react";
import {
    ResponsiveDialogHeader,
    ResponsiveDialogTitle,
    ResponsiveDialogDescription,
} from "@/components/ui/responsive-dialog";
import { useUnlockDropDialogBox } from "@/contexts/UnlockDropDialogBoxContext";

/**
 * UnlockDropDialogBoxHeader component
 */
export const UnlockDropDialogBoxHeader = React.memo(() => {
    const { data } = useUnlockDropDialogBox();
    const { title, description } = data;

    return (
        <ResponsiveDialogHeader className="mx-auto px-2 text-center gap-[clamp(0.25rem,1.5vw,0.5rem)]">
            <ResponsiveDialogTitle
                className="
          mx-auto
          font-bold
          text-[clamp(1.25rem,3vw,1.5rem)]
          text-emerald-600 dark:text-emerald-500
        "
            >
                {title}
            </ResponsiveDialogTitle>

            <ResponsiveDialogDescription
                className="
          mx-auto
          text-[clamp(0.9rem,2.5vw,1.2rem)]
          text-zinc-500 dark:text-zinc-400
        "
            >
                {description}
            </ResponsiveDialogDescription>
        </ResponsiveDialogHeader>
    );
});

UnlockDropDialogBoxHeader.displayName = "UnlockDropDialogBoxHeader";
