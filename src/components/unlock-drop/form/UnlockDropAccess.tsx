"use client";

import { CheckCircle2, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useUnlockDrop } from "@/contexts/UnlockDropContext";

export const UnlockDropAccess = () => {
    const { data, handlePreviewDrop } = useUnlockDrop();

    const { accessDrop } = data;
    const { title, description, ctaBtn, additionalInfo } = accessDrop;

    return (
        <div className="flex flex-col items-center w-full gap-6 p-8">
            <CheckCircle2 className="w-10 h-10 text-emerald-600 dark:text-emerald-400" />

            {/* Success Messages */}
            <div className="text-center space-y-3 max-w-md">
                <div className="text-[clamp(1rem,6vw,1.5rem)] font-black leading-[1.05] tracking-tight text-zinc-900 dark:text-zinc-100">
                    {title}
                </div>
                <div className="text-[clamp(0.5rem,6vw,1rem)] text-zinc-600 dark:text-zinc-400 leading-relaxed">
                    {description}
                </div>
            </div>

            {/* Open Drop Button */}
            <Button
                size="lg"
                onClick={handlePreviewDrop}
                className="relative h-12 px-12 text-lg font-bold text-white bg-gradient-to-br from-emerald-600 via-emerald-500 to-emerald-600 hover:from-emerald-500 hover:via-emerald-400 hover:to-emerald-500 rounded-2xl shadow-[0_8px_30px_rgb(16,185,129,0.3)] hover:shadow-[0_12px_40px_rgb(16,185,129,0.4)] transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed border border-emerald-400/20 cursor-target"
            >
                <span className="flex items-center gap-3">
                    <span>{ctaBtn.label}</span>
                    <ExternalLink className="w-6 h-6 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                </span>
            </Button>

            {/* Additional Info */}
            <div className="text-sm text-zinc-500 dark:text-zinc-500 text-center max-w-md">
                {additionalInfo}
            </div>
        </div>
    );
};
