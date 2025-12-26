import { cn } from '@/lib/utils';

interface CardHeadingProps {
    title: string;
    className?: string;
}

export function CardHeading({ title, className }: CardHeadingProps) {
    return <h3 className={cn('text-2xl font-bold', className)}>{title}</h3>;
}
