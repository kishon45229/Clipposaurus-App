"use client";

import React from "react";
import Link from "next/link";

const footerLinks = [
  { href: "/docs", label: "Docs" },
  { href: "/faq", label: "FAQ" },
  { href: "/privacy-policy", label: "Privacy" },
  { href: "/terms-of-service", label: "Terms" },
];

export const FooterLinks: React.FC = React.memo(() => {
  return (
    <nav
      className="
        flex flex-wrap items-center
        justify-center xl:justify-end
        gap-[clamp(0.75rem,3vw,2rem)]
        order-1 xl:order-2
      "
    >
      {footerLinks.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className="
            whitespace-nowrap
            text-[clamp(0.75rem,1.6vw,1rem)]
            text-zinc-600 hover:text-zinc-900
            dark:text-zinc-400 dark:hover:text-zinc-200
            transition-colors duration-200
          "
        >
          {link.label}
        </Link>
      ))}
    </nav>
  );
});

FooterLinks.displayName = "FooterLinks";