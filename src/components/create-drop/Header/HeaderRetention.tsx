"use client";

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useHeader } from "@/contexts/HeaderContext";

export const HeaderRetention = () => {
    const { data, retention, setRetention } = useHeader();
    const { retentionSection } = data;
    const { title, options } = retentionSection;

    const retentionOptions = [
        { value: "delete-on-access", label: options.deleteOnAccess, shortLabel: "On Access" },
        { value: "keep-30-minutes", label: options.keep30Minutes, shortLabel: "30 Min" },
        { value: "keep-1-hour", label: options.keep1Hour, shortLabel: "1 Hour" },
    ];

    const selectedOption = retentionOptions.find(opt => opt.value === retention);

    return (
        <div className="flex items-center gap-3">
            {/* Label */}
            <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300 whitespace-nowrap">
                {title}
            </span>

            {/* Desktop: Radio Group */}
            <RadioGroup
                value={retention}
                onValueChange={setRetention}
                className="hidden md:flex items-center gap-1"
            >
                {retentionOptions.map(({ value, shortLabel }) => (
                    <div key={value} className="flex items-center">
                        <RadioGroupItem
                            value={value}
                            id={`header-${value}`}
                            className="peer sr-only"
                        />
                        <Label
                            htmlFor={`header-${value}`}
                            className="cursor-target px-3 py-1.5 text-xs font-medium rounded-md transition-all text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-800 peer-data-[state=checked]:bg-emerald-500 hover:peer-data-[state=checked]:bg-emerald-300 dark:hover:peer-data-[state=checked]:bg-emerald-300 peer-data-[state=checked]:text-zinc-950 dark:peer-data-[state=checked]:text-zinc-950 peer-data-[state=checked]:font-semibold"
                        >
                            {shortLabel}
                        </Label>
                    </div>
                ))}
            </RadioGroup>

            {/* Mobile: Compact Display */}
            <div className="md:hidden px-2.5 py-1 rounded-md bg-emerald-500 text-white">
                <span className="text-xs font-medium">
                    {selectedOption?.shortLabel}
                </span>
            </div>
        </div>
    );
};