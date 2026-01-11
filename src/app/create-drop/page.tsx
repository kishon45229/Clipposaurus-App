import React from 'react';
import LoadingFallback from "@/app/loading";
import { Tab } from "@/components/custom/create-drop/tab";
import { Header } from "@/components/custom/create-drop/Header";
import { CreateDropProvider } from "@/contexts/CreateDropContext";
import { ComponentDataProvider } from "@/contexts/ComponentDataContext";
import { HeaderProvider } from "@/contexts/HeaderContext";
import { CreateDropDialogBox } from "@/components/custom/create-drop/dialog-box";

/**
 * CREATE DROP PAGE COMPONENT
 * @returns SERVER COMPONENT
 */
export default async function CreateDropPage(): Promise<React.ReactElement> {
    return (
        <ComponentDataProvider>
            <React.Suspense fallback={<LoadingFallback />}>
                <CreateDropProvider>
                    <HeaderProvider>
                        <section className="flex flex-col h-screen xs-min:h-[90dvh] max-w-7xl mx-auto ">
                            {/* Header Toolbar */}
                            <div className="px-2 sm:px-4">
                                <Header />
                            </div>

                            {/* Main Content Area - Full Width Tabs */}
                            <div className="flex-1 min-h-0 p-2 sm:p-4">
                                <Tab />
                            </div>

                            <CreateDropDialogBox />
                        </section>
                    </HeaderProvider>
                </CreateDropProvider>
            </React.Suspense>
        </ComponentDataProvider>
    );
}