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

    const statusData = data.verificationStatuses[dropKeyVerificationRequestStatus as keyof typeof data.verificationStatuses];
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
                    className="relative w-full h-10 max-w-sm rounded-2xl text-white text-xl font-bold shadow-2xl shadow-emerald-600/40 bg-emerald-600 dark:bg-emerald-500 transition-all duration-300 hover:scale-[1.02] hover:shadow-emerald-600/50 disabled:opacity-70 disabled:hover:scale-100"
                >
                    <span className="flex items-center gap-3">
                        <RotateCcw className="w-6 h-6" />
                        <span>Try Again</span>
                    </span>
                </Button>
            ) : isRateLimited && (
                <Button
                    size="lg"
                    onClick={handleRateLimit}
                    aria-label="I Understand"
                    className="relative w-full h-10 max-w-sm rounded-2xl text-white text-xl font-bold shadow-2xl shadow-emerald-600/40 bg-emerald-600 dark:bg-emerald-500 transition-all duration-300 hover:scale-[1.02] hover:shadow-emerald-600/50 disabled:opacity-70 disabled:hover:scale-100"
                >
                    <span className="flex items-center gap-3">
                        <RotateCcw className="w-6 h-6" />
                        <span>I Understand</span>
                    </span>
                </Button>
            )
            }
        </div >
    );
};
