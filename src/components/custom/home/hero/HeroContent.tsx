"use client";

import React from "react";
import { DropOptionsProvider } from "@/contexts/DropOptionsContext";
import { HeroHeader } from "@/components/custom/home/hero/HeroHeader";
import { HeroCTAs } from "@/components/custom/home/hero/HeroCTAs";
import { HeroFooter } from "@/components/custom/home/hero/HeroFooter";

export const HeroContent = () => {
    return (
        <div className="
                relative
                flex
                flex-col
                items-center
                justify-center
                min-h-[600px]
                h-full
                w-full
                overflow-hidden
                px-4
                py-12
            ">
            {/* Background decoration */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 -left-32 w-96 h-96 bg-emerald-500/10 dark:bg-emerald-500/5 rounded-full blur-3xl" />
                <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-zinc-500/10 dark:bg-zinc-500/5 rounded-full blur-3xl" />
            </div>

            <div className="relative z-10 max-w-4xl mx-auto space-y-12">
                <HeroHeader />
                <DropOptionsProvider>
                    <HeroCTAs />
                </DropOptionsProvider>
                <HeroFooter />
            </div>
        </div>
    );
};