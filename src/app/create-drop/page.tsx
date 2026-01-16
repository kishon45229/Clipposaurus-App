import React from 'react';
import LoadingFallback from "@/app/loading";
import { Tab } from "@/components/create-drop/tab";
import { Header } from "@/components/create-drop/header";
import { CreateDropProvider } from "@/contexts/CreateDropContext";
import { HeaderProvider } from "@/contexts/HeaderContext";
import { CreateDropDialogBox } from "@/components/create-drop/dialog-box";
import { MobileMenu } from "@/components/create-drop/mobile-menu";
import { MenuProvider } from '@/contexts/MenuContext';

/**
 * CREATE DROP PAGE COMPONENT
 * @returns SERVER COMPONENT
 */
export default async function CreateDropPage(): Promise<React.ReactElement> {
    return (
        <React.Suspense fallback={<LoadingFallback />}>
            <CreateDropProvider>
                <HeaderProvider>
                    <MenuProvider>
                        <section className="flex flex-col h-screen xs-min:h-[90dvh] max-w-7xl mx-auto overflow-hidden">
                            {/* Header Toolbar - Hidden on mobile and tablet, visible on desktop only */}
                            <div className="hidden lg:block px-2 sm:px-4">
                                <Header />
                            </div>

                            {/* Main Content Area - Full Width Tabs */}
                            <div className="flex-1 min-h-0 p-2 sm:p-4">
                                <Tab />
                            </div>

                            <CreateDropDialogBox />
                            <MobileMenu />
                        </section>
                    </MenuProvider>
                </HeaderProvider>
            </CreateDropProvider>
        </React.Suspense>
    );
}