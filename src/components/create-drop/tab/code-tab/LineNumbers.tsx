"use client";

import React from "react";
import useLineNumbers from "@/hooks/useLineNumbers";
import { useCodeTab } from "@/contexts/CodeTabContext";

export const LineNumbers = React.memo(() => {
    const { codeContent, leftLineNumbersRef } = useCodeTab();
    const { numbers, maxDigits } = useLineNumbers({ codeContent });

    return (
        <div
            className="relative h-full min-h-0 shrink-0 bg-transparent"
            style={{ minWidth: `calc(${maxDigits}ch + 1rem)` }}
        >
            <div
                ref={leftLineNumbersRef}
                className="absolute inset-0 overflow-hidden"
                role="presentation"
                aria-hidden="true"
            >
                <div className="px-2 py-3 text-muted-foreground select-none font-mono text-sm leading-6">
                    {numbers.map((num: number) => (
                        <div key={num} className="text-right">
                            {num}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
});

LineNumbers.displayName = "LineNumbers";
