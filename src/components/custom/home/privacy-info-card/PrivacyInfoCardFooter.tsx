"use client";

import React from "react";
import { usePrivacyInfoCard } from "@/contexts/PrivacyInforCardContext";

export const PrivacyInfoCardFooter = React.memo(() => {
    const { data } = usePrivacyInfoCard();
    const stats = data.stats;

    return (
        <div className="
            flex
            items-center
            justify-around
            gap-4
            pt-6
            border-t-2
            border-zinc-200
            dark:border-zinc-800
        ">
            {stats.map(({ value, label }, index) => (
                <div
                    key={index}
                    className="
                        flex-1
                        text-center
                        group
                        cursor-default
                    "
                >
                    {/* Value with gradient */}
                    <div className="
                        text-3xl
                        lg:text-4xl
                        font-black
                        bg-gradient-to-br
                        from-emerald-600
                        to-emerald-500
                        dark:from-emerald-500
                        dark:to-emerald-600
                        bg-clip-text
                        text-transparent
                        group-hover:scale-110
                        transition-transform
                        duration-300
                    ">
                        {value}
                    </div>

                    {/* Label */}
                    <div className="
                        mt-1
                        text-sm
                        font-semibold
                        uppercase
                        tracking-wide
                        text-zinc-500
                        dark:text-zinc-400
                    ">
                        {label}
                    </div>
                </div>
            ))}
        </div>
    );
});

PrivacyInfoCardFooter.displayName = "PrivacyInfoCardFooter";
