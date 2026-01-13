"use client";

import { useState } from "react";
import { useHeader } from "@/contexts/HeaderContext";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff } from "lucide-react";

export const HeaderUserSecret = () => {
    const { data, userSecret, setUserSecret } = useHeader();
    const { keySection } = data;
    const { userSecretLabel, inputPlaceholder } = keySection;
    const [showSecret, setShowSecret] = useState(false);
    const [isHovering, setIsHovering] = useState(false);

    return (
        <div className="flex items-center gap-2 w-full">
            {/* Label */}
            <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300 whitespace-nowrap">
                {userSecretLabel}
            </span>

            {/* Input Field */}
            <div className="relative flex-1">
                <Input
                    id="user-secret-header"
                    type={(showSecret || isHovering) ? "text" : "password"}
                    value={userSecret}
                    onChange={(e) => setUserSecret(e.target.value)}
                    placeholder={inputPlaceholder}
                    maxLength={8}
                    className="h-9 text-sm font-mono bg-zinc-50 dark:bg-zinc-950 border-zinc-300 dark:border-zinc-700 focus-visible:ring-1 focus-visible:ring-emerald-500 focus-visible:border-emerald-500 placeholder:text-zinc-400 dark:placeholder:text-zinc-600 transition-colors pr-8"
                />
                <button
                    type="button"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 text-zinc-500 hover:text-zinc-300 transition-colors cursor-target"
                    onClick={() => setShowSecret(!showSecret)}
                    onMouseEnter={() => setIsHovering(true)}
                    onMouseLeave={() => setIsHovering(false)}
                    tabIndex={-1}
                >
                    {showSecret ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                </button>
            </div>
        </div>
    );
};