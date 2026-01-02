"use client";

import React from "react";
import { FAQCategory as FAQCategoryType } from "@/types";
import { FAQItem } from "./FAQItem";

interface FAQCategoryProps {
    category: FAQCategoryType;
}

export const FAQCategory: React.FC<FAQCategoryProps> = ({ category }) => {
    return (
        <section className="space-y-4">
            <div className="space-y-2">
                <h2 className="text-2xl font-semibold text-foreground">
                    {category.category}
                </h2>
                {category.description && (
                    <p className="text-sm text-muted-foreground">
                        {category.description}
                    </p>
                )}
            </div>
            <div className="space-y-3">
                {category.questions.map((question, index) => (
                    <FAQItem
                        key={`${category.id}-${index}`}
                        question={question.question}
                        answer={question.answer}
                    />
                ))}
            </div>
        </section>
    );
};
