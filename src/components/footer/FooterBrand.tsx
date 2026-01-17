"use client";

import Link from "next/link";
import Image from "next/image";
import { useFooter } from "@/context/FooterContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { Button } from "@/components/ui/button";
import { Mail } from "lucide-react";

export const FooterBrand = () => {
    const { data, handleRedirectToGitHub, handleContactUs } = useFooter();
    const { brand } = data;
    const { name, description, ariaLabel, text } = brand;

    return (
        <div className="flex flex-col items-center lg:items-start">
            {/* APP ICON + NAME */}
            <Link href="/" className="group inline-flex items-center gap-3 mb-[clamp(1rem,2vw,1.5rem)] cursor-target">
                <div className="relative flex items-center justify-center w-10 h-10 rounded-xl transition-all duration-300">
                    <Image
                        src="/icon0.svg"
                        alt="Clipposaurus Logo"
                        width={48}
                        height={48}
                    />
                </div>
                <span className="text-[clamp(1.5rem,3vw,2rem)] font-black text-zinc-900 dark:text-zinc-50 hover:text-emerald-600 dark:hover:text-emerald-500 transition-colors duration-300">
                    {name}
                </span>
                <span
                    className=" items-center rounded-lg bg-emerald-500/10 dark:bg-emerald-500/20 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 border border-emerald-500/20"
                    aria-label={ariaLabel}
                >
                    {text}
                </span>
            </Link>

            {/* FOOTER DESCRIPTION */}
            <div className="text-zinc-600 text-center lg:text-left dark:text-zinc-400 leading-relaxed mb-[clamp(1rem,2vw,1.5rem) max-w-sm md:max-w-md">
                {description}
            </div>

            {/* LINKS */}
            <div className="flex items-center gap-3 mt-6">
                <Button
                    size="icon"
                    variant="ghost"
                    className="hover:bg-emerald-500 dark:hover:bg-emerald-500 cursor-target"
                    aria-label="GitHub"
                    onClick={handleRedirectToGitHub}
                >
                    <FontAwesomeIcon icon={faGithub} className="w-5 h-5" />
                </Button>
                <Button
                    size="icon"
                    variant="ghost"
                    className="hover:bg-emerald-500 dark:hover:bg-emerald-500 cursor-target"
                    aria-label="Email"
                    onClick={handleContactUs}
                >
                    <Mail className="w-5 h-5" />
                </Button>
            </div>
        </div>
    );
};