import React from "react";
import ErrorFallback from "@/app/error";
import LoadingFallback from "@/app/loading";
import { ComponentDataProvider } from "@/contexts/ComponentDataContext";
import { HeroProvider } from "@/contexts/HeroContext";
import { Hero } from "@/components/custom/home/hero";

const PAGE_ID = "HomePage" as const;

export default async function HomePage(): Promise<React.ReactElement> {
  try {
    return (
      <ComponentDataProvider>
        <React.Suspense fallback={<LoadingFallback />}>
          {/* Hero Section - Full width */}
          <section
            aria-label="Hero Section"
            className="
              w-full
              min-h-[calc(100dvh-5rem)]
              flex
              items-center
              justify-center
              px-4
              py-8
            "
          >
            <HeroProvider>
              <Hero />
            </HeroProvider>
          </section>

          {/* Features Section */}
          {/* <FeaturesSection /> */}

          {/* How It Works Section */}
          {/* <HowItWorksSection /> */}

          {/* Security Section */}
          {/* <SecuritySection /> */}

          {/* CTA Section */}
          {/* <DropOptionsProvider>
            <CTASection />
          </DropOptionsProvider> */}
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
