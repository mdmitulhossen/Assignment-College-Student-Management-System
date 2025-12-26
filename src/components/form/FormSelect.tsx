'use client';

import { cn } from '@/lib/utils';
import { FieldError, FieldValues, Path, UseFormRegister } from 'react-hook-form';

interface SelectOption {
    readonly value: string;
    readonly label: string;
}

interface FormSelectProps<T extends FieldValues> {
    label: string;
    name: Path<T>;
    register: UseFormRegister<T>;
    error?: FieldError;
    options: readonly SelectOption[];
    placeholder?: string;
    helperText?: string;
    required?: boolean;
}

export function FormSelect<T extends FieldValues>({
    label,
    name,
    register,
    error,
    options,
    placeholder = 'Select an option',
    helperText,
    required = false,
}: FormSelectProps<T>) {
    return (
        <div className="space-y-2">
            <label htmlFor={name} className="text-sm font-medium text-foreground">
                {label} {required && <span className="text-destructive">*</span>}
            </label>
            <select
                id={name}
                {...register(name)}
                className={cn(
                    'w-full px-3 py-2 border rounded-md text-sm',
                    'focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent',
                    'transition-colors duration-200',
                    error
                        ? 'border-destructive bg-destructive/5'
                        : 'border-input bg-background hover:border-primary/50'
                )}
            >
                <option value="">{placeholder}</option>
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
            {helperText && !error && (
                <p className="text-xs text-muted-foreground">{helperText}</p>
            )}
            {error && <p className="text-xs text-destructive">{error.message}</p>}
        </div>
    );
}
