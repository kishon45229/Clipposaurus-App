"use client";

import { useHeader } from "@/contexts/HeaderContext";
import { Input } from "@/components/ui/input";

export const HeaderUserSecret = () => {
    const { data, userSecret, setUserSecret } = useHeader();
    const { keySection } = data;
    const { userSecretLabel, inputPlaceholder } = keySection;

    return (
        <div className="flex items-center gap-2 w-full">
            {/* Label */}
            <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300 whitespace-nowrap">
                {userSecretLabel}
            </span>

            {/* Input Field */}
            <Input
                id="user-secret-header"
                value={userSecret}
                onChange={(e) => setUserSecret(e.target.value)}
                placeholder={inputPlaceholder}
                maxLength={8}
                className="h-9 text-sm font-mono bg-zinc-50 dark:bg-zinc-950 border-zinc-300 dark:border-zinc-700 
                    focus-visible:ring-1 focus-visible:ring-emerald-500 focus-visible:border-emerald-500 
                    placeholder:text-zinc-400 dark:placeholder:text-zinc-600
                    transition-colors"
            />
        </div>
    );
};