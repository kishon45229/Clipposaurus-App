"use client";

import React from "react";
import { useHeader } from "@/contexts/HeaderContext";

export const MenuHeader = React.memo(() => {
  const { data } = useHeader();
  const { title, description } = data;

  return (
    <div className="space-y-[clamp(0.25rem,1vw,0.5rem)] text-center px-[clamp(0.5rem,2vw,1rem)]">
      <div
        className="
          text-[clamp(1rem,4vw,1.5rem)]
          font-semibold
          tracking-tight
          bg-gradient-to-r from-zinc-900 to-zinc-700 dark:from-zinc-100 dark:to-zinc-300
          bg-clip-text
          text-transparent
        "
      >
        {title}
      </div>
      <div
        className="
          text-[clamp(0.75rem,2.5vw,1rem)]
          text-zinc-600 dark:text-zinc-400
        "
      >
        {description}
      </div>
    </div>
  );
});

MenuHeader.displayName = "MenuHeader";
