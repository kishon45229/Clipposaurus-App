"use client";

import React from "react";
import { DropOptionsProvider } from "@/contexts/DropOptionsContext";
import { HeroHeader } from "@/components/custom/home/hero/HeroHeader";
import { HeroCTAs } from "@/components/custom/home/hero/HeroCTAs";
import { HeroFooter } from "@/components/custom/home/hero/HeroFooter";

export const HeroContent = () => {
    return (
        <div className="
                flex
                flex-col
                justify-between
                gap-2
                h-full
                w-full
                overflow-hidden
            ">
            <HeroHeader />
            <DropOptionsProvider>
                <HeroCTAs />
            </DropOptionsProvider>
            <HeroFooter />
        </div>
    );
};