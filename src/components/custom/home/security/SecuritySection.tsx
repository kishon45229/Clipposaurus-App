"use client";

import React from "react";
import { Shield, Eye, Server, Clock } from "lucide-react";

const securityFeatures = [
    {
        icon: Shield,
        title: "Zero-Knowledge Encryption",
        stat: "AES-256",
        description: "Military-grade encryption happens on your device. We can't see your content even if we wanted to."
    },
    {
        icon: Eye,
        title: "No Tracking",
        stat: "0 Logs",
        description: "We don't track, store, or analyze your activity. What you share stays between you and your recipient."
    },
    {
        icon: Server,
        title: "No Data Retention",
        stat: "Auto-Delete",
        description: "Content is automatically deleted after access or expiration. Nothing remains on our servers."
    },
    {
        icon: Clock,
        title: "Time-Limited Access",
        stat: "Custom TTL",
        description: "Set your own expiration time. From minutes to days, you control how long content is available."
    }
];

export const SecuritySection = () => {
    return (
        <section className="
      relative
      w-full
      py-24
      px-4
      bg-zinc-900
      dark:bg-black
      overflow-hidden
    ">
            {/* Decorative elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-30">
                <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_20%,rgba(16,185,129,0.1),transparent_50%)]" />
                <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_70%_80%,rgba(16,185,129,0.1),transparent_50%)]" />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto">
                {/* Header */}
                <div className="text-center mb-16 space-y-4">
                    <div className="
            inline-flex
            items-center
            justify-center
            px-4
            py-2
            rounded-full
            bg-emerald-500/10
            border
            border-emerald-500/20
            mb-4
          ">
                        <Shield className="w-5 h-5 text-emerald-500 mr-2" />
                        <span className="text-sm font-bold uppercase tracking-wider text-emerald-500">
                            Military-Grade Security
                        </span>
                    </div>

                    <h2 className="text-4xl lg:text-5xl font-black text-white">
                        Your Privacy is
                        <span className="bg-gradient-to-r from-emerald-400 to-emerald-600 bg-clip-text text-transparent">
                            {" "}Non-Negotiable
                        </span>
                    </h2>
                    <p className="text-lg text-zinc-400 max-w-2xl mx-auto">
                        Built from the ground up with privacy-first architecture. We don't just promise security—we guarantee it.
                    </p>
                </div>

                {/* Security features */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {securityFeatures.map((feature, index) => (
                        <div
                            key={index}
                            className="
                group
                relative
                p-8
                rounded-2xl
                border-2
                border-zinc-800
                bg-gradient-to-br
                from-zinc-900/50
                to-zinc-950/50
                hover:border-emerald-500/50
                hover:shadow-2xl
                hover:shadow-emerald-500/20
                transition-all
                duration-300
                backdrop-blur-sm
              "
                        >
                            <div className="flex items-start gap-6">
                                {/* Icon */}
                                <div className="
                  flex-shrink-0
                  inline-flex
                  items-center
                  justify-center
                  w-16
                  h-16
                  rounded-xl
                  bg-emerald-500/10
                  border
                  border-emerald-500/20
                  group-hover:scale-110
                  group-hover:bg-emerald-500/20
                  transition-all
                  duration-300
                ">
                                    <feature.icon className="w-8 h-8 text-emerald-500" strokeWidth={2} />
                                </div>

                                {/* Content */}
                                <div className="flex-1">
                                    {/* Stat badge */}
                                    <div className="
                    inline-block
                    px-3
                    py-1
                    rounded-lg
                    bg-emerald-500/10
                    border
                    border-emerald-500/20
                    mb-3
                  ">
                                        <span className="text-sm font-bold text-emerald-500">
                                            {feature.stat}
                                        </span>
                                    </div>

                                    <h3 className="
                    text-xl
                    font-bold
                    text-white
                    mb-2
                  ">
                                        {feature.title}
                                    </h3>

                                    <p className="
                    text-zinc-400
                    leading-relaxed
                  ">
                                        {feature.description}
                                    </p>
                                </div>
                            </div>

                            {/* Corner decoration */}
                            <div className="
                absolute
                bottom-0
                right-0
                w-24
                h-24
                bg-gradient-to-tl
                from-emerald-500/10
                to-transparent
                rounded-br-2xl
                rounded-tl-full
                opacity-0
                group-hover:opacity-100
                transition-opacity
                duration-300
              " />
                        </div>
                    ))}
                </div>

                {/* Trust indicators */}
                <div className="
          mt-16
          pt-12
          border-t
          border-zinc-800
          flex
          flex-wrap
          items-center
          justify-center
          gap-12
        ">
                    <div className="text-center">
                        <div className="text-4xl font-black text-white mb-2">256-bit</div>
                        <div className="text-sm font-semibold uppercase tracking-wider text-zinc-500">
                            Encryption
                        </div>
                    </div>
                    <div className="text-center">
                        <div className="text-4xl font-black text-white mb-2">0 Logs</div>
                        <div className="text-sm font-semibold uppercase tracking-wider text-zinc-500">
                            No Tracking
                        </div>
                    </div>
                    <div className="text-center">
                        <div className="text-4xl font-black text-white mb-2">100%</div>
                        <div className="text-sm font-semibold uppercase tracking-wider text-zinc-500">
                            Private
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
