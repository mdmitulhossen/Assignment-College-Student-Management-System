'use client';

import { cn } from '@/lib/utils';
import { FieldError, FieldValues, Path, UseFormRegister } from 'react-hook-form';

interface FormFieldProps<T extends FieldValues> {
    label: string;
    name: Path<T>;
    register: UseFormRegister<T>;
    error?: FieldError;
    type?: 'text' | 'email' | 'tel' | 'number' | 'date';
    placeholder?: string;
    helperText?: string;
    required?: boolean;
    min?: string | number;
    max?: string | number;
}

export function FormField<T extends FieldValues>({
    label,
    name,
    register,
    error,
    type = 'text',
    placeholder,
    helperText,
    required = false,
    min,
    max,
}: FormFieldProps<T>) {
    const registerOptions = (() => {
        if (type === 'number') return { valueAsNumber: true };
        if (type === 'date') return { valueAsDate: true };
        return {};
    })();

    return (
        <div className="space-y-2">
            <label htmlFor={name} className="font-medium text-foreground">
                {label} {required && <span className="text-destructive">*</span>}
            </label>
            <input
                id={name}
                type={type}
                {...register(name, registerOptions)}
                placeholder={placeholder}
                min={min}
                max={max}
                className={cn(
                    'w-full px-3 py-2 border rounded-md',
                    'focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent',
                    'transition-colors duration-200',
                    error
                        ? 'border-destructive bg-destructive/5'
                        : 'border-input bg-background hover:border-primary/50'
                )}
            />
            {helperText && !error && (
                <p className="text-xs text-muted-foreground">{helperText}</p>
            )}
            {error && <p className="text-xs text-destructive">{error.message}</p>}
        </div>
    );
}
