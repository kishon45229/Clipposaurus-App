"use client";

import React from "react";
import { Input } from "@/components/ui/input";
import { useHeader } from "@/contexts/HeaderContext";

export const MenuKeySection = React.memo(() => {
  const {
    data,
    identifier,
    systemSecret,
    userSecret,
    setUserSecret,
  } = useHeader();

  // const {
  //   title,
  //   dropKeyLabel,
  //   dropKeyPlaceholder,
  // } = data.keySection;

  return (
    <div className="px-[clamp(0.5rem,2vw,1rem)] py-[clamp(0.5rem,1vw,0.75rem)] rounded-2xl bg-gradient-to-br from-zinc-50 to-zinc-100 dark:from-emerald-950/10 dark:to-emerald-900/10 border border-zinc-200/50 dark:border-zinc-800/50 shadow-inner">
      <div className="text-[clamp(0.8rem,2.5vw,1.1rem)] font-semibold pb-[clamp(0.5rem,1vw,0.75rem)] text-emerald-600 dark:text-emerald-500 flex items-center gap-2">
        jkm,l
      </div>

      <div className="flex flex-col gap-[clamp(0.75rem,1.5vw,1rem)]">
        <div className="flex flex-col">
          <Input
            id="user-secret"
            value={userSecret}
            onChange={(e) => setUserSecret(e.target.value)}
            placeholder="Enter your secret key (6-8 characters)"
            maxLength={8}
            className="bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 font-medium"
          />
        </div>

        <div className="text-[clamp(0.75rem,1.5vw,0.875rem)] text-zinc-600 dark:text-zinc-400 text-center leading-relaxed tracking-tight pt-2 border-t border-zinc-200 dark:border-zinc-800">
          <strong className="font-medium text-zinc-800 dark:text-zinc-200">nkjm</strong>{" "}
          {identifier && systemSecret && userSecret.trim() ? (
            <span className="font-mono text-emerald-600 dark:text-emerald-500 font-semibold">
              {identifier}-{systemSecret}-{userSecret.trim()}
            </span>
          ) : (
            <span className="italic">jnlmk</span>
          )}
        </div>
      </div>
    </div>
  );
});

MenuKeySection.displayName = "MenuKeySection";
