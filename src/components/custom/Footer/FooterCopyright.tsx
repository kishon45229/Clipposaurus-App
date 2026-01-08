"use client";

import React from "react";
import { Copyright } from "lucide-react";

export const FooterCopyright = React.memo(() => {
  return (
    <div
      className="
        flex items-center
        justify-center md:justify-start
        gap-2
        order-2 md:order-1
      "
    >
      <div className="
        flex
        items-center
        justify-center
        w-8
        h-8
        rounded-lg
        bg-emerald-500/10
        dark:bg-emerald-500/20
        border
        border-emerald-500/20
      ">
        <Copyright className="w-4 h-4 text-emerald-600 dark:text-emerald-500" />
      </div>
      <span className="text-sm font-medium text-zinc-600 dark:text-zinc-400">
        {new Date().getFullYear()} <span className="font-bold text-zinc-900 dark:text-zinc-200">Clipposaurus</span>. All rights reserved.
      </span>
    </div>
  );
});

FooterCopyright.displayName = "FooterCopyright";
