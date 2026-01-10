import React from "react";
import Link from "next/link";
import Image from "next/image";

export const NavbarBrand = () => {
    return (
        <Link href="/" className="group flex items-center cursor-target gap-3 pr-2">
            <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-600 shadow-lg shadow-emerald-500/30 group-hover:shadow-emerald-500/40 transition-all duration-300 group-hover:scale-110">
                <Image
                    src="/icon0.svg"
                    alt="Clipposaurus Logo"
                    width={24}
                    height={24}
                    className="w-6 h-6 brightness-0 invert"
                />
            </div>
            <div className="flex items-center gap-2">
                <span
                    className="text-xl font-black text-zinc-900 dark:text-zinc-50 group-hover:text-emerald-600 dark:group-hover:text-emerald-500 transition-colors"
                    aria-label="Clipposaurus"
                >
                    Clipposaurus
                </span>
                <span
                    className="hidden sm:inline-flex items-center rounded-lg bg-emerald-500/10 dark:bg-emerald-500/20 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 border border-emerald-500/20"
                    aria-label="Testing mode: beta"
                >
                    Beta
                </span>
            </div>
        </Link>
    );
};