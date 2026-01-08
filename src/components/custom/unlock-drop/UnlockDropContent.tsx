"use client";

import React from "react";
import { UnlockDropHeader } from "./UnlockDropHeader";
import { UnlockDropForm } from "./UnlockDropForm";
import { UnlockDropFooter } from "./UnlockDropFooter";
import { DialogBox } from "@/components/custom/home/DialogBox";

/**
 * UnlockDropContent component
 * Contains the layout structure for the unlock drop page
 */
export const UnlockDropContent = React.memo(() => {
    return (
        <div className="
      min-h-[calc(100dvh-5rem)]
      w-full
      flex
      items-center
      justify-center
      px-4
      py-8
    ">
            <div className="
        max-w-2xl
        w-full
        flex
        flex-col
        items-center
        gap-8
        p-8
        rounded-3xl
        border
        border-zinc-200/70
        dark:border-zinc-800/70
        bg-white/70
        dark:bg-zinc-900/70
        backdrop-blur-xl
        shadow-2xl
      ">
                <UnlockDropHeader />
                <UnlockDropForm />
                <UnlockDropFooter />
            </div>

            {/* Dialog Box for status messages */}
            <DialogBox />
        </div>
    );
});

UnlockDropContent.displayName = "UnlockDropContent";
