import { Filter } from 'lucide-react';

interface FilterOption {
    value: string;
    label: string;
}

interface FilterDropdownProps {
    label?: string;
    value: string;
    options: FilterOption[];
    onChange: (value: string) => void;
    icon?: React.ReactNode;
}

export function FilterDropdown({
    label,
    value,
    options,
    onChange,
    icon = <Filter className="h-4 w-4" />,
}: FilterDropdownProps) {
    return (
        <div className="space-y-2">
            {label && (
                <label className="text-sm font-medium text-foreground">{label}</label>
            )}
            <div className="relative">
                <select
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    className="h-10 w-full rounded-md border border-primary/20 bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary disabled:cursor-not-allowed disabled:opacity-50 appearance-none pr-8 transition-colors"
                >
                    {options.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
                <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-muted-foreground">
                    {icon}
                </div>
            </div>
        </div>
    );
}
