"use client";

import { LoaderCircle, AlertCircle, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useUnlockDrop } from "@/contexts/UnlockDropContext";

const iconMap = {
    LoaderCircle: LoaderCircle,
    AlertCircle: AlertCircle,
};

export const UnlockDropVerify = () => {
    const { dropKeyVerificationRequestStatus, data, handleTryAgain, handleRateLimit } = useUnlockDrop();

    const isVerifying = dropKeyVerificationRequestStatus === "verifying";
    const isRateLimited = dropKeyVerificationRequestStatus === "rateLimited";

    const { verifyKey } = data;
    const { verificationStatuses, ctaTryAgainBtn, ctaRateLimitedBtn } = verifyKey;

    const statusData = verificationStatuses[dropKeyVerificationRequestStatus as keyof typeof verificationStatuses];
    const IconComponent = iconMap[statusData.icon as keyof typeof iconMap] || LoaderCircle;

    return (
        <div className="flex flex-col items-center w-full gap-6 p-8">
            <IconComponent className={`w-10 h-10 text-emerald-600 dark:text-emerald-400 ${isVerifying && 'animate-spin'}`} />

            <div className="text-center space-y-3 max-w-md">
                <div className="text-[clamp(1rem,6vw,1.5rem)] font-black leading-[1.05] tracking-tight text-zinc-900 dark:text-zinc-100">
                    {statusData.title}
                </div>
                <div className="text-[clamp(0.5rem,6vw,1rem)] text-zinc-600 dark:text-zinc-400 leading-relaxed">
                    {statusData.description}
                </div>
            </div>

            {!isVerifying && !isRateLimited ? (
                <Button
                    size="lg"
                    onClick={handleTryAgain}
                    aria-label="Try Again"
                    className="relative h-12 px-12 text-lg font-bold text-white bg-gradient-to-br from-emerald-600 via-emerald-500 to-emerald-600 hover:from-emerald-500 hover:via-emerald-400 hover:to-emerald-500 rounded-2xl shadow-[0_8px_30px_rgb(16,185,129,0.3)] hover:shadow-[0_12px_40px_rgb(16,185,129,0.4)] transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed border border-emerald-400/20 cursor-target"
                >
                    <span className="flex items-center gap-3">
                        <RotateCcw className="w-6 h-6" />
                        <span>{ctaTryAgainBtn.label}</span>
                    </span>
                </Button>
            ) : isRateLimited && (
                <Button
                    size="lg"
                    onClick={handleRateLimit}
                    aria-label="I Understand"
                    className="relative h-12 px-12 text-lg font-bold text-white bg-gradient-to-br from-emerald-600 via-emerald-500 to-emerald-600 hover:from-emerald-500 hover:via-emerald-400 hover:to-emerald-500 rounded-2xl shadow-[0_8px_30px_rgb(16,185,129,0.3)] hover:shadow-[0_12px_40px_rgb(16,185,129,0.4)] transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed border border-emerald-400/20 cursor-target"
                >
                    <span className="flex items-center gap-3">
                        <RotateCcw className="w-6 h-6" />
                        <span>{ctaRateLimitedBtn.label}</span>
                    </span>
                </Button>
            )
            }
        </div >
    );
};
