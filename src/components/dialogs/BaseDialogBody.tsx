"use client";

import React from "react";
import {
    ResponsiveDialogHeader,
    ResponsiveDialogTitle,
    ResponsiveDialogDescription,
} from "@/components/ui/responsive-dialog";
import type { BaseDialogBodyProps } from "./types";

export const BaseDialogBody = React.memo<BaseDialogBodyProps>(
    ({ icon, title, description, children }) => {
        return (
            <ResponsiveDialogHeader
                className="
          flex flex-col items-center text-center
          p-2
          space-y-[clamp(0.25rem,2vw,0.35rem)]
        "
            >
                {icon && (
                    <div className="flex items-center justify-center text-emerald-500 text-[clamp(1.25rem,4vw,2rem)]">
                        {icon}
                    </div>
                )}

                <ResponsiveDialogTitle
                    className="
            font-bold tracking-tight
            text-[clamp(0.875rem,3.5vw,1.3rem)]
            text-emerald-600 dark:text-emerald-500
          "
                >
                    {title}
                </ResponsiveDialogTitle>

                <ResponsiveDialogDescription
                    className="
            text-[clamp(0.75rem,3vw,1rem)]
            text-zinc-900 dark:text-zinc-100
            text-center
          "
                >
                    {description}
                </ResponsiveDialogDescription>

                {children}
            </ResponsiveDialogHeader>
        );
    }
);

BaseDialogBody.displayName = "BaseDialogBody";
