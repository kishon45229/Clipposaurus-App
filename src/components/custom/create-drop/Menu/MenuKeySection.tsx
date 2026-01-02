"use client";

import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader } from "lucide-react";
import { useMenu } from "@/contexts/MenuContext";

export const MenuKeySection = React.memo(() => {
  const {
    data,
    identifier,
    systemSecret,
    userSecret,
    setUserSecret,
    isLoadingKeys,
  } = useMenu();

  const {
    title,
    identifierLabel,
    systemSecretLabel,
    userSecretLabel,
    dropKeyLabel,
    dropKeyPlaceholder,
  } = data.keySection;

  const inputCommonClasses =
    "bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 font-medium";

  const labelCommonClasses =
    "text-[clamp(0.75rem,1vw,0.875rem)] text-zinc-700 dark:text-zinc-300 mb-1 block";

  return (
    <div className="px-[clamp(0.5rem,2vw,1rem)] py-[clamp(0.5rem,1vw,0.75rem)] rounded-2xl bg-gradient-to-br from-zinc-50 to-zinc-100 dark:from-emerald-950/10 dark:to-emerald-900/10 border border-zinc-200/50 dark:border-zinc-800/50 shadow-inner">
      <div className="text-[clamp(0.8rem,2.5vw,1.1rem)] font-semibold pb-[clamp(0.5rem,1vw,0.75rem)] text-emerald-600 dark:text-emerald-500 flex items-center gap-2">
        {title}
      </div>

      <div className="flex flex-col gap-[clamp(0.5rem,1vw,0.75rem)]">
        <div className="flex flex-wrap justify-between gap-[clamp(0.5rem,1vw,0.75rem)]">
          {[
            { id: "identifier", value: identifier, label: identifierLabel, disabled: true, placeholder: "Identifier" },
            { id: "system-secret", value: systemSecret, label: systemSecretLabel, disabled: true, placeholder: "System secret" },
            { id: "user-secret", value: userSecret, label: userSecretLabel, disabled: false, placeholder: "Enter here", onChange: (e: React.ChangeEvent<HTMLInputElement>) => setUserSecret(e.target.value), maxLength: 6 },
          ].map((field) => (
            <div key={field.id} className="flex-1 min-w-[120px] flex flex-col">
              <Label htmlFor={field.id} className={labelCommonClasses}>
                {field.label}
              </Label>
              <div className="flex items-center gap-2">
                <Input
                  id={field.id}
                  value={field.value}
                  onChange={field.onChange}
                  disabled={field.disabled}
                  placeholder={isLoadingKeys && field.disabled ? "Generating..." : field.placeholder}
                  maxLength={field.maxLength}
                  className={field.disabled ? inputCommonClasses : "bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 font-medium"}
                />
                {isLoadingKeys && field.disabled && <Loader className="h-[clamp(1rem,2vw,1.25rem)] w-[clamp(1rem,2vw,1.25rem)] animate-spin" />}
              </div>
            </div>
          ))}
        </div>

        <div className="text-[clamp(0.75rem,1.5vw,0.875rem)] text-zinc-600 dark:text-zinc-400 text-center leading-relaxed tracking-tight">
          <strong className="font-medium text-zinc-800 dark:text-zinc-200">{dropKeyLabel}</strong>{" "}
          {identifier && systemSecret && userSecret.trim() ? (
            <span className="font-mono text-zinc-900 dark:text-zinc-100">
              {identifier}-{systemSecret}-{userSecret.trim()}
            </span>
          ) : (
            <span className="italic">{dropKeyPlaceholder}</span>
          )}
        </div>
      </div>
    </div>
  );
});

MenuKeySection.displayName = "MenuKeySection";
