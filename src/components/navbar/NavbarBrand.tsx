"use client";

import Link from "next/link";
import Image from "next/image";
import { useNavbar } from "@/contexts/NavbarContext";

export const NavbarBrand = () => {
    const { data } = useNavbar();
    const { brand } = data;
    const { name, beta } = brand;
    const { text, ariaLabel } = beta;

    return (
        <Link href="/" className="group flex items-center cursor-target gap-3 pr-2">
            <div className="relative flex items-center justify-center w-10 h-10 rounded-xl transition-all duration-300">
                <Image
                    src="/icon0.svg"
                    alt="Clipposaurus Logo"
                    width={36}
                    height={36}
                />
            </div>
            <div className="flex items-center gap-2">
                <span
                    className="text-xl font-black text-zinc-900 dark:text-zinc-50 group-hover:text-emerald-600 dark:group-hover:text-emerald-500 transition-colors"
                    aria-label={name}
                >
                    {name}
                </span>
                <span
                    className="hidden sm:inline-flex items-center rounded-lg bg-emerald-500/10 dark:bg-emerald-500/20 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 border border-emerald-500/20"
                    aria-label={ariaLabel}
                >
                    {text}
                </span>
            </div>
        </Link>
    );
};