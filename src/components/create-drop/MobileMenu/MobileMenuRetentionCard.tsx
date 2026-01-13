"use client";

import React from "react";
import { Card, CardTitle, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useHeader } from "@/contexts/HeaderContext";

export const MobileMenuRetentionCard = React.memo(() => {
  const { data, retention, setRetention } = useHeader();

  const { title, retentionSection } = data;
  const { deleteOnAccess, keep30Minutes, keep1Hour } =
    retentionSection.options;

  return (
    <Card
      className="
        rounded-2xl
        border border-zinc-200/50 dark:border-zinc-800/50
        bg-gradient-to-br from-zinc-100/70 to-zinc-50/50
        dark:from-zinc-900/70 dark:to-zinc-950/60
        shadow-inner
        p-[clamp(0.5rem,2vw,1rem)]
      "
    >
      <CardTitle
        className="
          mx-auto flex items-center gap-2
          font-semibold
          text-[clamp(0.875rem,3.5vw,1.125rem)]
          text-emerald-600 dark:text-emerald-500
        "
      >
        {title}
      </CardTitle>

      <CardContent className="flex flex-col gap-[clamp(0.75rem,3vw,1rem)] p-0">
        <RadioGroup
          value={retention}
          onValueChange={setRetention}
          className="flex flex-col gap-[clamp(0.5rem,2.5vw,0.75rem)]"
        >
          <Option
            id="delete-on-access-mobile"
            value="delete-on-access"
            label={deleteOnAccess}
          />
          <Option
            id="keep-30-minutes-mobile"
            value="keep-30-minutes"
            label={keep30Minutes}
          />
          <Option
            id="keep-1-hour-mobile"
            value="keep-1-hour"
            label={keep1Hour}
          />
        </RadioGroup>
      </CardContent>
    </Card>
  );
});

MobileMenuRetentionCard.displayName = "MobileMenuRetentionCard";

/* ---------------------------------- */
/* Small helper for radio rows         */
/* ---------------------------------- */

function Option({
  id,
  value,
  label,
}: {
  id: string;
  value: string;
  label: string;
}) {
  return (
    <div className="flex items-center gap-3 cursor-target">
      <RadioGroupItem value={value} id={id} />
      <Label
        htmlFor={id}
        className="
          text-[clamp(0.75rem,3vw,1rem)]
          text-zinc-700 dark:text-zinc-300
        "
      >
        {label}
      </Label>
    </div>
  );
}
