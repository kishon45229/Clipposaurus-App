import { DropSidebarProvider } from "@/contexts/DropSidebarContext";
import { DropSidebar } from "@/components/open-drop/sidebar";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { DropItemsPreviewContainer } from "@/components/open-drop/content/DropItemsPreviewContainer";

export const DropContent = () => {
    return (
        <SidebarProvider
            defaultOpen={true}
            mobileBehavior="inline"
            mobileDefaultOpen={false}
        >
            <div className="flex h-full w-full max-w-7xl mx-auto box-border rounded-2xl shadow-lg overflow-hidden bg-zinc-100 dark:bg-zinc-900" role="main">
                <DropSidebarProvider>
                    <DropSidebar />
                </DropSidebarProvider>
                <SidebarInset className="flex-1 w-full h-full">
                    <DropItemsPreviewContainer />
                </SidebarInset>
            </div>
        </SidebarProvider>
    );
};