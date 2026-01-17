"use client";

import { Card, CardTitle, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useMenu } from "@/contexts/MenuContext";

export const MobileMenuRetentionCard = () => {
  const { data, retention, setRetention } = useMenu();

  const { title, retentionSection } = data;
  const { deleteOnAccess, keep30Minutes, keep1Hour } =
    retentionSection.options;

  return (
    <Card
      className="rounded-2xl border border-zinc-200/50 dark:border-zinc-800/50 bg-gradient-to-br from-zinc-100/70 to-zinc-50/50 dark:from-zinc-900/70 dark:to-zinc-950/60 shadow-inner p-[clamp(0.5rem,2vw,1rem)]"
    >
      <CardTitle
        className="mx-auto flex items-center gap-2 font-semibold text-[clamp(0.875rem,3.5vw,1.125rem)] text-emerald-600 dark:text-emerald-500"
      >
        {title}
      </CardTitle>

      <CardContent className="flex flex-col gap-[clamp(0.75rem,3vw,1rem)] p-0">
        <RadioGroup
          value={retention}
          onValueChange={setRetention}
          className="flex items-center gap-1"
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
};


// Small helper for radio rows
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
    <div className="flex items-center">
      <RadioGroupItem value={value} id={id} className="peer sr-only" />
      <Label
        htmlFor={id}
        className="cursor-target px-3 py-1.5 text-xs font-medium rounded-md transition-all text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-800 peer-data-[state=checked]:bg-emerald-500 hover:peer-data-[state=checked]:bg-emerald-300 dark:hover:peer-data-[state=checked]:bg-emerald-300 peer-data-[state=checked]:text-zinc-950 dark:peer-data-[state=checked]:text-zinc-950 peer-data-[state=checked]:font-semibold"
      >
        {label}
      </Label>
    </div>
  );
}
