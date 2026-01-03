"use client";

import React from "react";
import { Copyright } from "lucide-react";

export const FooterCopyright = React.memo(() => {
  return (
    <div
      className="
        flex items-center
        justify-center xl:justify-start
        gap-[clamp(0.25rem,1vw,0.5rem)]
        order-2 xl:order-1
        text-[clamp(0.625rem,1.4vw,0.875rem)]
        text-zinc-600 dark:text-zinc-400
      "
    >
      <Copyright className="size-[clamp(0.75rem,1.5vw,1rem)]" />
      <span>
        {new Date().getFullYear()} Clipposaurus. All rights reserved.
      </span>
    </div>
  );
});

FooterCopyright.displayName = "FooterCopyright";
