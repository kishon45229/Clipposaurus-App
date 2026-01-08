"use client";

import React from "react";
import { Upload, Key, Download, CheckCircle } from "lucide-react";

const steps = [
    {
        icon: Upload,
        title: "Create a Drop",
        description: "Upload text, code, or files. Everything is encrypted instantly on your device.",
        stepNumber: "01"
    },
    {
        icon: Key,
        title: "Get Your Key",
        description: "Receive a unique drop key. Share it securely with your other device or recipient.",
        stepNumber: "02"
    },
    {
        icon: Download,
        title: "Unlock & Access",
        description: "Enter the drop key on any device to decrypt and access your content.",
        stepNumber: "03"
    },
    {
        icon: CheckCircle,
        title: "Auto-Delete",
        description: "Content expires after access or time limit. Zero trace left on our servers.",
        stepNumber: "04"
    }
];

export const HowItWorksSection = () => {
    return (
        <section className="
      relative
      w-full
      py-24
      px-4
      overflow-hidden
      bg-gradient-to-b
      from-zinc-50
      to-white
      dark:from-zinc-900
      dark:to-zinc-950
    ">
            {/* Background decoration */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl" />
                <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-zinc-500/5 rounded-full blur-3xl" />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto">
                {/* Header */}
                <div className="text-center mb-20 space-y-4">
                    <h2 className="text-4xl lg:text-5xl font-black text-zinc-900 dark:text-zinc-50">
                        How It
                        <span className="bg-gradient-to-r from-emerald-600 to-emerald-500 dark:from-emerald-500 dark:to-emerald-600 bg-clip-text text-transparent">
                            {" "}Works
                        </span>
                    </h2>
                    <p className="text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
                        Share content in four simple steps. No accounts, no complexity, just pure privacy.
                    </p>
                </div>

                {/* Steps */}
                <div className="relative">
                    {/* Connection line */}
                    <div className="
            hidden
            lg:block
            absolute
            top-1/2
            left-0
            right-0
            h-0.5
            bg-gradient-to-r
            from-transparent
            via-zinc-300
            to-transparent
            dark:via-zinc-700
            -translate-y-1/2
          " />

                    {/* Steps grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {steps.map((step, index) => (
                            <div
                                key={index}
                                className="relative flex flex-col items-center text-center"
                            >
                                {/* Step number */}
                                <div className="
                  absolute
                  -top-6
                  text-7xl
                  font-black
                  text-zinc-100
                  dark:text-zinc-900
                  select-none
                  pointer-events-none
                ">
                                    {step.stepNumber}
                                </div>

                                {/* Icon container */}
                                <div className="
                  relative
                  z-10
                  inline-flex
                  items-center
                  justify-center
                  w-20
                  h-20
                  rounded-2xl
                  bg-gradient-to-br
                  from-emerald-500
                  to-emerald-600
                  shadow-lg
                  shadow-emerald-500/30
                  mb-6
                  group
                  hover:scale-110
                  transition-transform
                  duration-300
                ">
                                    <step.icon className="w-10 h-10 text-white" strokeWidth={2.5} />

                                    {/* Pulse ring */}
                                    <div className="
                    absolute
                    inset-0
                    rounded-2xl
                    border-2
                    border-emerald-400
                    opacity-0
                    group-hover:opacity-100
                    group-hover:animate-ping
                  " />
                                </div>

                                {/* Content */}
                                <h3 className="
                  text-xl
                  font-bold
                  text-zinc-900
                  dark:text-zinc-50
                  mb-3
                ">
                                    {step.title}
                                </h3>

                                <p className="
                  text-zinc-600
                  dark:text-zinc-400
                  leading-relaxed
                  max-w-xs
                ">
                                    {step.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};
