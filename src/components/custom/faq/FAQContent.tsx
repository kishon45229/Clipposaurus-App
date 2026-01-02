import React from "react";
import { useFAQ } from "@/contexts/FAQContext";
import { useScrollSpy } from "@/hooks/useScrollSpy";
import { FAQHeader } from "@/components/custom/faq/FAQHeader";
import { FAQCategory } from "@/components/custom/faq/FAQCategory";
import { StickyTOC } from "@/components/custom/StickyTOC";

export const FAQContent: React.FC = React.memo(() => {
    const { data } = useFAQ();
    const { categories } = data;

    const categoryIds = React.useMemo(() =>
        categories.map(category => `category-${category.id}`) || [],
        [categories]
    );

    const items = React.useMemo(() =>
        categories.map(category => ({ id: `category-${category.id}`, label: category.title })) || [],
        [categories]
    );

    const activeSection = useScrollSpy(categoryIds, 120);

    return (
        <div className="mx-auto max-w-[1920px] px-4 py-2 grid grid-cols-1 lg:grid-cols-[240px_auto] gap-[clamp(2rem,5vw,2.5rem)]">
            {/* Sticky TOC — Desktop only */}
            <StickyTOC title="Categories" items={items} activeSection={activeSection} />

            {/* Main content */}
            <div className="max-w-7xl">
                <FAQHeader />
                <FAQCategory />
            </div>
        </div >
    );
});

FAQContent.displayName = "FAQContent";