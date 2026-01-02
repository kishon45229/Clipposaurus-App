"use client";

import React, { useState, useEffect } from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";

const BETA_NOTICE_KEY = "clipposaurus_beta_notice_acknowledged";

export const BetaNotice: React.FC = React.memo(() => {
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const hasAcknowledged = localStorage.getItem(BETA_NOTICE_KEY);
        if (!hasAcknowledged) {
            setTimeout(() => setIsOpen(true), 500);
        }
    }, []);

    const handleAcknowledge = () => {
        localStorage.setItem(BETA_NOTICE_KEY, "true");
        setIsOpen(false);
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <div
                        className="flex items-center mb-2"
                        style={{ gap: "clamp(0.5rem, 2vw, 0.75rem)" }}
                    >
                        <div
                            className="flex-shrink-0 rounded-full bg-amber-500/10 flex items-center justify-center"
                            style={{
                                width: "clamp(2.25rem, 6vw, 2.5rem)",
                                height: "clamp(2.25rem, 6vw, 2.5rem)",
                            }}
                        >
                            <AlertTriangle
                                className="text-amber-500"
                                style={{ width: "clamp(1rem, 3vw, 1.25rem)", height: "clamp(1rem, 3vw, 1.25rem)" }}
                            />
                        </div>

                        <DialogTitle
                            className="tracking-tight"
                            style={{ fontSize: "clamp(1.1rem, 3vw, 1.25rem)" }}
                        >
                            Beta Testing Notice
                        </DialogTitle>
                    </div>

                    <DialogDescription
                        className="text-left pt-2"
                        style={{ fontSize: "clamp(0.85rem, 2vw, 0.95rem)" }}
                    >
                        <div
                            className="flex flex-col"
                            style={{ gap: "clamp(0.75rem, 2vw, 1rem)" }}
                        >
                            <p>
                                Clipposaurus is currently in{" "}
                                <strong className="text-foreground">beta testing</strong>.
                                While we strive to provide a stable experience, please be aware that:
                            </p>

                            <ul
                                className="list-disc list-inside ml-2"
                                style={{
                                    fontSize: "clamp(0.8rem, 1.8vw, 0.9rem)",
                                    gap: "clamp(0.4rem, 1.2vw, 0.5rem)",
                                }}
                            >
                                <li>You may encounter occasional errors or bugs</li>
                                <li>Service may be temporarily unavailable during updates</li>
                                <li>Features are subject to change as we improve the platform</li>
                            </ul>

                            <p
                                style={{ fontSize: "clamp(0.8rem, 1.8vw, 0.9rem)" }}
                            >
                                We appreciate your patience and welcome any feedback to help us improve Clipposaurus.
                            </p>
                        </div>
                    </DialogDescription>
                </DialogHeader>

                <DialogFooter className="sm:justify-center">
                    <Button
                        onClick={handleAcknowledge}
                        className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-700 text-white font-semibold"
                        style={{
                            fontSize: "clamp(0.85rem, 2vw, 1rem)",
                            paddingInline: "clamp(1rem, 4vw, 1.5rem)",
                            paddingBlock: "clamp(0.5rem, 2vw, 0.65rem)",
                        }}
                    >
                        I Understand
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
});

BetaNotice.displayName = "BetaNotice";
