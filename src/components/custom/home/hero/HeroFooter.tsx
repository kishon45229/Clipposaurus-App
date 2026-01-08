"use client";

import React from "react";
import Link from "next/link";
import { navigation } from "@/lib/navigation";
import { useHero } from "@/contexts/HeroContext";

/**
 * HeroFooter component
 * @returns React functional component
 */
export const HeroFooter = React.memo(() => {
    const { data } = useHero();
    const { consentDescription, consentLink } = data;

    return (
        <div className="
            text-center
            text-sm
            text-zinc-500
            dark:text-zinc-500
            max-w-md
            mx-auto
        ">
            {consentDescription}{" "}
            <Link
                href={navigation.terms}
                aria-label="Read our Terms of Service"
                className="
                    text-emerald-600
                    dark:text-emerald-500
                    hover:text-emerald-500
                    dark:hover:text-emerald-400
                    underline
                    underline-offset-4
                    decoration-emerald-500/30
                    hover:decoration-emerald-500/60
                    transition-all
                    duration-200
                    cursor-target
                    font-medium
                "
            >
                {consentLink}
            </Link>
            {"."}
        </div>
    );
});

HeroFooter.displayName = "HeroFooter";
