"use client";

import React from "react";
import { useRedirects } from "@/hooks/useRedirect";

export const FooterLinks = (): React.ReactNode => {
  const { handleRedirectToDocs, handleRedirectToFAQ, handleRedirectToChangelog, handleRedirectToTermsOfService } = useRedirects();

  const links = [
    { label: "Docs", onClick: handleRedirectToDocs },
    { label: "FAQ", onClick: handleRedirectToFAQ },
    { label: "Changelog", onClick: handleRedirectToChangelog },
    { label: "Terms", onClick: handleRedirectToTermsOfService },
  ];

  return (
    <nav
      className="flex flex-wrap items-center justify-center xl:justify-end gap-[clamp(0.75rem,3vw,2rem)] order-1 xl:order-2"
    >
      {links.map((link) => (
        <button
          key={link.label}
          onClick={link.onClick}
          className="whitespace-nowrap text-[clamp(0.75rem,1.6vw,1rem)] text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-200 transition-colors duration-200 cursor-target"
        >
          {link.label}
        </button>
      ))}
    </nav>
  );
};