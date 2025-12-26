import { Button } from '@/components/ui/button';
import { UserX } from 'lucide-react';
import Link from 'next/link';

interface EmptyStateProps {
    icon?: React.ReactNode;
    title?: string;
    description?: string;
    actionLabel?: string;
    actionHref?: string;
    onAction?: () => void;
}

export function EmptyState({
    icon,
    title = 'No data found',
    description = 'Try adjusting your filters or add new data',
    actionLabel,
    actionHref,
    onAction,
}: EmptyStateProps) {
    return (
        <div className="flex flex-col items-center justify-center py-5 px-4">
            <div className="text-muted-foreground/40 mb-4">
                {icon || <UserX className="h-16 w-16" />}
            </div>
            <h3 className="text-lg md:text-2xl font-semibold text-foreground mb-2">{title}</h3>
            <p className="text-sm text-muted-foreground mb-6 text-center max-w-sm">
                {description}
            </p>
            {actionLabel && (
                <>
                    {actionHref ? (
                        <Link href={actionHref}>
                            <Button className="bg-primary hover:bg-primary/90">
                                {actionLabel}
                            </Button>
                        </Link>
                    ) : (
                        <Button onClick={onAction} className="bg-primary hover:bg-primary/90">
                            {actionLabel}
                        </Button>
                    )}
                </>
            )}
        </div>
    );
}
