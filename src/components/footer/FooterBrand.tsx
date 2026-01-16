"use client";

import Link from "next/link";
import Image from "next/image";
import { useFooter } from "@/contexts/FooterContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { Button } from "@/components/ui/button";
import { Mail } from "lucide-react";

export const FooterBrand = () => {
    const { data, handleRedirectToGitHub, handleContactUs } = useFooter();
    const { brand } = data;
    const { name, description } = brand;

    return (
        <div className="lg:col-span-2">
            {/* APP ICON + NAME */}
            <Link href="/" className="group inline-flex items-center gap-3 mb-6 cursor-target">
                <div className="relative flex items-center justify-center w-10 h-10 rounded-xl transition-all duration-300">
                    <Image
                        src="/icon0.svg"
                        alt="Clipposaurus Logo"
                        width={48}
                        height={48}
                    />
                </div>
                <span className="text-2xl font-black text-zinc-900 dark:text-zinc-50">
                    {name}
                </span>
            </Link>

            {/* FOOTER DESCRIPTION */}
            <div className="text-zinc-600 dark:text-zinc-400 leading-relaxed mb-6 max-w-sm">
                {description}
            </div>

            {/* LINKS */}
            <div className="flex items-center gap-3">
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