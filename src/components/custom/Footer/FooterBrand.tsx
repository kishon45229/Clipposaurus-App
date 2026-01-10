import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Github, Twitter } from "lucide-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDiscord } from "@fortawesome/free-brands-svg-icons";
import { GITHUB_REPO_URL } from "@/lib/urls";

export const FooterBrand = React.memo(() => {
    return (
        <div className="lg:col-span-2">
            <Link href="/" className="group inline-flex items-center gap-3 mb-6">
                <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-600 shadow-lg shadow-emerald-500/30 group-hover:shadow-emerald-500/40 transition-all duration-300">
                    <Image
                        src="/icon0.svg"
                        alt="Clipposaurus Logo"
                        width={24}
                        height={24}
                        className="w-6 h-6 brightness-0 invert"
                    />
                </div>
                <span className="text-2xl font-black text-zinc-900 dark:text-zinc-50">
                    Clipposaurus
                </span>
            </Link>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed mb-6 max-w-sm">
                Privacy-first zero-knowledge web app for secure content sharing. No accounts, no tracking, just pure privacy.
            </p>
            {/* Social Links */}
            <div className="flex items-center gap-3">
                <a
                    href={GITHUB_REPO_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center w-10 h-10 rounded-lg bg-zinc-100 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 hover:bg-emerald-500 hover:text-white dark:hover:bg-emerald-500 dark:hover:text-white transition-all duration-200"
                    aria-label="GitHub"
                >
                    <Github className="w-5 h-5" />
                </a>
                <a
                    href="#"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center w-10 h-10 rounded-lg bg-zinc-100 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 hover:bg-emerald-500 hover:text-white dark:hover:bg-emerald-500 dark:hover:text-white transition-all duration-200"
                    aria-label="Discord"
                >
                    <FontAwesomeIcon icon={faDiscord} className="w-5 h-5" />
                </a>
                <a
                    href="#"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center w-10 h-10 rounded-lg bg-zinc-100 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 hover:bg-emerald-500 hover:text-white dark:hover:bg-emerald-500 dark:hover:text-white transition-all duration-200"
                    aria-label="Twitter"
                >
                    <Twitter className="w-5 h-5" />
                </a>
            </div>
        </div>
    );
});

FooterBrand.displayName = "FooterBrand";