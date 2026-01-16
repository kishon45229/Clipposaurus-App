"use client";

import { useMenu } from "@/contexts/MenuContext";

export const MobileMenuInfoSection = () => {
  const { data } = useMenu();
  const { label, text } = data.noteSection;

  return (
    <div className="flex items-start gap-[clamp(0.25rem,1.5vw,0.5rem)]">
      <span className="font-medium text-[clamp(0.75rem,3vw,0.95rem)] text-zinc-700 dark:text-zinc-300 shrink-0">
        {label}
      </span>

      <span className="text-[clamp(0.75rem,3vw,0.95rem)] text-zinc-700 dark:text-zinc-300 tracking-tight leading-snug">
        {text}
      </span>
    </div>
  );
};
