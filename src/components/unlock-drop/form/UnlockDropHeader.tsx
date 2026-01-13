"use client";

import { useUnlockDrop } from "@/contexts/UnlockDropContext";

export const UnlockDropHeader = () => {
    const { data } = useUnlockDrop();
    const { title, description } = data;

    return (
        <div className="flex flex-col items-center gap-4 text-center w-full">
            <div className="text-[clamp(2.5rem,6vw,3rem)] font-black leading-[1.05] tracking-tight text-emerald-600 dark:text-emerald-500">
                {title}
            </div>

            <div className="text-[clamp(1rem,6vw,1.25rem)] text-zinc-600 dark:text-zinc-300 max-w-2xl font-medium leading-relaxed">
                {description}
            </div>
        </div>
    );
};
