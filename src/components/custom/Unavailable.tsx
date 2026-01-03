import React from "react";
import { Frown } from "lucide-react";

export const Unavailable = () => {
    return (
        <div
            className="
                flex items-center justify-center
                h-[84dvh] w-full
            "
            role="status"
            aria-label="Service Unavailable"
        >
            <div
                className="
                    relative flex flex-col items-center text-center
                    gap-[clamp(0.75rem,3vw,1.25rem)]
                    w-full max-w-[clamp(18rem,85vw,24rem)]
                    rounded-2xl
                    px-[clamp(1.25rem,5vw,1.75rem)]
                    py-[clamp(1.5rem,5vw,2rem)]
                    border border-zinc-200/70 dark:border-zinc-800/70
                    bg-white/70 dark:bg-zinc-900/70
                    backdrop-blur-xl shadow-xl
                "
            >
                {/* Ambient glow */}
                <div className="absolute inset-0 pointer-events-none rounded-3xl">
                    <div className="absolute inset-0 bg-orange-500/5 blur-2xl" />
                </div>

                {/* Icon */}
                <div className="relative flex items-center justify-center">
                    <Frown className="size-[clamp(2.5rem,8vw,3rem)] text-orange-500" />
                </div>

                {/* Title */}
                <div
                    className="
                        relative font-semibold tracking-tight
                        text-zinc-900 dark:text-zinc-100
                        text-[clamp(1.05rem,3vw,1.25rem)]
                    "
                >
                    Service Unavailable
                </div>

                {/* Description */}
                <div
                    className="
                        relative leading-relaxed
                        text-zinc-600 dark:text-zinc-400
                        text-[clamp(0.85rem,2.5vw,1rem)]
                        max-w-[clamp(16rem,80vw,22rem)]
                    "
                >
                    Our storage quota is currently full due to high demand.
                    The service is temporarily unavailable. Please try again later.
                </div>

                {/* Subtle hint */}
                <div
                    className="
                        relative flex items-center
                        gap-[clamp(0.375rem,1.5vw,0.5rem)]
                        text-zinc-500 dark:text-zinc-500
                        text-[clamp(0.65rem,2vw,0.75rem)]
                    "
                >
                    <div
                        className="
                            size-[clamp(0.3rem,1vw,0.375rem)]
                            rounded-full bg-orange-500 animate-pulse
                        "
                    />
                    Please check back soon!
                </div>

                {/* Accessibility */}
                <div className="sr-only" aria-live="polite" aria-atomic="true">
                    Service Unavailable. Please try again later.
                </div>
            </div>
        </div>
    );
};
