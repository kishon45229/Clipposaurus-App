"use client";

import React from "react";
import { Zap, Lock, Timer, Smartphone, Code, Globe } from "lucide-react";

const features = [
    {
        icon: Lock,
        title: "End-to-End Encrypted",
        description: "Your content is encrypted on your device before upload. We never see your data."
    },
    {
        icon: Timer,
        title: "Auto-Expiring Drops",
        description: "Set expiration times or one-time access. Content disappears automatically."
    },
    {
        icon: Smartphone,
        title: "Cross-Device Sync",
        description: "Seamlessly move content between your phone, tablet, and computer."
    },
    {
        icon: Zap,
        title: "Lightning Fast",
        description: "Share instantly without waiting. No upload limits, no compression."
    },
    {
        icon: Code,
        title: "Developer Friendly",
        description: "Share code snippets with syntax highlighting and formatting preserved."
    },
    {
        icon: Globe,
        title: "No Account Required",
        description: "Start sharing immediately. No sign-ups, no tracking, no hassle."
    }
];

export const FeaturesSection = () => {
    return (
        <section className="w-full py-24 px-4 bg-white dark:bg-zinc-950">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="text-center mb-16 space-y-4">
                    <h2 className="text-4xl lg:text-5xl font-black text-zinc-900 dark:text-zinc-50">
                        Built for
                        <span className="bg-gradient-to-r from-emerald-600 to-emerald-500 dark:from-emerald-500 dark:to-emerald-600 bg-clip-text text-transparent">
                            {" "}Privacy{" "}
                        </span>
                        & Speed
                    </h2>
                    <p className="text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
                        Everything you need to share content securely across devices without compromising your privacy
                    </p>
                </div>

                {/* Features Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className="
                group
                relative
                p-8
                rounded-2xl
                border-2
                border-zinc-200
                dark:border-zinc-800
                bg-gradient-to-br
                from-white
                to-zinc-50/50
                dark:from-zinc-900
                dark:to-zinc-900/50
                hover:border-emerald-500/50
                dark:hover:border-emerald-500/50
                hover:shadow-xl
                hover:shadow-emerald-500/10
                transition-all
                duration-300
                cursor-default
              "
                        >
                            {/* Icon */}
                            <div className="
                inline-flex
                items-center
                justify-center
                w-14
                h-14
                rounded-xl
                bg-gradient-to-br
                from-emerald-500/20
                to-emerald-600/10
                dark:from-emerald-500/10
                dark:to-emerald-600/5
                border
                border-emerald-500/20
                mb-6
                group-hover:scale-110
                transition-transform
                duration-300
              ">
                                <feature.icon className="w-7 h-7 text-emerald-600 dark:text-emerald-500" strokeWidth={2.5} />
                            </div>

                            {/* Content */}
                            <h3 className="
                text-xl
                font-bold
                text-zinc-900
                dark:text-zinc-50
                mb-3
              ">
                                {feature.title}
                            </h3>

                            <p className="
                text-zinc-600
                dark:text-zinc-400
                leading-relaxed
              ">
                                {feature.description}
                            </p>

                            {/* Decorative corner */}
                            <div className="
                absolute
                top-0
                right-0
                w-20
                h-20
                bg-gradient-to-bl
                from-emerald-500/5
                to-transparent
                rounded-tr-2xl
                rounded-bl-full
                opacity-0
                group-hover:opacity-100
                transition-opacity
                duration-300
              " />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};
