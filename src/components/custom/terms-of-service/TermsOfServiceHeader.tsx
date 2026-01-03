import React from "react";
import { useTermsOfService } from "@/contexts/TermsOfServiceContext";

export const TermsOfServiceHeader = () => {
    const { data } = useTermsOfService();
    const { headline, lastUpdated } = data;

    return (
        <header className="mb-12 gap-[clamp(0.75rem,2vw,1rem)]">
            <div className="font-bold tracking-tight text-emerald-600 dark:text-emerald-500 text-[clamp(1.8rem,4vw,2.4rem)]">
                {headline}
            </div>

            <div className="text-zinc-500 dark:text-zinc-400 text-[clamp(0.75rem,1.2vw,0.9rem)]">
                Last updated{" "}
                <span className="font-medium text-zinc-700 dark:text-zinc-300">
                    {lastUpdated}
                </span>
            </div>

            <div className="h-px w-full mt-4 bg-gradient-to-r from-transparent via-zinc-200 dark:via-zinc-800 to-transparent" />
        </header>
    );
};