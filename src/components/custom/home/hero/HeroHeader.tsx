"use client";

import React from "react";
import { useHero } from "@/contexts/HeroContext";

export const HeroHeader = React.memo(() => {
    const { data } = useHero();
    const { title, titleHighlight, description } = data;

    return (
        <div className="
            flex
            flex-col
            gap-[clamp(0.5rem,2vw,1.5rem)]
        ">
            <div className="
                text-[clamp(1.75rem,5vw,4rem)]
                text-zinc-900
                dark:text-zinc-50
                font-extrabold
                leading-tight
            ">
                {title}{" "}
                {titleHighlight && (
                    <span className="
                        bg-linear-to-r
                        from-zinc-900
                        via-zinc-700
                        to-zinc-500
                        dark:from-zinc-50
                        dark:via-zinc-200
                        dark:to-zinc-400
                        bg-clip-text
                        text-transparent
                    ">
                        {titleHighlight}
                    </span>
                )}
            </div>

            <div className="
                text-[clamp(0.95rem,1.8vw,1.5rem)]
                text-zinc-600
                dark:text-zinc-400
                leading-relaxed
            ">
                {description}
            </div>
        </div>
    );
});

HeroHeader.displayName = "HeroHeader";
