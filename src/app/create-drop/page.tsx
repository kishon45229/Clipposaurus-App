import React from 'react';
import ErrorFallback from "@/app/error";
import LoadingFallback from "@/app/loading";
import { Menu } from "@/components/custom/create-drop/Menu";
import { Tab } from "@/components/custom/create-drop/tab";
import { CreateDropProvider } from "@/contexts/CreateDropContext";
import { ComponentDataProvider } from "@/contexts/ComponentDataContext";
import { MenuProvider } from "@/contexts/MenuContext";
import { CreateDropDialogBox } from "@/components/custom/create-drop/dialog-box";

const PAGE_ID = "CreateDropPage" as const;

/**
 * CREATE DROP PAGE COMPONENT
 * @returns SERVER COMPONENT
 */
export default async function CreateDropPage(): Promise<React.ReactElement> {
    try {
        return (
            <ComponentDataProvider>
                <React.Suspense fallback={<LoadingFallback />}>
                    <CreateDropProvider>
                        <MenuProvider>
                            <section className="h-screen xs-min:h-[84dvh] max-w-480mx-auto py-2 sm:py-4">
                                <div className="xl:hidden grid grid-rows-[auto] h-full">
                                    <Tab />
                                </div>
                                <div className="hidden xl:grid xl:grid-cols-[3fr_1.5fr] gap-2 h-full">
                                    <div><Tab /></div>
                                    <div><Menu /></div>
                                </div>
                                <CreateDropDialogBox />
                            </section>
                        </MenuProvider>
                    </CreateDropProvider>
                </React.Suspense>
            </ComponentDataProvider>
        );
    } catch (error) {
        return (
            <ErrorFallback
                error={error instanceof Error ? error : new Error(`An unexpected error occurred while loading the ${PAGE_ID}`)}
                reset={() => window?.location.reload()}
            />
        );
    }
}