"use client";

import React from "react";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useMenu } from "@/contexts/MenuContext";

export const MenuRetentionSection = React.memo(() => {
  const { data, retention, setRetention } = useMenu();
  const { title, options } = data.retentionSection;

  const labelClass = "text-[clamp(0.75rem,1vw,0.875rem)] text-zinc-700 dark:text-zinc-300";

  const retentionOptions = [
    { id: "delete-on-access", value: "delete-on-access", label: options.deleteOnAccess },
    { id: "keep-30-minutes", value: "keep-30-minutes", label: options.keep30Minutes },
    { id: "keep-1-hour", value: "keep-1-hour", label: options.keep1Hour },
  ];

  return (
    <div className="rounded-2xl px-[clamp(0.5rem,2vw,1rem)] py-[clamp(0.5rem,1vw,0.75rem)] gap-[clamp(0.25rem,1vw,0.5rem)] bg-gradient-to-br from-zinc-50 to-zinc-100 dark:from-emerald-950/10 dark:to-emerald-900/10 border border-zinc-200/50 dark:border-zinc-800/50">
      <div className="text-[clamp(0.8rem,2.5vw,1.1rem)]  font-semibold pb-[clamp(0.5rem,1vw,0.75rem)] text-emerald-600 dark:text-emerald-500 flex items-center gap-2">
        {title}
      </div>

      <RadioGroup value={retention} onValueChange={setRetention} className="flex flex-col gap-[clamp(0.5rem,1vw,0.75rem)]">
        {retentionOptions.map(({ id, value, label }) => (
          <div key={id} className="flex items-center space-x-[clamp(0.5rem,1vw,0.75rem)] cursor-target">
            <RadioGroupItem value={value} id={id} />
            <Label htmlFor={id} className={labelClass}>
              {label}
            </Label>
          </div>
        ))}
      </RadioGroup>
    </div>
  );
});

MenuRetentionSection.displayName = "MenuRetentionSection";
