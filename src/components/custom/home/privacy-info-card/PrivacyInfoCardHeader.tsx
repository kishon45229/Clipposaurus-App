"use client";

import React from "react";
import { usePrivacyInfoCard } from "@/contexts/PrivacyInforCardContext";
import { ShieldCheck } from "lucide-react";
import { PrivacyInfoCardComponent } from "@/types/contentData-types/privacyInfoCard-types";

export const PrivacyInfoCardHeader = React.memo(() => {
  const { data } = usePrivacyInfoCard();
  const { title, subtitle } = data as PrivacyInfoCardComponent;

  return (
    <div className="flex flex-col gap-6">
      {/* Icon with modern design */}
      <div className="
        relative
        inline-flex
        items-center
        justify-center
        w-20
        h-20
        rounded-2xl
        bg-gradient-to-br
        from-emerald-500/20
        to-emerald-600/10
        dark:from-emerald-500/10
        dark:to-emerald-600/5
        border
        border-emerald-500/30
        dark:border-emerald-500/20
        shadow-lg
        shadow-emerald-500/20
      ">
        <ShieldCheck className="w-10 h-10 text-emerald-600 dark:text-emerald-500" strokeWidth={2.5} />
        {/* Decorative ring */}
        <div className="absolute inset-0 rounded-2xl border-2 border-emerald-500/20 animate-pulse" />
      </div>

      {/* Text content */}
      <div className="space-y-2">
        <div className="
          text-xs
          font-bold
          uppercase
          tracking-[0.2em]
          text-emerald-600
          dark:text-emerald-500
        ">
          {subtitle}
        </div>

        <h2 className="
          text-3xl
          lg:text-4xl
          font-black
          leading-tight
          text-zinc-900
          dark:text-zinc-50
        ">
          {title}
        </h2>
      </div>
    </div>
  );
});

PrivacyInfoCardHeader.displayName = "PrivacyInfoCardHeader";
