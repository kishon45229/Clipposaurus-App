import React from "react";
import {
  KeyRound,
  Lock,
  Server,
  Download,
  Trash2,
  ChevronDown,
  ArrowRight,
} from 'lucide-react';
import type { DocsPageSection } from "@/types/contentData-types/docs-types";

interface DesignSectionData {
  title: string;
  icon: string;
  description: string;
}

interface DesignSectionProps {
  section: DocsPageSection;
}

const getIcon = (iconName: string) => {
  const iconMap = {
    KeyRound,
    Lock,
    Server,
    Download,
    Trash2
  };
  return iconMap[iconName as keyof typeof iconMap] || KeyRound;
};

export const DesignSection = React.memo<DesignSectionProps>(({ section }) => {
  if (!section.data || !Array.isArray(section.data)) return null;

  const stages = section.data as DesignSectionData[];

  return (
    <section id={section.id}>
      <div className="relative">
        {/* Desktop Flow */}
        <div className="hidden md:block">
          <div className="flex items-start justify-around gap-4 p-6">
            {stages.map((stage, index) => {
              const IconComponent = getIcon(stage.icon);

              return (
                <React.Fragment key={index}>
                  <div className="flex flex-col items-center gap-3">
                    <div className="relative group cursor-pointer transition-all duration-300 transform">
                      {/* Stage Circle */}
                      <div className="flex items-center justify-center w-16 h-16 rounded-full border border-zinc-500 shadow-lg transition-all duration-300">
                        <IconComponent className="w-8 h-8 text-emerald-500" />
                      </div>

                      {/* Stage Number */}
                      <div className="absolute -top-2 -left-2 w-6 h-6 bg-emerald-500 text-white dark:text-zinc-900 text-xs font-bold rounded-full flex items-center justify-center">
                        {index + 1}
                      </div>
                    </div>

                    {/* Stage Info */}
                    <div className="text-center max-w-24">
                      <div className="text-sm font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                        {stage.title}
                      </div>
                      <div className="text-xs text-zinc-600 dark:text-zinc-400 leading-tight">
                        {stage.description}
                      </div>
                    </div>
                  </div>

                  {/* Arrow between stages - centered vertically */}
                  {index < stages.length - 1 && (
                    <div className="flex items-center justify-center h-full my-auto">
                      <ArrowRight className="w-6 h-6 text-zinc-400 dark:text-zinc-600" />
                    </div>
                  )}
                </React.Fragment>
              );
            })}
          </div>
        </div>

        {/* Mobile Flow */}
        <div className="md:hidden space-y-4">
          {stages.map((stage, index) => {
            const IconComponent = getIcon(stage.icon || 'KeyRound');

            return (
              <div key={index} className="space-y-2">
                <div className="flex items-center gap-4 p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-100/50 dark:bg-zinc-900/30">
                  {/* Stage Circle */}
                  <div className="w-12 h-12 rounded-full border border-zinc-500 flex items-center justify-center relative">
                    <IconComponent className="w-6 h-6 text-emerald-500" />
                    <div className="absolute -top-1 -right-1 w-5 h-5 bg-zinc-600 dark:bg-zinc-300 text-white dark:text-zinc-900 text-xs font-bold rounded-full flex items-center justify-center">
                      {index + 1}
                    </div>
                  </div>

                  {/* Stage Info */}
                  <div className="flex-1">
                    <div className="text-base font-semibold text-zinc-900 dark:text-zinc-100 mb-1">
                      {stage.title}
                    </div>
                    <div className="text-sm text-zinc-600 dark:text-zinc-400">
                      {stage.description}
                    </div>
                  </div>
                </div>

                {index < stages.length - 1 && (
                  <div className="flex items-center justify-center h-full my-auto">
                    <ChevronDown className="w-6 h-6 text-zinc-400 dark:text-zinc-600" />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
});

DesignSection.displayName = 'DesignSection';
