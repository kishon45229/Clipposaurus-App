import React from "react";
import { PrivacyInfoCardHeader } from "@/components/custom/home/privacy-info-card/PrivacyInfoCardHeader";
import { PrivacyInfoCardBody } from "@/components/custom/home/privacy-info-card/PrivacyInfoCardBody";
import { PrivacyInfoCardFooter } from "@/components/custom/home/privacy-info-card/PrivacyInfoCardFooter";

export const PrivacyInfoCardContent: React.FC = React.memo(() => {
  return (
    <div
      className="
        relative
        h-full
        rounded-4xl
        border
        border-emerald-500/50
        dark:border-emerald-500/30
        bg-zinc-50
        dark:bg-zinc-950
        backdrop-blur-xl
        shadow-xl
        px-[clamp(1rem,3vw,1.5rem)]
        py-[clamp(1.25rem,3vw,1.5rem)]
      "
    >
      <div className="
        flex
        h-full
        flex-col
        justify-between
        gap-[clamp(1rem,3vw,1.2rem)]
      ">
        <PrivacyInfoCardHeader />
        <PrivacyInfoCardBody />
        <PrivacyInfoCardFooter />
      </div>
    </div>
  );
});

PrivacyInfoCardContent.displayName = "PrivacyInfoCardContent";
