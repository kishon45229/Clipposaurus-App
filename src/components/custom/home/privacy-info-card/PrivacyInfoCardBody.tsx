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
            gap-4
            flex-1
        ">
            {privacyPillars.map(({ title, detail }, index) => (
                <div
                    key={index}
                    className="
                        group
                        relative
                        rounded-2xl
                        border-2
                        border-zinc-200
                        dark:border-zinc-800
                        bg-white/80
                        dark:bg-zinc-900/50
                        backdrop-blur-sm
                        p-6
                        hover:border-emerald-500/50
                        dark:hover:border-emerald-500/50
                        hover:shadow-lg
                        hover:shadow-emerald-500/10
                        transition-all
                        duration-300
                    "
                >
                    {/* Decorative corner accent */}
                    <div className="
                        absolute
                        top-0
                        right-0
                        w-16
                        h-16
                        bg-gradient-to-bl
                        from-emerald-500/10
                        to-transparent
                        dark:from-emerald-500/5
                        rounded-tr-2xl
                        rounded-bl-full
                        opacity-0
                        group-hover:opacity-100
                        transition-opacity
                        duration-300
                    " />

                    {/* Title */}
                    <div className="
                        text-sm
                        font-bold
                        uppercase
                        tracking-wider
                        text-emerald-600
                        dark:text-emerald-500
                        mb-2
                    ">
                        {title}
                    </div>

                    {/* Detail */}
                    <div className="
                        text-base
                        leading-relaxed
                        text-zinc-600
                        dark:text-zinc-400
                    ">
                        {detail}
                    </div>
                </div>
            ))}
        </div>
    );
});

PrivacyInfoCardBody.displayName = "PrivacyInfoCardBody";
