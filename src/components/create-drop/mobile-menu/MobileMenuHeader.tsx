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
    <div className="text-center space-y-[clamp(0.25rem,1vw,0.5rem)]">
      <ResponsiveDialogTitle className="font-semibold tracking-tight text-[clamp(1.25rem,3.5vw,1.5rem)] text-emerald-600 dark:text-emerald-500">
        {title}
      </ResponsiveDialogTitle>

      <ResponsiveDialogDescription className="text-[clamp(0.75rem,3vw,1.125rem)] text-zinc-600 dark:text-zinc-400">
        {description}
      </ResponsiveDialogDescription>
    </div>
  );
};
