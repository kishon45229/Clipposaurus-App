"use client";

import React from "react";
import { Plus, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useDropOptions } from "@/contexts/DropOptionsContext";

export const CTASection = () => {
    const { handleCreateDrop } = useDropOptions();

    return (
        <section className="
      relative
      w-full
      py-32
      px-4
      overflow-hidden
      bg-gradient-to-br
      from-emerald-600
      via-emerald-500
      to-emerald-600
    ">
            {/* Background pattern */}
            <div className="absolute inset-0 opacity-10">
                <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,.2)_50%,transparent_75%,transparent_100%)] bg-[length:250px_250px]" />
            </div>

            <div className="relative z-10 max-w-4xl mx-auto text-center">
                {/* Content */}
                <div className="space-y-8">
                    <h2 className="
            text-5xl
            lg:text-6xl
            font-black
            text-white
            leading-tight
          ">
                        Ready to Share
                        <br />
                        <span className="text-white/90">
                            Without Compromise?
                        </span>
                    </h2>

                    <p className="
            text-xl
            lg:text-2xl
            text-white/90
            max-w-2xl
            mx-auto
            leading-relaxed
          ">
                        Start sharing content securely right now. No account needed, no credit card required.
                    </p>

                    {/* CTA Buttons */}
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-8">
                        <Button
                            onClick={handleCreateDrop}
                            size="lg"
                            className="
                group
                h-16
                px-12
                text-lg
                font-bold
                text-emerald-600
                bg-white
                hover:bg-zinc-50
                rounded-2xl
                shadow-2xl
                shadow-black/20
                hover:shadow-black/30
                hover:scale-105
                transition-all
                duration-300
              "
                        >
                            <span className="flex items-center gap-3">
                                <Plus className="w-6 h-6 group-hover:rotate-90 transition-transform duration-300" />
                                <span>Create Your First Drop</span>
                                <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform duration-300" />
                            </span>
                        </Button>
                    </div>

                    {/* Trust badges */}
                    <div className="pt-12 flex flex-wrap items-center justify-center gap-8 text-white/80">
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-white rounded-full" />
                            <span className="text-sm font-medium">No Account Required</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-white rounded-full" />
                            <span className="text-sm font-medium">Free Forever</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-white rounded-full" />
                            <span className="text-sm font-medium">End-to-End Encrypted</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
