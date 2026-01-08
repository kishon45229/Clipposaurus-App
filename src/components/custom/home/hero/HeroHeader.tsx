"use client";

import React from "react";
import { useHero } from "@/contexts/HeroContext";

export const HeroHeader = React.memo(() => {
    const { data } = useHero();
    const { title, titleHighlight, description } = data;

    return (
        <div className="text-center space-y-6">
            {/* Title with gradient */}
            <h1 className="
                text-[clamp(2.5rem,6vw,5rem)]
                font-black
                leading-[1.05]
                tracking-tight
            ">
                <span className="
                    text-zinc-900
                    dark:text-zinc-50
                ">
                    {title}{" "}
                </span>
                {titleHighlight && (
                    <span className="
                        inline-block
                        bg-gradient-to-br
                        from-emerald-600
                        via-emerald-500
                        to-emerald-400
                        dark:from-emerald-400
                        dark:via-emerald-500
                        dark:to-emerald-600
                        bg-clip-text
                        text-transparent
                        [text-shadow:0_0_80px_rgba(16,185,129,0.3)]
                    ">
                        {titleHighlight}
                    </span>
                )}
            </h1>

            {/* Description */}
            <p className="
                text-[clamp(1.1rem,2vw,1.4rem)]
                text-zinc-600
                dark:text-zinc-400
                leading-relaxed
                max-w-2xl
                mx-auto
            ">
                {description}
            </p>
        </div>
    );
});

HeroHeader.displayName = "HeroHeader";
