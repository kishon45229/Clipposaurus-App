"use client";

import React from "react";
import { LoaderCircle, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { InputKey } from "@/components/custom/home/input-key";
import { useDropOptions } from "@/contexts/DropOptionsContext";
import { useUnlockDropDialogBox } from "@/contexts/UnlockDropDialogBoxContext";

export const UnlockDropDialogBoxBody = React.memo(() => {
    const { data } = useUnlockDropDialogBox();
    const { label, loadingLabel } = data.ctaBtn;

    const { handleOpenDrop, dropKeyVerificationRequestStatus } =
        useDropOptions();

    const isVerifying = dropKeyVerificationRequestStatus === "verifying";

    return (
        <div className="
            flex
            flex-col
            items-center
            gap-[clamp(0.5rem,2vw,1rem)]
        ">
            <div
                className="
                    w-full
                    flex
                    justify-center
                "
                role="region"
                aria-label="Drop key input"
            >
                <InputKey />
            </div>

            <Button
                size="lg"
                onClick={handleOpenDrop}
                disabled={isVerifying}
                aria-label="Open drop"
                className="
                    relative
                    min-w-[clamp(12rem,40vw,14rem)]
                    rounded-2xl
                    bg-emerald-600
                    hover:bg-emerald-500
                    text-white
                    shadow-lg
                    shadow-emerald-600/30
                    transition-all
                    duration-300
                    hover:-translate-y-1
                    hover:shadow-xl
                    disabled:opacity-70
                "
            >
                {isVerifying ? (
                    <span className="
                        flex
                        items-center
                        gap-[clamp(0.5rem,2vw,0.75rem)]
                    ">
                        <LoaderCircle
                            aria-hidden="true"
                            className="icon-size-classes animate-spin"
                        />
                        <span className="button-text-classes">{loadingLabel}</span>
                    </span>
                ) : (
                    <span className="
                        flex
                        items-center
                        gap-[clamp(0.5rem,2vw,0.75rem)]
                    ">
                        <span className="button-text-classes">{label}</span>
                        <ArrowRight className="icon-size-classes" />
                    </span>
                )}
            </Button>
        </div>
    );
});

UnlockDropDialogBoxBody.displayName = "UnlockDropDialogBoxBody";
