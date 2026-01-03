"use client";

import React from "react";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";

interface FAQItemProps {
    question: string;
    answer: string;
}

export const FAQItem = React.memo<FAQItemProps>(({ question, answer }) => {
    const itemId = React.useId();

    return (
        <Accordion type="single" collapsible className="w-full">
            <AccordionItem value={itemId} className="border-t rounded-lg px-4">
                <AccordionTrigger className="text-left hover:no-underline">
                    <span className="font-medium text-foreground">{question}</span>
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                    {answer}
                </AccordionContent>
            </AccordionItem>
        </Accordion>
    );
});

FAQItem.displayName = "FAQItem";
