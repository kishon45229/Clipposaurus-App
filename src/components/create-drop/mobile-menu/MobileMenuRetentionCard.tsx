"use client";

import { Card, CardTitle, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useMenu } from "@/contexts/MenuContext";
import { Clock, Trash2, Timer } from "lucide-react";

export const MobileMenuRetentionCard = () => {
  const { data, retention, setRetention } = useMenu();

  const { title, retentionSection } = data;
  const { deleteOnAccess, keep30Minutes, keep1Hour } =
    retentionSection.options;

  return (
    <Card className="rounded-2xl border border-zinc-200/50 dark:border-zinc-800/50 bg-white/50 dark:bg-zinc-900/50 backdrop-blur-sm shadow-sm p-3">
      <CardTitle className="flex items-center justify-center gap-1.5 font-semibold text-[clamp(0.8rem,3.5vw,0.9rem)] text-zinc-900 dark:text-zinc-100 mb-2.5">
        <Clock className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-500" />
        {title}
      </CardTitle>

      <CardContent className="p-0">
        <RadioGroup
          value={retention}
          onValueChange={setRetention}
          className="grid grid-cols-3 gap-1.5"
        >
          <Option
            id="delete-on-access-mobile"
            value="delete-on-access"
            label={deleteOnAccess}
            icon={<Trash2 className="w-3.5 h-3.5" />}
          />
          <Option
            id="keep-30-minutes-mobile"
            value="keep-30-minutes"
            label={keep30Minutes}
            icon={<Timer className="w-3.5 h-3.5" />}
          />
          <Option
            id="keep-1-hour-mobile"
            value="keep-1-hour"
            label={keep1Hour}
            icon={<Clock className="w-3.5 h-3.5" />}
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
  icon,
}: {
  id: string;
  value: string;
  label: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="relative">
      <RadioGroupItem value={value} id={id} className="peer sr-only" />
      <Label
        htmlFor={id}
        className="cursor-target flex flex-col items-center justify-center gap-1 px-1.5 py-2 text-[0.65rem] font-medium rounded-xl transition-all border-2 border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 hover:border-emerald-300 dark:hover:border-emerald-700 hover:bg-emerald-50 dark:hover:bg-emerald-950/30 peer-data-[state=checked]:border-emerald-500 peer-data-[state=checked]:bg-gradient-to-br peer-data-[state=checked]:from-emerald-500 peer-data-[state=checked]:to-emerald-600 peer-data-[state=checked]:text-zinc-950 dark:peer-data-[state=checked]:text-zinc-950 peer-data-[state=checked]:font-semibold peer-data-[state=checked]:shadow-lg peer-data-[state=checked]:shadow-emerald-500/25"
      >
        {icon}
        <span className="text-center leading-tight">{label}</span>
      </Label>
    </div>
  );
}
