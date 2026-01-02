"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { ThumbsUp, ThumbsDown } from "lucide-react";
import { useDocsManager } from "@/hooks/useDocsManager";

export const PageHelpful = React.memo(() => {
    const { submitFeedback, isSubmittingFeedback } = useDocsManager();
    const [feedbackGiven, setFeedbackGiven] = useState<"like" | "dislike" | null>(null);

    const handleFeedback = (type: "like" | "dislike") => {
        setFeedbackGiven(type);
        submitFeedback(type).catch(() => {
            // ignore
        });
    };

    return (
        <section className="mt-8 p-6 border rounded-lg bg-zinc-100 dark:bg-zinc-950 text-center">
            <h3 className="text-lg font-semibold mb-4 text-zinc-800 dark:text-zinc-300">Was this page helpful?</h3>
            <div className="flex justify-center gap-4">
                <Button
                    variant={feedbackGiven === "like" ? "default" : "outline"}
                    size="sm"
                    className={`flex items-center hover:text-emerald-500 ${feedbackGiven === "like" ? "bg-emerald-500 text-zinc-100" : ""}`}
                    onClick={() => handleFeedback("like")}
                    disabled={isSubmittingFeedback || feedbackGiven !== null}
                >
                    <ThumbsUp className="mr-1" />
                    Yes
                </Button>
                <Button
                    variant={feedbackGiven === "dislike" ? "destructive" : "outline"}
                    size="sm"
                    className={`flex items-center hover:text-red-500 ${feedbackGiven === "dislike" ? "bg-red-500 text-zinc-100 hover:bg-red-600" : ""}`}
                    onClick={() => handleFeedback("dislike")}
                    disabled={isSubmittingFeedback || feedbackGiven !== null}
                >
                    <ThumbsDown className="mr-1" />
                    No
                </Button>
            </div>
        </section>
    );
});

PageHelpful.displayName = "PageHelpful";