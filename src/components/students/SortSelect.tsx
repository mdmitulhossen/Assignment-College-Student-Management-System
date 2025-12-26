import { SortField, SortOrder } from '@/lib/types/student-list.types';
import { ArrowUpDown } from 'lucide-react';

interface SortSelectProps {
    field: SortField;
    order: SortOrder;
    onFieldChange: (field: SortField) => void;
    onOrderChange: (order: SortOrder) => void;
}

export function SortSelect({
    field,
    order,
    onFieldChange,
    onOrderChange,
}: SortSelectProps) {
    return (
        <div className="flex flex-col sm:flex-row gap-2">
            <div className="relative">
                <select
                    value={field}
                    onChange={(e) => onFieldChange(e.target.value as SortField)}
                    className="h-10 w-full sm:w-45 rounded-md border border-primary/20 bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary disabled:cursor-not-allowed disabled:opacity-50 appearance-none pr-8 transition-colors"
                >
                    <option value="name">Name</option>
                    <option value="admissionDate">Admission Date</option>
                </select>
                <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-muted-foreground">
                    <ArrowUpDown className="h-4 w-4" />
                </div>
            </div>

            <select
                value={order}
                onChange={(e) => onOrderChange(e.target.value as SortOrder)}
                className="h-10 w-full sm:w-35 rounded-md border border-primary/20 bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary disabled:cursor-not-allowed disabled:opacity-50 transition-colors"
            >
                <option value="asc">Ascending</option>
                <option value="desc">Descending</option>
            </select>
        </div>
    );
}
