"use client";

import React from "react";
import { WifiOff } from "lucide-react";
import useNetworkStatus from "@/hooks/useNetworkStatus";
import { AmbientGlow } from "@/components/ui/ambient-glow";

export const OfflineAlert = () => {
    const { isOnline } = useNetworkStatus();
    const [isMounted, setIsMounted] = React.useState(false);

    React.useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted || isOnline) return null;

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center px-[clamp(1rem,4vw,1.5rem)] bg-black/40 backdrop-blur-sm"
            role="alert"
            aria-live="assertive"
        >
            <div className="relative w-full max-w-[clamp(18rem,85vw,24rem)] rounded-2xl px-[clamp(1.25rem,5vw,1.75rem)] py-[clamp(1.5rem,5vw,2rem)] border border-zinc-200/60 dark:border-zinc-800/60 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-xl shadow-2xl">
                {/* Ambient glow */}
                <AmbientGlow />

                <div className="relative flex flex-col items-center text-center gap-[clamp(0.75rem,3vw,1.25rem)]">
                    {/* Icon */}
                    <div className="flex items-center justify-center size-[clamp(3rem,10vw,3.5rem)] rounded-2xl border border-zinc-200 dark:border-zinc-800 text-emerald-600 dark:text-emerald-400">
                        <WifiOff className="size-[clamp(1.25rem,4vw,1.75rem)]" />
                    </div>

                    {/* Title */}
                    <div className="font-semibold tracking-tight text-zinc-900 dark:text-zinc-100 text-[clamp(1.05rem,3vw,1.25rem)]">
                        You&apos;re offline
                    </div>

                    {/* Core message */}
                    <div className="leading-relaxed text-zinc-600 dark:text-zinc-300 text-[clamp(0.85rem,2.5vw,1rem)]">
                        Clipposaurus requires an active internet connection to work properly.
                    </div>

                    {/* Explanation */}
                    <div className="leading-relaxed text-zinc-500 dark:text-zinc-400 text-[clamp(0.75rem,2.2vw,0.875rem)]">
                        Without connectivity, creating or opening drops and other core features
                        will be unavailable.
                    </div>

                    {/* Reassurance */}
                    <div className="text-zinc-400 dark:text-zinc-500 text-[clamp(0.65rem,2vw,0.75rem)]">
                        Reconnect to continue using all features securely.
                    </div>
                </div>
            </div>
        </div>
    );
};
