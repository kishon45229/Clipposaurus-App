"use client";

import { useMenu } from "@/contexts/MenuContext";
import { Info } from "lucide-react";

export const MobileMenuInfoSection = () => {
  const { data } = useMenu();
  const { label, text } = data.noteSection;

  return (
    <div className="flex items-start gap-2 p-2 rounded-xl bg-blue-50/50 dark:bg-blue-950/20 border border-blue-200/50 dark:border-blue-800/50">
      <Info className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400 mt-0.5 shrink-0" />

      <div className="flex-1 space-y-0.5">
        <span className="block font-semibold text-xs text-blue-900 dark:text-blue-100">
          {label}
        </span>
        <span className="block text-[0.7rem] text-blue-800 dark:text-blue-200 leading-snug">
          {text}
        </span>
      </div>
    </div>
  );
};
