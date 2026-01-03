import React from "react";

interface PreTagProps {
    children: React.ReactNode;
    style?: React.CSSProperties;
    className?: string;
}

export const CodePreTag = ({ children, ...props }: PreTagProps) => (
    <pre
        {...props}
        style={{
            margin: 0,
            padding: '12px',
            background: 'transparent',
            fontFamily: 'ui-monospace, SFMono-Regular, "SF Mono", Consolas, "Liberation Mono", Menlo, monospace',
            fontSize: '14px',
            lineHeight: '24px',
            whiteSpace: 'pre',
            ...props.style
        }}
    >
        {children}
    </pre>
);