"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Github, Twitter, Mail, FileText, Shield, HelpCircle, BookOpen, Zap, MessageSquare } from "lucide-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDiscord } from "@fortawesome/free-brands-svg-icons";
import { GITHUB_REPO_URL } from "@/constants/githubConfig";

const DOCS_URL = process.env.NEXT_PUBLIC_DOCS_URL || "http://localhost:3001";

const footerLinks = {
    product: [
        { label: "Features", href: "/#features", icon: Zap },
        { label: "How It Works", href: "/#how-it-works", icon: BookOpen },
        { label: "Security", href: "/#security", icon: Shield },
        { label: "Changelog", href: "/changelog", icon: FileText },
    ],
    resources: [
        { label: "Documentation", href: DOCS_URL, external: true, icon: BookOpen },
        { label: "FAQ", href: "/faq", icon: HelpCircle },
        { label: "API Reference", href: DOCS_URL + "/api", external: true, icon: FileText },
        { label: "GitHub", href: GITHUB_REPO_URL, external: true, icon: Github },
    ],
    legal: [
        { label: "Terms of Service", href: "/terms-of-service" },
        { label: "Privacy Policy", href: "/privacy-policy" },
        { label: "Cookie Policy", href: "/cookie-policy" },
        { label: "Acceptable Use", href: "/acceptable-use" },
    ],
    community: [
        { label: "GitHub Discussions", href: GITHUB_REPO_URL + "/discussions", external: true, icon: MessageSquare },
        { label: "Discord", href: "#", external: true, icon: null, customIcon: faDiscord },
        { label: "Twitter", href: "#", external: true, icon: Twitter },
        { label: "Contact", href: "mailto:support@clipposaurus.com", external: true, icon: Mail },
    ],
};

export const FooterContainer = React.memo(() => {
    return (
        <footer className="
                w-full
                border-t-2
                border-zinc-200
                dark:border-zinc-800
                bg-gradient-to-b
                from-white
                to-zinc-50
                dark:from-zinc-950
                dark:to-black
            "
            role="contentinfo"
        >
            <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                {/* Main Footer Content */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8 mb-12">
                    {/* Brand Column */}
                    <div className="lg:col-span-2">
                        <Link href="/" className="group inline-flex items-center gap-3 mb-6">
                            <div className="
                                relative
                                flex
                                items-center
                                justify-center
                                w-10
                                h-10
                                rounded-xl
                                bg-gradient-to-br
                                from-emerald-500
                                to-emerald-600
                                shadow-lg
                                shadow-emerald-500/30
                                group-hover:shadow-emerald-500/40
                                transition-all
                                duration-300
                            ">
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
                                className="
                                    flex items-center justify-center
                                    w-10 h-10
                                    rounded-lg
                                    bg-zinc-100
                                    dark:bg-zinc-900
                                    text-zinc-600
                                    dark:text-zinc-400
                                    hover:bg-emerald-500
                                    hover:text-white
                                    dark:hover:bg-emerald-500
                                    dark:hover:text-white
                                    transition-all
                                    duration-200
                                "
                                aria-label="GitHub"
                            >
                                <Github className="w-5 h-5" />
                            </a>
                            <a
                                href="#"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="
                                    flex items-center justify-center
                                    w-10 h-10
                                    rounded-lg
                                    bg-zinc-100
                                    dark:bg-zinc-900
                                    text-zinc-600
                                    dark:text-zinc-400
                                    hover:bg-emerald-500
                                    hover:text-white
                                    dark:hover:bg-emerald-500
                                    dark:hover:text-white
                                    transition-all
                                    duration-200
                                "
                                aria-label="Discord"
                            >
                                <FontAwesomeIcon icon={faDiscord} className="w-5 h-5" />
                            </a>
                            <a
                                href="#"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="
                                    flex items-center justify-center
                                    w-10 h-10
                                    rounded-lg
                                    bg-zinc-100
                                    dark:bg-zinc-900
                                    text-zinc-600
                                    dark:text-zinc-400
                                    hover:bg-emerald-500
                                    hover:text-white
                                    dark:hover:bg-emerald-500
                                    dark:hover:text-white
                                    transition-all
                                    duration-200
                                "
                                aria-label="Twitter"
                            >
                                <Twitter className="w-5 h-5" />
                            </a>
                        </div>
                    </div>

                    {/* Product Column */}
                    <div>
                        <h3 className="text-sm font-bold uppercase tracking-wider text-zinc-900 dark:text-zinc-50 mb-4">
                            Product
                        </h3>
                        <ul className="space-y-3">
                            {footerLinks.product.map((link) => (
                                <li key={link.label}>
                                    <Link
                                        href={link.href}
                                        className="
                                            group
                                            flex items-center gap-2
                                            text-zinc-600
                                            dark:text-zinc-400
                                            hover:text-emerald-600
                                            dark:hover:text-emerald-500
                                            transition-colors
                                            duration-200
                                        "
                                    >
                                        {link.icon && <link.icon className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />}
                                        <span>{link.label}</span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Resources Column */}
                    <div>
                        <h3 className="text-sm font-bold uppercase tracking-wider text-zinc-900 dark:text-zinc-50 mb-4">
                            Resources
                        </h3>
                        <ul className="space-y-3">
                            {footerLinks.resources.map((link) => (
                                <li key={link.label}>
                                    {link.external ? (
                                        <a
                                            href={link.href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="
                                                group
                                                flex items-center gap-2
                                                text-zinc-600
                                                dark:text-zinc-400
                                                hover:text-emerald-600
                                                dark:hover:text-emerald-500
                                                transition-colors
                                                duration-200
                                            "
                                        >
                                            {link.icon && <link.icon className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />}
                                            <span>{link.label}</span>
                                        </a>
                                    ) : (
                                        <Link
                                            href={link.href}
                                            className="
                                                group
                                                flex items-center gap-2
                                                text-zinc-600
                                                dark:text-zinc-400
                                                hover:text-emerald-600
                                                dark:hover:text-emerald-500
                                                transition-colors
                                                duration-200
                                            "
                                        >
                                            {link.icon && <link.icon className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />}
                                            <span>{link.label}</span>
                                        </Link>
                                    )}
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Legal Column */}
                    <div>
                        <h3 className="text-sm font-bold uppercase tracking-wider text-zinc-900 dark:text-zinc-50 mb-4">
                            Legal
                        </h3>
                        <ul className="space-y-3">
                            {footerLinks.legal.map((link) => (
                                <li key={link.label}>
                                    <Link
                                        href={link.href}
                                        className="
                                            text-zinc-600
                                            dark:text-zinc-400
                                            hover:text-emerald-600
                                            dark:hover:text-emerald-500
                                            transition-colors
                                            duration-200
                                        "
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="
                    pt-8
                    border-t
                    border-zinc-200
                    dark:border-zinc-800
                    flex
                    flex-col
                    md:flex-row
                    items-center
                    justify-between
                    gap-4
                ">
                    {/* Copyright */}
                    <div className="flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400">
                        <span>© {new Date().getFullYear()}</span>
                        <span className="font-bold text-zinc-900 dark:text-zinc-200">Clipposaurus</span>
                        <span>· All rights reserved</span>
                    </div>

                    {/* Trust Badges */}
                    <div className="flex items-center gap-4 text-xs text-zinc-500 dark:text-zinc-500">
                        <div className="flex items-center gap-1.5">
                            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                            <span>256-bit Encrypted</span>
                        </div>
                        <div className="w-px h-4 bg-zinc-300 dark:bg-zinc-700" />
                        <div className="flex items-center gap-1.5">
                            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                            <span>Zero Knowledge</span>
                        </div>
                        <div className="w-px h-4 bg-zinc-300 dark:bg-zinc-700" />
                        <div className="flex items-center gap-1.5">
                            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                            <span>Open Source</span>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
});

FooterContainer.displayName = "FooterContainer";

