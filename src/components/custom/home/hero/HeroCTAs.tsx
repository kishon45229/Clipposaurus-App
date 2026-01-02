"use client";

import React from "react";
import { Plus, KeyRound, LoaderCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useDropOptions } from "@/contexts/DropOptionsContext";
import { UnlockDropDialogBox } from "@/components/custom/home/unlock-drop-dialog-box";
import { UnlockDropDialogBoxProvider } from "@/contexts/UnlockDropDialogBoxContext";

export const HeroCTAs: React.FC = React.memo(() => {
    const {
        createDropRequestStatus,
        handleCreateDrop,
        handleOpenModal,
    } = useDropOptions();

    const isCreating = createDropRequestStatus === "redirecting";

    return (
        <div className="
            flex
            flex-col
            md:flex-row
            flex-wrap
            items-center
            justify-center
            gap-[clamp(0.5rem,2vw,2rem)]
            my-[clamp(0.5rem,3vw,0.75rem)]
        ">
            {/* Create Drop */}
            <Button
                onClick={handleCreateDrop}
                disabled={isCreating}
                className="
                    base-button-classes
                    text-white
                    bg-emerald-600
                    hover:bg-emerald-500
                    shadow-lg
                    shadow-emerald-600/30
                    hover:shadow-xl
                    disabled:opacity-70
                "
            >
                <span className="
                    flex
                    items-center
                    gap-[clamp(0.5rem,1.5vw,1rem)]
                ">
                    {isCreating ? (
                        <>
                            <LoaderCircle className="
                                icon-classes
                                animate-spin
                            " />
                            Loading...
                        </>
                    ) : (
                        <>
                            <Plus className="
                                icon-classes
                            " />
                            Create Drop
                        </>
                    )}
                </span>
            </Button>

            {/* OR */}
            <span className="
                text-[clamp(0.75rem,1.2vw,0.95rem)]
                font-medium
                text-zinc-400
                dark:text-zinc-500
            ">
                or
            </span>

            {/* Unlock Drop */}
            <Button
                onClick={handleOpenModal}
                variant="outline"
                className="
                    base-button-classes
                    text-zinc-800
                    dark:text-zinc-200
                    border-zinc-300
                    dark:border-zinc-700
                    bg-white/80
                    dark:bg-zinc-900/70
                    hover:bg-white
                    dark:hover:bg-zinc-800
                    backdrop-blur-sm
                    hover:shadow-lg
                "
            >
                <span className="
                    flex
                    items-center
                    gap-[clamp(0.5rem,1.5vw,1rem)]
                ">
                    <KeyRound className="
                        icon-classes
                    " />
                    Unlock Drop
                </span>
            </Button>

            <UnlockDropDialogBoxProvider>
                <UnlockDropDialogBox />
            </UnlockDropDialogBoxProvider>
        </div>
    );
});

HeroCTAs.displayName = "HeroCTAs";
