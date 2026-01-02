"use client";

import React from "react";
import { DropOptionsProvider } from "@/contexts/DropOptionsContext";
import { HeroHeader } from "@/components/custom/home/hero/HeroHeader";
import { HeroCTAs } from "@/components/custom/home/hero/HeroCTAs";
import { HeroFooter } from "./HeroFooter";

export const HeroContent: React.FC = React.memo(() => {
    return (
        <div className="flex
            flex-col
            justify-between
            gap-2
            h-full
            w-full
            overflow-hidden">
            <HeroHeader />
            <DropOptionsProvider>
                <HeroCTAs />
            </DropOptionsProvider>
            <HeroFooter />
        </div>
    );
});

HeroContent.displayName = "HeroContent";