import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ReactNode } from 'react';

interface PageHeaderProps {
    title: string;
    subtitle?: string;
    action?: {
        href: string;
        label: string;
        icon?: ReactNode;
    };
}

export function PageHeader({ title, subtitle, action }: PageHeaderProps) {
    return (
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
            <div>
                <h1 className="text-2xl lg:text-3xl 2xl:text-4xl font-semibold text-center sm:text-left text-foreground">
                    {title}
                </h1>
                {subtitle && (
                    <p className="text-muted-foreground text-center sm:text-left mt-1">
                        {subtitle}
                    </p>
                )}
            </div>
            {action && (
                <Link href={action.href}>
                    <Button
                        size="lg"
                        variant="primary"
                        className="bg-linear-to-r from-(--gradient-start) to-(--gradient-end) hover:opacity-90 transition-opacity text-lg sm:h-12!"
                    >
                        {action.icon && <span className="mr-2 sm:text-2xl text-lg">{action.icon}</span>}
                        {action.label}
                    </Button>
                </Link>
            )}
        </div>
    );
}
