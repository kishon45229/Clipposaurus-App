import React from "react";
import { PrivacyInfoCardHeader } from "@/components/custom/home/privacy-info-card/PrivacyInfoCardHeader";
import { PrivacyInfoCardBody } from "@/components/custom/home/privacy-info-card/PrivacyInfoCardBody";
import { PrivacyInfoCardFooter } from "@/components/custom/home/privacy-info-card/PrivacyInfoCardFooter";

export const PrivacyInfoCardContent = () => {
  return (
    <div className="
        relative
        h-full
        min-h-[600px]
        rounded-3xl
        overflow-hidden
        bg-gradient-to-br
        from-zinc-50
        via-white
        to-zinc-100
        dark:from-zinc-950
        dark:via-zinc-900
        dark:to-zinc-950
        border-2
        border-zinc-200/60
        dark:border-zinc-800/60
        shadow-2xl
        shadow-zinc-900/5
        dark:shadow-emerald-500/5
    ">
      {/* Decorative gradient orbs */}
      <div className="absolute top-0 right-0 w-72 h-72 bg-emerald-500/10 dark:bg-emerald-500/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-zinc-500/10 dark:bg-zinc-500/5 rounded-full blur-3xl" />

      <div className="
        relative
        z-10
        flex
        h-full
        flex-col
        gap-8
        p-8
        lg:p-10
      ">
        <PrivacyInfoCardHeader />
        <PrivacyInfoCardBody />
        <PrivacyInfoCardFooter />
      </div>
    </div>
  );
};
