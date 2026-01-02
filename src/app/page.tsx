import React from "react";
import ErrorFallback from "@/app/error";
import LoadingFallback from "@/app/loading";
import { ComponentDataProvider } from "@/contexts/ComponentDataContext";
import { HeroProvider } from "@/contexts/HeroContext";
import { Hero } from "@/components/custom/home/hero";
import { PrivacyInfoCardProvider } from "@/contexts/PrivacyInforCardContext";
import { PrivacyInfoCard } from "@/components/custom/home/privacy-info-card";

const PAGE_ID = "HomePage" as const;

export default async function HomePage(): Promise<React.ReactElement> {
  try {
    return (
      <ComponentDataProvider>
        <React.Suspense fallback={<LoadingFallback />}>
          <section
            aria-label="Hero and Privacy Information"
            className="
              grid
              grid-cols-1
              2xl-min:grid-cols-[1.25fr_1fr]
              gap-[clamp(1rem,4vw,3rem)]
              px-[clamp(0.75rem,3vw,2rem)]
              py-[clamp(0.75rem,3vw,1rem)]
              max-w-[1920px]
              mx-auto
              lg:landscape:min-h-[84dvh]
            "
          >
            <HeroProvider>
              <Hero />
            </HeroProvider>

            <PrivacyInfoCardProvider>
              <PrivacyInfoCard />
            </PrivacyInfoCardProvider>
          </section>
        </React.Suspense>
      </ComponentDataProvider>
    );
  } catch (error) {
    return (
      <ErrorFallback
        error={
          error instanceof Error
            ? error
            : new Error(`An unexpected error occurred while loading ${PAGE_ID}`)
        }
        reset={() => window?.location.reload()}
      />
    );
  }
}
