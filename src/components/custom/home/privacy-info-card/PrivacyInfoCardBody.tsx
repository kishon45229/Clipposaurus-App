"use client";

import React from "react";
import { usePrivacyInfoCard } from "@/contexts/PrivacyInforCardContext";

export const PrivacyInfoCardBody = React.memo(() => {
    const { data } = usePrivacyInfoCard();
    const privacyPillars = data.privacyPillars;

    return (
        <div className="
            grid
            grid-cols-1
            md:grid-cols-2
            gap-[clamp(0.75rem,2.5vw,0.9rem)]
        "
        >
            {privacyPillars.map(({ title, detail }, index) => (
                <div key={index} className="
                    rounded-2xl
                    border border-zinc-200/70 dark:border-zinc-800/60
                    bg-gradient-to-br from-zinc-50 to-zinc-100
                    dark:from-emerald-950/10 dark:to-emerald-900/10
                    backdrop-blur-sm
                    px-[clamp(0.75rem,3vw,1.25rem)]
                    py-[clamp(0.75rem,2.5vw,1.25rem)]
                "
                >
                    {/* Title */}
                    <div className="
                        text-[clamp(0.7rem,1.2vw,0.9rem)]
                        font-semibold
                        uppercase
                        tracking-wide
                        text-emerald-600 dark:text-emerald-400
                    "
                    >
                        {title}
                    </div>

                    {/* Detail */}
                    <div className="
                        mt-[clamp(0.25rem,1vw,0.3rem)]
                        text-[clamp(0.8rem,1.5vw,1rem)]
                        leading-relaxed
                        text-zinc-600 dark:text-zinc-400
                    "
                    >
                        {detail}
                    </div>
                </div>
            ))}
        </div>
    );
});

PrivacyInfoCardBody.displayName = "PrivacyInfoCardBody";
