"use client";

import React from "react";
import { AlertCircle, RefreshCcw } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ErrorProps {
    error: Error & { digest?: string };
    reset: () => void;
}

export default function UnlockDropError({ error, reset }: ErrorProps): React.ReactElement {
    return (
        <div className="
      min-h-[calc(100dvh-5rem)]
      w-full
      flex
      items-center
      justify-center
      px-4
      py-8
    ">
            <div className="
        max-w-2xl
        w-full
        flex
        flex-col
        items-center
        gap-8
        p-8
        rounded-3xl
        border
        border-red-200/70
        dark:border-red-800/70
        bg-white/70
        dark:bg-zinc-900/70
        backdrop-blur-xl
        shadow-2xl
      ">
                <div className="
          p-4
          rounded-2xl
          bg-red-100
          dark:bg-red-900/30
          border
          border-red-200
          dark:border-red-800
        ">
                    <AlertCircle className="w-12 h-12 text-red-600 dark:text-red-500" />
                </div>

                <div className="flex flex-col items-center gap-4 text-center">
                    <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
                        Something went wrong
                    </h2>

                    <p className="text-zinc-500 dark:text-zinc-400 max-w-md">
                        {error.message || "An unexpected error occurred while loading the unlock page."}
                    </p>
                </div>

                <Button
                    onClick={reset}
                    size="lg"
                    className="
            flex
            items-center
            gap-2
            rounded-2xl
            bg-emerald-600
            hover:bg-emerald-500
            text-white
          "
                >
                    <RefreshCcw className="w-5 h-5" />
                    Try again
                </Button>
            </div>
        </div>
    );
}
