"use client";

import React from "react";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader } from "lucide-react";
import { useMenu } from "@/contexts/MenuContext";

export const MobileMenuKeySection = React.memo(() => {
    const {
        data,
        identifier,
        systemSecret,
        userSecret,
        setUserSecret,
        isLoadingKeys,
    } = useMenu();

    const {
        title,
        identifierLabel,
        systemSecretLabel,
        userSecretLabel,
        dropKeyLabel,
        dropKeyPlaceholder,
    } = data.keySection;

    return (
        <Card
            className="
        rounded-2xl
        border border-zinc-200/50 dark:border-zinc-800/50
        bg-gradient-to-br from-zinc-100/70 to-zinc-50/50
        dark:from-zinc-900/70 dark:to-zinc-950/60
        shadow-inner
        p-[clamp(0.5rem,2vw,1rem)]
      "
        >
            <CardTitle
                className="
          mx-auto flex items-center gap-2
          font-semibold
          text-[clamp(0.875rem,3.5vw,1.125rem)]
          text-emerald-600 dark:text-emerald-500
        "
            >
                {title}
            </CardTitle>

            <CardContent className="flex flex-col gap-[clamp(0.5rem,2vw,0.75rem)] p-0">
                <div className="grid grid-cols-1 gap-[clamp(0.75rem,3vw,1rem)]">
                    {/* Identifier */}
                    <Field
                        id="mobile-identifier"
                        label={identifierLabel}
                        value={identifier}
                        disabled
                        loading={isLoadingKeys}
                        placeholder="Identifier"
                    />

                    {/* System secret */}
                    <Field
                        id="mobile-system-secret"
                        label={systemSecretLabel}
                        value={systemSecret}
                        disabled
                        loading={isLoadingKeys}
                        placeholder="System secret"
                    />

                    {/* User secret */}
                    <div className="flex flex-col">
                        <Label className="field-label">{userSecretLabel}</Label>
                        <Input
                            value={userSecret}
                            onChange={(e) => setUserSecret(e.target.value)}
                            placeholder="Enter here"
                            maxLength={6}
                            className="bg-white dark:bg-zinc-900"
                        />
                    </div>
                </div>

                {/* Drop key preview */}
                <div
                    className="
            text-center leading-relaxed tracking-tight
            text-[clamp(0.7rem,3vw,0.875rem)]
            text-zinc-600 dark:text-zinc-400
          "
                >
                    <strong className="font-medium text-zinc-800 dark:text-zinc-200">
                        {dropKeyLabel}
                    </strong>{" "}
                    {identifier && systemSecret && userSecret.trim() ? (
                        <span className="font-mono text-zinc-900 dark:text-zinc-100">
                            {identifier}-{systemSecret}-{userSecret.trim()}
                        </span>
                    ) : (
                        <span className="italic">{dropKeyPlaceholder}</span>
                    )}
                </div>
            </CardContent>
        </Card>
    );
});

MobileMenuKeySection.displayName = "MobileMenuKeySection";

/* ---------------------------------- */
/* Small helper (keeps JSX clean)      */
/* ---------------------------------- */

function Field({
    id,
    label,
    value,
    disabled,
    loading,
    placeholder,
}: {
    id: string;
    label: string;
    value: string;
    disabled?: boolean;
    loading?: boolean;
    placeholder: string;
}) {
    return (
        <div className="flex flex-col">
            <Label htmlFor={id} className="field-label">
                {label}
            </Label>
            <div className="flex items-center gap-2">
                <Input
                    id={id}
                    value={value}
                    disabled={disabled}
                    placeholder={loading ? "Generating..." : placeholder}
                    className="bg-zinc-100 dark:bg-zinc-800 font-medium"
                />
                {loading && <Loader className="h-4 w-4 animate-spin" />}
            </div>
        </div>
    );
}
