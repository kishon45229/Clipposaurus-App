"use client";

import React from "react";
import { FAQItem } from "@/components/custom/faq/FAQItem";
import { useFAQ } from "@/contexts/FAQContext";
import { FAQCategoryHeader } from "@/components/custom/faq/FAQCategoryHeader";

export const FAQCategory: React.FC = React.memo(() => {
    const { data } = useFAQ();
    const { categories } = data;

    return (
        <section className="space-y-12">
            {categories.map((category, index) => (
                <div key={index} id={`category-${category.id}`} className="space-y-8">
                    <FAQCategoryHeader title={category.title} description={category.description} />
                    <div className="space-y-3">
                        {category.questions.map((question, index) => (
                            <FAQItem
                                key={`${category.id}-${index}`}
                                question={question.question}
                                answer={question.answer}
                            />
                        ))}
                    </div>
                </div>
            ))}
        </section>
    );
});

FAQCategory.displayName = "FAQCategory";
