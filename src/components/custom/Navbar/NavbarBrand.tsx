import React from "react";
import Link from "next/link";
import Image from "next/image";

export const NavbarBrand = React.memo(() => {
    return (
        <Link href="/" className="flex items-center cursor-target gap-2 pr-2">
            <Image
                src="/icon0.svg"
                alt="Clipposaurus Logo"
                width={48}
                height={48}
                className="w-[clamp(1.5rem,5vw,1.75rem)] h-[clamp(1.5rem,5vw,1.75rem)]"
            />
            <span
                className="text-[clamp(1rem,2vw,1.25rem)] font-semibold"
                aria-label="Clipposaurus"
            >
                Clipposaurus
            </span>
            <span
                className="rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.08em] text-emerald-600 ring-1 ring-emerald-200"
                aria-label="Testing mode: beta"
            >
                Beta
            </span>
        </Link>
    );
});

NavbarBrand.displayName = "NavbarBrand";