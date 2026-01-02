"use client";

import React from "react";
import Link from "next/link";
import { navigation } from "@/lib/navigation";
import { useHero } from "@/contexts/HeroContext";

/**
 * HeroFooter component
 * @returns React functional component
 */
export const HeroFooter: React.FC = React.memo(() => {
    const { data } = useHero();
    const { consentDescription, consentLink1 } = data;

    return (
        <div className="
            text-[clamp(0.5rem,2vw,0.75rem)]
            text-zinc-400
            dark:text-zinc-500
        " >
            {consentDescription}{" "}
            <Link
                href={navigation.terms}
                aria-label="Read our Terms of Service"
                className="
                    text-zinc-500
                    dark:text-zinc-400
                    hover:text-zinc-700
                    dark:hover:text-zinc-300
                    underline
                    underline-offset-2
                    transition-colors
                    cursor-target
                "
            >
                {consentLink1}
            </Link>
            {"."}
        </div >
    );
});

HeroFooter.displayName = "HeroFooter";
