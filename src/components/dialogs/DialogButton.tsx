import React from "react";
import { Button } from "@/components/ui/button";
import type { DialogButtonProps } from "./types";

export const DialogButton = React.memo<DialogButtonProps>(
    ({ text, onClick, variant = "default", size = "lg", icon }) => {
        return (
            <Button
                size={size}
                variant={variant}
                onClick={onClick}
                className="
          w-full
          min-w-[min(220px,100%)]
          rounded-2xl
          py-[clamp(0.75rem,3.5vw,1.25rem)]
          text-[clamp(0.75rem,3vw,1rem)]
          font-semibold
          bg-emerald-600 hover:bg-emerald-500
          text-white
          shadow-lg shadow-emerald-600/30
          transition-all duration-300
          hover:-translate-y-0.5 hover:shadow-xl
          disabled:opacity-70
        "
            >
                {icon && (
                    <span className="mr-2 flex items-center text-[clamp(0.875rem,3vw,1.125rem)]">
                        {icon}
                    </span>
                )}
                {text}
            </Button>
        );
    }
);

DialogButton.displayName = "DialogButton";
