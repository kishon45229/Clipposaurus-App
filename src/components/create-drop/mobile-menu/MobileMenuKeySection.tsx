"use client";

import React from "react";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff } from "lucide-react";
import { useMenu } from "@/contexts/MenuContext";

export const MobileMenuKeySection = () => {
    const [isVisible, setIsVisible] = React.useState(false);
    const [showSecret, setShowSecret] = React.useState(false);
    const [isHovering, setIsHovering] = React.useState(false);

    const {
        data,
        identifier,
        systemSecret,
        userSecret,
        setUserSecret,
    } = useMenu();

    const {
        title,
        userSecretLabel,
        dropKeyLabel,
        dropKeyPlaceholder,
    } = data.keySection;

    const maskKey = (key: string) => {
        if (key.length <= 3) return "*".repeat(key.length);
        return key.slice(0, 2) + "*".repeat(key.length - 4) + key.slice(-2);
    };

    const displayKey = userSecret.trim()
        ? `${isVisible ? identifier : maskKey(identifier)}-${isVisible ? systemSecret : maskKey(systemSecret)}-${isVisible ? userSecret.trim() : maskKey(userSecret.trim())}`
        : null;

    return (
        <Card className="rounded-2xl border border-zinc-200/50 dark:border-zinc-800/50 bg-gradient-to-br from-zinc-100/70 to-zinc-50/50 dark:from-zinc-900/70 dark:to-zinc-950/60 shadow-inner p-[clamp(0.5rem,2vw,1rem)]">
            <CardTitle className="mx-auto flex items-center gap-2 font-semibold text-[clamp(0.875rem,3.5vw,1.125rem)] text-emerald-600 dark:text-emerald-500">
                {title}
            </CardTitle>

            <CardContent className="flex flex-col gap-[clamp(0.5rem,2vw,0.75rem)] p-0">
                {/* USER SECRET INPUT */}
                <div className="flex flex-col items-center gap-2">
                    <Label className="field-label">{userSecretLabel}</Label>
                    <div className="relative w-1/2">
                        <Input
                            value={userSecret}
                            type={showSecret ? "text" : "password"}
                            onChange={(e) => setUserSecret(e.target.value)}
                            placeholder="Enter here"
                            minLength={6}
                            maxLength={8}
                            className="bg-white dark:bg-zinc-900 pr-10"
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

                {/* Drop key preview with eye icon */}
                <div className="flex items-center justify-center gap-2 p-3 bg-gradient-to-b from-zinc-100/70 to-zinc-50/50 dark:from-zinc-900/70 dark:to-zinc-950/50 border border-zinc-200/50 dark:border-zinc-800/50 shadow-inner rounded-xl">
                    <span className="text-[clamp(0.75rem,3vw,0.875rem)] text-zinc-700 dark:text-zinc-300 font-medium">
                        {dropKeyLabel}
                    </span>
                    {displayKey ? (
                        <>
                            <span className="text-[clamp(0.75rem,3vw,0.875rem)] font-mono font-medium text-zinc-900 dark:text-zinc-100 tracking-tight">
                                {displayKey}
                            </span>
                            <button
                                onMouseEnter={() => setIsVisible(true)}
                                onMouseLeave={() => setIsVisible(false)}
                                onTouchStart={() => setIsVisible(!isVisible)}
                                className="shrink-0 p-1 rounded hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors cursor-target"
                                aria-label={isVisible ? "Hide key" : "Show key"}
                            >
                                {isVisible ? (
                                    <EyeOff className="w-4 h-4 text-zinc-600 dark:text-zinc-400" />
                                ) : (
                                    <Eye className="w-4 h-4 text-zinc-600 dark:text-zinc-400" />
                                )}
                            </button>
                        </>
                    ) : (
                        <span className="text-[clamp(0.7rem,3vw,0.8rem)] italic text-zinc-500 dark:text-zinc-500">
                            {dropKeyPlaceholder}
                        </span>
                    )}
                </div>
            </CardContent>
        </Card>
    );
};
