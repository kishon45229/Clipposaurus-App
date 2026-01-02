import React from "react";
import { Spinner } from "@/components/ui/spinner";

/**
 * LOADING FALLBACK
 */
export default function LoadingFallback(): React.ReactElement {
  return (
    <div
      className="flex items-center justify-center h-[84dvh] w-full"
      role="status"
      aria-label="Loading"
    >
      <div className="relative flex flex-col items-center text-center space-y-5 max-w-xs sm:max-w-sm md:max-w-md rounded-2xl border border-zinc-200/70 dark:border-zinc-800/70 bg-white/70 dark:bg-zinc-900/70 backdrop-blur-xl shadow-xl px-4 py-5">
        {/* Ambient glow */}
        <div className="absolute inset-0 pointer-events-none rounded-3xl">
          <div className="absolute inset-0 bg-emerald-500/5 blur-2xl" />
        </div>

        {/* Spinner */}
        <div className="relative flex items-center justify-center">
          <Spinner className="h-10 w-10 text-emerald-600 dark:text-emerald-400 animate-spin" />
        </div>

        {/* Title */}
        <div className="relative text-xl font-semibold text-zinc-900 dark:text-zinc-100 tracking-tight">
          Preparing your workspace
        </div>

        {/* Description */}
        <div className="relative text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-sm">
          We&apos;re securely loading everything you need.
          This usually takes just a moment.
        </div>

        {/* Subtle progress hint */}
        <div className="relative flex items-center gap-2 text-xs text-zinc-500 dark:text-zinc-500">
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          Hang tight, we&apos;re almost there!
        </div>

        {/* Accessibility */}
        <div className="sr-only" aria-live="polite" aria-atomic="true">
          Preparing your workspace. Please wait.
        </div>
      </div>
    </div>
  );
}
