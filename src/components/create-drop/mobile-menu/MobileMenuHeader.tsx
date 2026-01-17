"use client";

import {
  ResponsiveDialogTitle,
  ResponsiveDialogDescription,
} from "@/components/ui/responsive-dialog";
import { useMenu } from "@/contexts/MenuContext";

export const MobileMenuHeader = () => {
  const { data } = useMenu();
  const { title, description } = data;

  return (
    <div className="text-center space-y-1">
      <ResponsiveDialogTitle className="font-bold tracking-tight text-[clamp(1.125rem,4vw,1.375rem)] text-zinc-900 dark:text-zinc-100 leading-tight">
        {title}
      </ResponsiveDialogTitle>

      <ResponsiveDialogDescription className="text-[clamp(0.8rem,3vw,0.9rem)] text-zinc-600 dark:text-zinc-400 leading-snug max-w-sm mx-auto">
        {description}
      </ResponsiveDialogDescription>
    </div>
  );
};
