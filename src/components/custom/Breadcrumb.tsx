'use client'

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronRight, Home } from 'lucide-react';

interface BreadcrumbItem {
    label: string
    href: string
}

const generateBreadcrumbs = (pathname: string): BreadcrumbItem[] => {
    const breadcrumbs: BreadcrumbItem[] = [{ label: 'Home', href: '/' }]

    const pathSegments = pathname.split('/').filter(segment => segment)

    pathSegments.forEach((segment, index) => {
        const href = '/' + pathSegments.slice(0, index + 1).join('/')
        let label = segment.replace(/-/g, ' ')
        label = label.charAt(0).toUpperCase() + label.slice(1)

        if (segment === 'create-drop') label = 'Upload Content'
        if (segment === 'show-content') label = 'Show Content'
        if (segment === 'privacy') label = 'Privacy Policy'
        if (segment === 'terms') label = 'Terms of Service'

        breadcrumbs.push({ label, href })
    })

    return breadcrumbs;
};

const getJsonLd = (breadcrumbs: BreadcrumbItem[]) => ({
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbs.map((breadcrumb, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: breadcrumb.label,
        item: `${process.env.NEXT_PUBLIC_BASE_URL || 'https://clipposaurus.com'}${breadcrumb.href}`,
    })),
});

function Breadcrumb(): React.ReactElement | null {
    const pathname = usePathname()
    const breadcrumbs = React.useMemo(() => generateBreadcrumbs(pathname), [pathname]);
    const jsonLd = React.useMemo(() => getJsonLd(breadcrumbs), [breadcrumbs]);

    const renderGoToHome = React.useMemo(() => {
        return (
            <Link
                href="/"
                className="flex items-center hover:text-primary transition-colors"
                aria-label="Go to home page"
            >
                <Home className="w-4 h-4" />
                <span className="sr-only">Home</span>
            </Link>
        )
    }, []);

    if (breadcrumbs.length <= 1) {
        return null
    }

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <nav aria-label="Breadcrumb" className="flex items-center space-x-1 text-sm text-gray-500 dark:text-gray-400 px-6 py-2">
                {breadcrumbs.map((breadcrumb, index) => (
                    <React.Fragment key={breadcrumb.href}>
                        {index === 0 ? (
                            renderGoToHome
                        ) : (
                            <>
                                <ChevronRight className="w-4 h-4 mx-1" aria-hidden="true" />
                                {index === breadcrumbs.length - 1 ? (
                                    <span className="text-foreground font-medium" aria-current="page">
                                        {breadcrumb.label}
                                    </span>
                                ) : (
                                    <Link
                                        href={breadcrumb.href}
                                        className="hover:text-primary transition-colors"
                                        aria-label={`Go to ${breadcrumb.label}`}
                                    >
                                        {breadcrumb.label}
                                    </Link>
                                )}
                            </>
                        )}
                    </React.Fragment>
                ))}
            </nav>
        </>
    )
}

const MemoizedBreadcrumb = React.memo(Breadcrumb);
MemoizedBreadcrumb.displayName = "Breadcrumb";

export { MemoizedBreadcrumb as Breadcrumb };