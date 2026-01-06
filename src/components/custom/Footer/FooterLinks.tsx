"use client";

import React from "react";
import Link from "next/link";

const DOCS_URL = process.env.NEXT_PUBLIC_DOCS_URL || "http://localhost:3001";

const footerLinks = [
  { href: DOCS_URL, label: "Docs", external: true },
  { href: "/faq", label: "FAQ", external: false },
  { href: "/changelog", label: "Changelog", external: false },
  { href: "/terms-of-service", label: "Terms", external: false },
];

export const FooterLinks = React.memo(() => {
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
        link.external ? (
          <a
            key={link.href}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="
              whitespace-nowrap
              text-[clamp(0.75rem,1.6vw,1rem)]
              text-zinc-600 hover:text-zinc-900
            dark:text-zinc-400 dark:hover:text-zinc-200
            transition-colors duration-200
          "
          >
            {link.label}
          </a>
        ) : (
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
        )
      ))}
    </nav>
  );
});

FooterLinks.displayName = "FooterLinks";