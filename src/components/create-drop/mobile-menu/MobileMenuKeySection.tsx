"use client";

import React from "react";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff, Key, Lock } from "lucide-react";
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

    const { keySection } = data;
    const { heading, userSecretLabel, dropKeyLabel, dropKeyPlaceholder } = keySection;

    const maskKey = (key: string) => {
        if (key.length <= 3) return "*".repeat(key.length);
        return key.slice(0, 2) + "*".repeat(key.length - 4) + key.slice(-2);
    };

    const displayKey = userSecret.trim()
        ? `${isVisible ? identifier : maskKey(identifier)}-${isVisible ? systemSecret : maskKey(systemSecret)}-${isVisible ? userSecret.trim() : maskKey(userSecret.trim())}`
        : null;

    return (
        <Card className="rounded-2xl gap-0 border border-zinc-200/50 dark:border-zinc-800/50 bg-white/50 dark:bg-zinc-900/50 backdrop-blur-sm shadow-sm p-3">
            <CardTitle className="flex items-center justify-center gap-1.5 font-semibold text-[clamp(0.8rem,3.5vw,0.9rem)] text-zinc-900 dark:text-zinc-100 mb-2.5">
                <Key className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-500" />
                {heading}
            </CardTitle>

            <CardContent className="flex flex-col gap-2.5 p-0">
                {/* USER SECRET INPUT */}
                <div className="space-y-2">
                    <Label className="text-xs font-medium text-zinc-700 dark:text-zinc-300 flex items-center gap-1">
                        <Lock className="w-3 h-3" />
                        {userSecretLabel}
                    </Label>
                    <div className="relative">
                        <Input
                            value={userSecret}
                            type={showSecret ? "text" : "password"}
                            onChange={(e) => setUserSecret(e.target.value)}
                            placeholder="Enter 6-8 characters"
                            minLength={6}
                            maxLength={8}
                            className="h-9 bg-white dark:bg-zinc-900 border-zinc-300 dark:border-zinc-700 pr-9 text-center font-medium text-sm focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
                        />
                        <button
                            type="button"
                            className="absolute right-1.5 top-1/2 transform -translate-y-1/2 p-1 rounded-md text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-all cursor-target"
                            onClick={() => setShowSecret(!showSecret)}
                            onMouseEnter={() => setIsHovering(true)}
                            onMouseLeave={() => setIsHovering(false)}
                            tabIndex={-1}
                            aria-label={showSecret ? "Hide secret" : "Show secret"}
                        >
                            {showSecret ? <EyeOff className="size-3.5" /> : <Eye className="size-3.5" />}
                        </button>
                    </div>
                    <p className="text-[0.65rem] text-zinc-500 dark:text-zinc-500 text-center leading-none">
                        {userSecret.length}/8 characters
                    </p>
                </div>

                {/* DROP KEY PREVIEW */}
                <div className="flex items-center gap-1.5 p-1">
                    <span className="text-xs font-medium text-emerald-700 dark:text-emerald-300 shrink-0">
                        {dropKeyLabel}
                    </span>
                    {displayKey ? (
                        <>
                            <span className="flex-1 text-[clamp(0.7rem,3vw,0.8rem)] font-mono font-semibold text-emerald-900 dark:text-emerald-100 tracking-tight break-all">
                                {displayKey}
                            </span>
                            <button
                                onMouseEnter={() => setIsVisible(true)}
                                onMouseLeave={() => setIsVisible(false)}
                                onTouchStart={() => setIsVisible(!isVisible)}
                                className="shrink-0 p-1 rounded-md hover:bg-emerald-200/50 dark:hover:bg-emerald-800/50 transition-colors cursor-target"
                                aria-label={isVisible ? "Hide key" : "Show key"}
                            >
                                {isVisible ? (
                                    <EyeOff className="w-3.5 h-3.5 text-emerald-700 dark:text-emerald-400" />
                                ) : (
                                    <Eye className="w-3.5 h-3.5 text-emerald-700 dark:text-emerald-400" />
                                )}
                            </button>
                        </>
                    ) : (
                        <span className="flex-1 text-[clamp(0.7rem,3vw,0.8rem)] text-center italic text-zinc-500 dark:text-zinc-500">
                            {dropKeyPlaceholder}
                        </span>
                    )}
                </div>
            </CardContent>
        </Card>
    );
};
