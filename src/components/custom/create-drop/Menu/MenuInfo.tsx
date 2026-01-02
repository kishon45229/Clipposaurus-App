"use client";

import React from "react";
import { useMenu } from "@/contexts/MenuContext";

export const MenuInfo = React.memo(() => {
  const { data } = useMenu();
  const { label, text } = data.noteSection;

  const textClass = "text-[clamp(0.625rem,1vw,0.875rem)] text-zinc-700 dark:text-zinc-300";

  return (
    <div className="flex items-start gap-[clamp(0.25rem,1vw,0.5rem)]">
      <div className={textClass}>{label}</div>
      <div className={`${textClass} tracking-tight`}>{text}</div>
    </div>
  );
});

MenuInfo.displayName = "MenuInfo";
