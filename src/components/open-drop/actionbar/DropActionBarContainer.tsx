import { DropActionBarTrigger } from "@/components/open-drop/actionbar/DropActionBarTrigger";
import { DropActionBarOptions } from "@/components/open-drop/actionbar/DropActionBarOptions";

export const DropActionBarContainer = () => {
    return (
        <div className="border-b border-zinc-200/60 dark:border-zinc-800/60 bg-zinc-50/40 dark:bg-zinc-900/40 backdrop-blur-md">
            <div className="p-4">
                <div className="flex items-center justify-between gap-4">
                    <DropActionBarTrigger />
                    <DropActionBarOptions />
                </div>
            </div>
        </div>
    );
};