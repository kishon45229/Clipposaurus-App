"use client";

import React from "react";
import { Plus, KeyRound, LoaderCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useDropOptions } from "@/contexts/DropOptionsContext";
import { UnlockDropDialogBox } from "@/components/custom/home/unlock-drop-dialog-box";
import { UnlockDropDialogBoxProvider } from "@/contexts/UnlockDropDialogBoxContext";

export const HeroCTAs = React.memo(() => {
    const {
        createDropRequestStatus,
        handleCreateDrop,
        handleOpenModal,
    } = useDropOptions();

    const isCreating = createDropRequestStatus === "redirecting";

    return (
        <div className="flex flex-col items-center gap-8">
            {/* Primary CTA - Create Drop */}
            <Button
                onClick={handleCreateDrop}
                disabled={isCreating}
                size="lg"
                className="
                    group
                    relative
                    h-16
                    px-12
                    text-lg
                    font-bold
                    text-white
                    bg-gradient-to-br
                    from-emerald-600
                    via-emerald-500
                    to-emerald-600
                    hover:from-emerald-500
                    hover:via-emerald-400
                    hover:to-emerald-500
                    rounded-2xl
                    shadow-[0_8px_30px_rgb(16,185,129,0.3)]
                    hover:shadow-[0_12px_40px_rgb(16,185,129,0.4)]
                    transition-all
                    duration-300
                    disabled:opacity-70
                    disabled:cursor-not-allowed
                    border
                    border-emerald-400/20
                "
            >
                <span className="flex items-center gap-3">
                    {isCreating ? (
                        <>
                            <LoaderCircle className="w-6 h-6 animate-spin" />
                            <span>Loading...</span>
                        </>
                    ) : (
                        <>
                            <Plus className="w-6 h-6 group-hover:rotate-90 transition-transform duration-300" />
                            <span>Create Drop</span>
                        </>
                    )}
                </span>
                {/* Shine effect */}
                <div className="
                    absolute
                    inset-0
                    rounded-2xl
                    bg-gradient-to-r
                    from-transparent
                    via-white/20
                    to-transparent
                    opacity-0
                    group-hover:opacity-100
                    group-hover:animate-[shine_1.5s_ease-in-out]
                    pointer-events-none
                " />
            </Button>

            {/* Divider with OR */}
            <div className="flex items-center gap-4 w-full max-w-xs">
                <div className="flex-1 h-px bg-gradient-to-r from-transparent via-zinc-300 dark:via-zinc-700 to-transparent" />
                <span className="
                    text-sm
                    font-medium
                    text-zinc-400
                    dark:text-zinc-600
                    uppercase
                    tracking-wider
                ">
                    or
                </span>
                <div className="flex-1 h-px bg-gradient-to-r from-transparent via-zinc-300 dark:via-zinc-700 to-transparent" />
            </div>

            {/* Secondary CTA - Unlock Drop */}
            <Button
                onClick={handleOpenModal}
                variant="outline"
                size="lg"
                className="
                    group
                    h-16
                    px-12
                    text-lg
                    font-semibold
                    text-zinc-700
                    dark:text-zinc-300
                    border-2
                    border-zinc-300
                    dark:border-zinc-700
                    bg-white/50
                    dark:bg-zinc-900/50
                    hover:bg-white
                    dark:hover:bg-zinc-800
                    hover:border-emerald-500/50
                    dark:hover:border-emerald-500/50
                    rounded-2xl
                    backdrop-blur-sm
                    hover:shadow-lg
                    transition-all
                    duration-300
                "
            >
                <span className="flex items-center gap-3">
                    <KeyRound className="w-6 h-6 group-hover:scale-110 transition-transform duration-300" />
                    <span>Unlock Drop</span>
                </span>
            </Button>

            <UnlockDropDialogBoxProvider>
                <UnlockDropDialogBox />
            </UnlockDropDialogBoxProvider>
        </div>
    );
});

HeroCTAs.displayName = "HeroCTAs";
