"use client";

import React from "react";
import { usePrivacyInfoCard } from "@/contexts/PrivacyInforCardContext";
import { ShieldCheck } from "lucide-react";
import { PrivacyInfoCardComponent } from "@/types/contentData-types/privacyInfoCard-types";

export const PrivacyInfoCardHeader = React.memo(() => {
  const { data } = usePrivacyInfoCard();
  const { title, subtitle } = data as PrivacyInfoCardComponent;

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-[clamp(0.75rem,2vw,1rem)]">
      {/* Icon */}
      <div className="
          flex items-center justify-center
          rounded-[clamp(0.75rem,2vw,1rem)]
          bg-emerald-500/15
          text-emerald-600 dark:text-emerald-400
          size-[clamp(2.5rem,6vw,3.5rem)]
        "
      >
        <ShieldCheck className="size-[clamp(1.25rem,3vw,2rem)]" />
      </div>

      {/* Text */}
      <div className="space-y-[clamp(0.25rem,1vw,0.3rem)]">
        <div className="
          text-[clamp(0.65rem,1.2vw,0.85rem)]
          font-semibold
          uppercase
          tracking-[0.25em]
          text-zinc-400 dark:text-zinc-500
        ">
          {subtitle}
        </div>

        <div className="
          text-[clamp(1rem,2.5vw,1.25rem)]
          leading-[1.1]
          text-zinc-900 dark:text-zinc-50
        ">
          {title}
        </div>
      </div>
    </div>
  );
});

PrivacyInfoCardHeader.displayName = "PrivacyInfoCardHeader";
