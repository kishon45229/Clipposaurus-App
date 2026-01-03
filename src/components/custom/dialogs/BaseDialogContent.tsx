"use client";

import React from "react";
import { ResponsiveDialogContent } from "@/components/ui/responsive-dialog";
import type { BaseDialogContentProps } from "./types";
import { cn } from "@/lib/utils";

export const BaseDialogContent = React.memo<BaseDialogContentProps>(
    ({ showCloseButton = true, className, children }) => {
        return (
            <ResponsiveDialogContent
                showCloseButton={showCloseButton}
                className={cn(
                    `
            w-full max-w-[clamp(20rem,90vw,32rem)]
            h-fit
            rounded-[clamp(1rem,3vw,1.5rem)]
            p-[clamp(1rem,4vw,1.5rem)]
            border border-zinc-200/60 dark:border-zinc-800/60
            bg-gradient-to-br from-zinc-100/70 to-zinc-50
            dark:from-zinc-900/60 dark:to-zinc-950/40
            backdrop-blur-xl
            shadow-xl
            transition-all
          `,
                    className
                )}
            >
                {/* Ambient glow */}
                <div className="absolute inset-0 pointer-events-none rounded-[inherit]">
                    <div className="absolute inset-0 bg-emerald-500/5 blur-2xl" />
                </div>

                {children}
            </ResponsiveDialogContent>
        );
    }
);

BaseDialogContent.displayName = "BaseDialogContent";