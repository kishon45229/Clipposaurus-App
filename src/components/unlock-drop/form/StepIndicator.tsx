"use client";

import { useUnlockDrop } from "@/contexts/UnlockDropContext";

export const StepIndicator = () => {
    const { data, isEnterKeyStep, isVerifyStep, isAccessStep } = useUnlockDrop();
    const stepIndicators = data.stepIndicators;

    return (
        <div className="flex items-center gap-1.5 sm:gap-2 lg:gap-3 text-xs sm:text-sm font-medium text-zinc-600 dark:text-zinc-400">
            { /* ENTER KEY */}
            <span className={`flex items-center gap-1.5 sm:gap-2 px-2 sm:px-3 lg:px-4 py-1.5 sm:py-2 rounded-full transition-all duration-300 
                ${isEnterKeyStep
                    ? "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400"
                    : "bg-zinc-100 dark:bg-zinc-800/50 text-zinc-500 dark:text-zinc-500"
                }`}>
                <span className={`w-5 h-5 sm:w-6 sm:h-6 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 shrink-0
                    ${isEnterKeyStep
                        ? "bg-emerald-600 dark:bg-emerald-500 text-white"
                        : "bg-emerald-600 dark:bg-emerald-500 text-white"
                    }`}>
                    {isEnterKeyStep ? "1" : "✓"}
                </span>
                <span className="hidden sm:inline truncate">{stepIndicators[0]}</span>
            </span>

            <div className={`w-4 sm:w-8 lg:w-12 h-0.5 transition-all duration-300 shrink-0
                ${isVerifyStep || isAccessStep
                    ? "bg-emerald-500"
                    : "bg-zinc-200 dark:bg-zinc-800"
                }`}>
            </div>

            { /* VERIFY */}
            <span className={`flex items-center gap-1.5 sm:gap-2 px-2 sm:px-3 lg:px-4 py-1.5 sm:py-2 rounded-full transition-all duration-300 
                ${isVerifyStep
                    ? "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400"
                    : isAccessStep
                        ? "bg-zinc-100 dark:bg-zinc-800/50 text-zinc-500 dark:text-zinc-500"
                        : "bg-zinc-100 dark:bg-zinc-800/50 text-zinc-500 dark:text-zinc-500"
                }`}>
                <span className={`w-5 h-5 sm:w-6 sm:h-6 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 shrink-0
                    ${isVerifyStep
                        ? "bg-emerald-600 dark:bg-emerald-500 text-white"
                        : isAccessStep
                            ? "bg-emerald-600 dark:bg-emerald-500 text-white"
                            : "bg-zinc-300 dark:bg-zinc-700 text-zinc-600 dark:text-zinc-400"
                    }`}>
                    {isAccessStep ? "✓" : "2"}
                </span>
                <span className="hidden sm:inline truncate">{stepIndicators[1]}</span>
            </span>

            <div className={`w-4 sm:w-8 lg:w-12 h-0.5 transition-all duration-300 shrink-0
                ${isAccessStep
                    ? "bg-emerald-500"
                    : "bg-zinc-200 dark:bg-zinc-800"
                }`}>
            </div>

            { /* ACCESS CONTENT */}
            <span className={`flex items-center gap-1.5 sm:gap-2 px-2 sm:px-3 lg:px-4 py-1.5 sm:py-2 rounded-full transition-all duration-300 
                ${isAccessStep
                    ? "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400"
                    : "bg-zinc-100 dark:bg-zinc-800/50 text-zinc-500 dark:text-zinc-500"
                }`}>
                <span className={`w-5 h-5 sm:w-6 sm:h-6 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 shrink-0
                    ${isAccessStep
                        ? "bg-emerald-600 dark:bg-emerald-500 text-white"
                        : "bg-zinc-300 dark:bg-zinc-700 text-zinc-600 dark:text-zinc-400"
                    }`}>3</span>
                <span className="hidden sm:inline truncate">{stepIndicators[2]}</span>
            </span>
        </div>
    );
};