"use client";

import { HeaderRetention } from "@/components/custom/create-drop/Header/HeaderRetention";
import { HeaderUserSecret } from "@/components/custom/create-drop/Header/HeaderUserSecret";
import { HeaderCreateButton } from "@/components/custom/create-drop/Header/HeaderCreateButton";

export const HeaderContent = () => {
    return (
        <div className="w-full shrink-0 bg-white dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800">
            <div className="flex items-center justify-between gap-4 max-w-7xl mx-auto px-4 h-14">
                {/* Left: Retention Controls */}
                <div className="flex items-center">
                    <HeaderRetention />
                </div>

                {/* Center: User Secret Input */}
                <div className="flex-1 max-w-md">
                    <HeaderUserSecret />
                </div>

                {/* Right: Create Button */}
                <div className="flex items-center">
                    <HeaderCreateButton />
                </div>
            </div>
        </div>
    );
};