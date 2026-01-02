"use client";

import React from "react";
import {
    ResponsiveDialog,
    ResponsiveDialogContent,
} from "@/components/ui/responsive-dialog";
import { UnlockDropDialogBoxHeader } from "@/components/custom/home/unlock-drop-dialog-box/UnlockDropDialogBoxHeader";
import { UnlockDropDialogBoxBody } from "@/components/custom/home/unlock-drop-dialog-box/UnlockDropDialogBoxBody";
import { UnlockDropDialogBoxFooter } from "@/components/custom/home/unlock-drop-dialog-box/UnlockDropDialogBoxFooter";
import { useDropOptions } from "@/contexts/DropOptionsContext";
import { DialogBox } from "@/components/custom/home/DialogBox";
import { AmbientGlow } from "@/components/ui/ambient-glow";

export const UnlockDropDialogBoxContent: React.FC = React.memo(() => {
    const { shouldShowModal, handleOpenChange } = useDropOptions();

    return (
        <ResponsiveDialog open={shouldShowModal} onOpenChange={handleOpenChange}>
            <ResponsiveDialogContent
                className="
                    max-h-[75dvh]
                    max-w-fit    
                    overflow-y-auto
                    md:overflow-hidden
                    rounded-2xl
                    border border-zinc-200/70 dark:border-zinc-800/70
                    bg-white/70 dark:bg-zinc-900/70
                    backdrop-blur-xl
                    shadow-xl
                    px-[clamp(0.5rem,4vw,1rem)]
                    py-[clamp(0.75rem,4vw,1.5rem)]
                    gap-[clamp(0.5rem,3vw,1.5rem)]
                "
            >
                {/* Background Glow */}
                <AmbientGlow />

                <UnlockDropDialogBoxHeader />
                <UnlockDropDialogBoxBody />
                <UnlockDropDialogBoxFooter />
            </ResponsiveDialogContent>

            <DialogBox />
        </ResponsiveDialog >
    );
});

UnlockDropDialogBoxContent.displayName = "UnlockDropDialogBoxContent";
