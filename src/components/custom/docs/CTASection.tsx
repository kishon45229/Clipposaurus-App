import React from "react";
import { DocsSection, ContentData9 } from "@/types/docs";
import { Button } from "@/components/ui/button";

interface CTASectionProps {
  section: DocsSection & { data: ContentData9 };
}

export const CTASection = React.memo<CTASectionProps>(({ section }) => {
  const ctaBtns = section.data as ContentData9;

  return (
    <section id={section.id}>
      <div className="flex flex-wrap gap-4 items-center justify-center">
        {ctaBtns.map(
          (link: { text: string; href: string; target?: string; style: string }, idx: number) => (
            <Button
              key={idx}
              size="lg"
              variant={link.style === "primary" ? "default" : "outline"}
              className="hover:scale-105 w-full sm:w-auto whitespace-normal py-6 xs-plus:py-0"
              onClick={() => {
                if (link.target) {
                  window.open(link.href, "_blank");
                } else {
                  window.location.href = link.href;
                }
              }}
            >
              {link.text}
            </Button>
          )
        )}
      </div>
    </section>
  );
});

CTASection.displayName = "CTASection";