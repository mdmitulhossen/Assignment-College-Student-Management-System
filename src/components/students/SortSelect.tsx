import { SortField, SortOrder } from '@/lib/types/student-list.types';
import { ArrowUpDown } from 'lucide-react';

interface SortSelectProps {
    label?: string;
    field: SortField;
    order: SortOrder;
    onFieldChange: (field: SortField) => void;
    onOrderChange: (order: SortOrder) => void;
}

export function SortSelect({
    label,
    field,
    order,
    onFieldChange,
    onOrderChange,
}: SortSelectProps) {

    const combinedValue = `${field}-${order}`;

    const handleChange = (value: string) => {
        const [newField, newOrder] = value.split('-') as [SortField, SortOrder];
        onFieldChange(newField);
        onOrderChange(newOrder);
    };

    return (
        <div className="space-y-2">
            {label && (
                <label className="text-sm font-medium text-foreground">{label}</label>
            )}
            <div className="relative">
                <select
                    value={combinedValue}
                    onChange={(e) => handleChange(e.target.value)}
                    className="h-10 w-full rounded-md border border-primary/20 bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary disabled:cursor-not-allowed disabled:opacity-50 appearance-none pr-8 transition-colors"
                >
                    <option value="name-asc">Name (A → Z)</option>
                    <option value="name-desc">Name (Z → A)</option>
                    <option value="admissionDate-asc">Admission (Oldest)</option>
                    <option value="admissionDate-desc">Admission (Newest)</option>
                </select>
                <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-muted-foreground">
                    <ArrowUpDown className="h-4 w-4" />
                </div>
            </div>
        </div>
    );
}
