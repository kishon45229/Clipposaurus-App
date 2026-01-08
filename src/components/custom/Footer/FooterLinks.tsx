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
        justify-center md:justify-end
        gap-6
        order-1 md:order-2
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
              relative
              whitespace-nowrap
              text-sm
              font-semibold
              text-zinc-600
              hover:text-emerald-600
              dark:text-zinc-400
              dark:hover:text-emerald-500
              transition-colors
              duration-200
              after:absolute
              after:bottom-0
              after:left-0
              after:h-0.5
              after:w-0
              after:bg-emerald-500
              after:transition-all
              after:duration-200
              hover:after:w-full
            "
          >
            {link.label}
          </a>
        ) : (
          <Link
            key={link.href}
            href={link.href}
            className="
              relative
              whitespace-nowrap
              text-sm
              font-semibold
              text-zinc-600
              hover:text-emerald-600
              dark:text-zinc-400
              dark:hover:text-emerald-500
              transition-colors
              duration-200
              after:absolute
              after:bottom-0
              after:left-0
              after:h-0.5
              after:w-0
              after:bg-emerald-500
              after:transition-all
              after:duration-200
              hover:after:w-full
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