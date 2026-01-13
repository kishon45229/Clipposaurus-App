"use client";

import { useUnlockDrop } from "@/contexts/UnlockDropContext";
import { InputKey } from "@/components/unlock-drop/input-key";
import { LoaderCircle, ArrowRight, AlertCircle, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export const UnlockDropForm = () => {
    const { data, handleUnlockDrop, dropKeyVerificationRequestStatus, emptyFields } = useUnlockDrop();
    const { enterKey } = data;
    const { title, ctaBtn, errorMessages, hintText, sampleKey } = enterKey;

    const isVerifying = dropKeyVerificationRequestStatus === "verifying";
    const showIncompleteError = dropKeyVerificationRequestStatus === "incomplete";

    return (
        <div className="flex flex-col items-center w-full gap-6 p-8">
            {/**header */}
            <div className="text-center space-y-2">
                <div className="text-[clamp(1rem,6vw,1.5rem)] font-black leading-[1.05] tracking-tight text-zinc-900 dark:text-zinc-100">
                    {title}
                </div>
            </div>

            {/**Body */}
            <div className="w-full space-y-4">
                <InputKey />

                {showIncompleteError && (
                    <div className="flex items-start gap-3 p-4 rounded-xl bg-zinc-100 dark:bg-zinc-900/50 border border-zinc-300 dark:border-zinc-700 animate-in fade-in slide-in-from-top-2 duration-300">
                        <AlertCircle className="w-5 h-5 text-zinc-700 dark:text-zinc-400 shrink-0 mt-0.5" />
                        <div className="flex-1">
                            <div className="text-sm font-semibold text-zinc-900 dark:text-zinc-200 mb-1">
                                {title}
                            </div>
                            <div className="text-sm text-zinc-700 dark:text-zinc-400">
                                {emptyFields.length === 3
                                    ? `${errorMessages.allEmpty}`
                                    : emptyFields.length === 2
                                        ? `${errorMessages.oneOrTwoEmpty} ${emptyFields.join(" and ")}`
                                        : emptyFields.length === 1
                                            ? `${errorMessages.oneOrTwoEmpty} ${emptyFields[0]}`
                                            : `${errorMessages.general}`}
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/**Footer */}
            <Button
                size="lg"
                onClick={handleUnlockDrop}
                disabled={isVerifying}
                aria-label="Open drop"
                className="relative h-12 px-12 text-lg font-bold text-white bg-gradient-to-br from-emerald-600 via-emerald-500 to-emerald-600 hover:from-emerald-500 hover:via-emerald-400 hover:to-emerald-500 rounded-2xl shadow-[0_8px_30px_rgb(16,185,129,0.3)] hover:shadow-[0_12px_40px_rgb(16,185,129,0.4)] transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed border border-emerald-400/20 cursor-target"
            >
                {isVerifying ? (
                    <span className="flex items-center gap-3">
                        <LoaderCircle
                            aria-hidden="true"
                            className="w-6 h-6 animate-spin"
                        />
                        <span>{ctaBtn.loadingLabel}</span>
                    </span>
                ) : (
                    <span className="flex items-center gap-3">
                        <span>{ctaBtn.label}</span>
                        <ArrowRight className="w-7 h-7 transition-transform group-hover:translate-x-1" />
                    </span>
                )}
            </Button>

            <div className="inline-flex items-center gap-3 px-6 py-3 rounded-2xl">
                <HelpCircle className="w-5 h-5 text-emerald-600 dark:text-emerald-500 shrink-0" />
                <div className="flex flex-col sm:flex-row items-center gap-2 text-sm">
                    <span className="text-zinc-600 dark:text-zinc-400 font-medium">{hintText}</span>
                    <span className="font-mono text-base font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/30 px-3 py-1 rounded-lg border border-emerald-200 dark:border-emerald-800">
                        {sampleKey}
                    </span>
                </div>
            </div>
        </div>
    );
};
