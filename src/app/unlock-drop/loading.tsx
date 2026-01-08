import React from "react";
import { KeyRound, LoaderCircle } from "lucide-react";

export default function UnlockDropLoading(): React.ReactElement {
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
        border-zinc-200/70
        dark:border-zinc-800/70
        bg-white/70
        dark:bg-zinc-900/70
        backdrop-blur-xl
        shadow-2xl
      ">
                <div className="
          p-4
          rounded-2xl
          bg-emerald-100
          dark:bg-emerald-900/30
          border
          border-emerald-200
          dark:border-emerald-800
        ">
                    <KeyRound className="w-12 h-12 text-emerald-600 dark:text-emerald-500" />
                </div>

                <div className="flex flex-col items-center gap-4">
                    <LoaderCircle className="w-8 h-8 animate-spin text-emerald-600 dark:text-emerald-500" />
                    <p className="text-zinc-500 dark:text-zinc-400">Loading...</p>
                </div>
            </div>
        </div>
    );
}
