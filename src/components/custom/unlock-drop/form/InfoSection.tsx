"use client";

export const InfoSection = () => {
    return (
        <div className="w-full max-w-4xl space-y-6">
            {/* Additional Help Text */}
            <div className="text-center pt-4 border-t border-zinc-200/50 dark:border-zinc-800/50">
                <p className="text-sm text-zinc-500 dark:text-zinc-500">
                    Need help? Make sure you have the complete drop key from the sender.
                </p>
                <p className="text-xs text-zinc-400 dark:text-zinc-600 mt-2">
                    Drop keys expire after viewing or on the scheduled date.
                </p>
            </div>
        </div>
    );
};