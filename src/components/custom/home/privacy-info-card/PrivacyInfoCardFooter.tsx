"use client";

import React from "react";
import { usePrivacyInfoCard } from "@/contexts/PrivacyInforCardContext";

export const PrivacyInfoCardFooter = React.memo(() => {
    const { data } = usePrivacyInfoCard();
    const stats = data.stats;

    return (
        <div className="
            flex
            w-full
            justify-between
            gap-[clamp(0.5rem,3vw,2rem)]
        ">
            {stats.map(({ value, label }, index) => (
                <div key={index} className="flex-1 text-center">
                    {/* Value */}
                    <div className="
                            text-[clamp(1rem,3.5vw,1.25rem)]
                            font-bold
                            text-zinc-900
                            dark:text-zinc-100
                        "
                    >
                        {value}
                    </div>

                    {/* Label */}
                    <div className="
                            mt-[clamp(0.125rem,0.5vw,0.25rem)]
                            text-[clamp(0.7rem,1.5vw,0.9rem)]
                            font-medium
                            text-zinc-500
                            dark:text-zinc-400
                        "
                    >
                        {label}
                    </div>
                </div>
            ))}
        </div>
    );
});

PrivacyInfoCardFooter.displayName = "PrivacyInfoCardFooter";
