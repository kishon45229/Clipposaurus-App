"use client";

import { useFooter } from "@/contexts/FooterContext";
import { Copyright, Dot } from "lucide-react";

export const FooterBottomBar = () => {
    const { data } = useFooter();
    const { brand, copyrightNote } = data;
    const { name } = brand;

    return (
        <div className="pt-[clamp(1.5rem,3vw,2rem)] border-t border-zinc-200 dark:border-zinc-800 flex flex-col md:flex-row items-center justify-center gap-[clamp(0.75rem,1.5vw,1rem)]">
            {/* COPYRIGHT */}
            <div className="flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400">
                <span className="flex items-center gap-1">
                    <Copyright className="size-3.5" />
                    <span>{new Date().getFullYear()}</span>
                </span>
                <span className="font-bold text-zinc-900 dark:text-zinc-200">{name}</span>
                <Dot className="size-4" />
                <span>{copyrightNote}</span>
            </div>
        </div>
    );
};