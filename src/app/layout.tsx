import React from "react";
import "./globals.css";

import Toaster from "@/components/ui/toaster";
import { siteMetadata } from "@/lib/siteMetaData";
import { HeadTags } from "@/components/common/HeadTags";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Provider as RollbarProvider } from "@rollbar/react";
import { clientConfig } from "@/lib/rollbar";
import { StorageChecker } from "@/components/common/StorageChecker";
import { DropSessionMonitor } from "@/components/common/DropSessionMonitor";
import { Funnel_Sans } from "next/font/google";
import TargetCursor from "@/components/TargetCursor";
import { OfflineAlert } from "@/components/common/OfflineAlert";
import { ThemeProvider } from "@/components/theme-provider";
import { NavbarProvider } from "@/contexts/NavbarContext";
import { FooterProvider } from "@/contexts/FooterContext";
import { ComponentDataProvider } from "@/contexts/ComponentDataContext";
import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"

export { siteMetadata as metadata };

const funnelSans = Funnel_Sans({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <RollbarProvider config={clientConfig}>
      <html lang="en" suppressHydrationWarning>
        <head>
          <HeadTags />
        </head>
        <body className={`${funnelSans.className} antialiased h-screen md:portrait:h-fit overflow-auto bg-zinc-100 dark:bg-zinc-950 text-foreground`}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <DropSessionMonitor />
            <TargetCursor
              spinDuration={2}
              hideDefaultCursor={true}
            />
            <OfflineAlert />
            <div className="flex flex-col min-h-screen md:portrait:min-h-screen md:portrait:justify-center md:portrait:py-10 md:portrait:gap-8 px-1 xs-min:px-2 sm:portrait:px-4 md:portrait:px-8 sm:landscape:px-4 md:landscape:px-6 bg-zinc-50 dark:bg-zinc-950">
              <ComponentDataProvider>
                <div className="sticky top-0 z-10 portrait:h-[14dvh] xs-min:portrait:h-[8dvh] landscape:h-[16dvh] sm:landscape:h-[12dvh] lg:landscape:h-[8dvh] flex-shrink-0 w-full bg-zinc-50/80 dark:bg-zinc-950/80 backdrop-blur-sm border-b border-zinc-200 dark:border-zinc-800 md:portrait:static md:portrait:h-auto md:portrait:bg-transparent md:portrait:backdrop-blur-0 md:portrait:border-b-0">
                  <NavbarProvider>
                    <Navbar />
                  </NavbarProvider>
                </div>
                <div className="min-h-[84dvh] md:portrait:min-h-0 md:portrait:h-auto md:portrait:flex-none">
                  <StorageChecker>
                    {children}
                     <Analytics />
                    <SpeedInsights />
                    <Toaster />
                  </StorageChecker>
                </div>
                <div className="portrait:h-[20dvh] xs-min:portrait:h-[8dvh] landscape:h-[16dvh] lg:landscape:h-[8dvh] flex-shrink-0 md:portrait:h-auto md:portrait:flex-none">
                  <FooterProvider>
                    <Footer />
                  </FooterProvider>
                </div>
              </ComponentDataProvider>
            </div>
          </ThemeProvider>
        </body>
      </html>
    </RollbarProvider>
  );
}
