import React from "react";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

interface Props {
    type: string;
    clearAllContent: () => void;
}

export const DeleteAlertDialog = React.memo(({ type = "content", clearAllContent }: Props) => {
    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button
                    variant="destructive"
                    size="icon"
                    aria-label={`Delete all ${type}`}
                    className="
                        rounded-2xl
                        size-[clamp(1.75rem,5vw,2rem)]
                    "
                >
                    <Trash2 className="size-[clamp(0.85rem,3vw,1rem)]" />
                </Button>
            </AlertDialogTrigger>

            <AlertDialogContent
                className="
                    relative
                    rounded-xl
                    border border-zinc-200/50 dark:border-zinc-800/50
                    bg-gradient-to-br from-zinc-100 to-zinc-300
                    dark:from-zinc-900/70 dark:to-zinc-950/50
                    backdrop-blur-xl shadow-inner
                    px-[clamp(1rem,4vw,1.5rem)]
                    py-[clamp(1.25rem,5vw,1.75rem)]
                    transition-all duration-300
                "
            >
                {/* Ambient glow */}
                <div className="absolute inset-0 pointer-events-none rounded-2xl">
                    <div className="absolute inset-0 bg-emerald-500/5 blur-2xl" />
                </div>

                <AlertDialogHeader
                    className="
                        relative
                        gap-[clamp(0.4rem,2vw,0.6rem)]
                    "
                >
                    <AlertDialogTitle
                        className="
                            font-semibold
                            text-zinc-900 dark:text-zinc-100
                            text-[clamp(0.75rem,2.5vw,0.85rem)]
                        "
                    >
                        Are you sure you want to delete all the {type}?
                    </AlertDialogTitle>

                    <AlertDialogDescription
                        className="
                            leading-relaxed
                            text-zinc-700 dark:text-zinc-300
                            text-[clamp(0.7rem,2.25vw,0.8rem)]
                        "
                    >
                        This action cannot be undone. This will permanently delete your {type}.
                    </AlertDialogDescription>
                </AlertDialogHeader>

                <AlertDialogFooter
                    className="
                        relative
                        mt-[clamp(0.75rem,3vw,1rem)]
                        gap-[clamp(0.5rem,3vw,0.75rem)]
                    "
                >
                    <AlertDialogCancel
                        className="
                            w-full
                            rounded-lg
                            text-[clamp(0.7rem,2.25vw,0.8rem)]
                            h-[clamp(1.75rem,5vw,2rem)]
                        "
                    >
                        Cancel
                    </AlertDialogCancel>

                    <AlertDialogAction
                        onClick={clearAllContent}
                        className="
                            w-full
                            rounded-lg
                            text-[clamp(0.7rem,2.25vw,0.8rem)]
                            h-[clamp(1.75rem,5vw,2rem)]
                        "
                    >
                        Delete
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
});

DeleteAlertDialog.displayName = "DeleteAlertDialog";

