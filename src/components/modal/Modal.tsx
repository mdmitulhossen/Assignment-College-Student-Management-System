'use client';

import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import { useEffect } from 'react';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    description?: string;
    children: React.ReactNode;
    size?: 'sm' | 'md' | 'lg' | 'xl';
}

export function Modal({
    isOpen,
    onClose,
    title,
    description,
    children,
    size = 'md',
}: ModalProps) {
    // Close on Escape key
    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };

        if (isOpen) {
            document.addEventListener('keydown', handleEscape);
            document.body.style.overflow = 'hidden';
        }

        return () => {
            document.removeEventListener('keydown', handleEscape);
            document.body.style.overflow = 'unset';
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    const sizeClasses = {
        sm: 'max-w-md',
        md: 'max-w-lg',
        lg: 'max-w-2xl',
        xl: 'max-w-4xl',
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
            <div
                className="fixed inset-0 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200"
                onClick={onClose}
            />

            <div
                className={`relative bg-card border border-border rounded-lg shadow-lg w-full ${sizeClasses[size]} my-8 animate-in zoom-in-95 fade-in duration-200 max-h-[90vh] flex flex-col`}
            >
                {/* Header */}
                <div className="flex items-start justify-between p-4 sm:p-6 border-b border-border shrink-0">
                    <div className="flex-1 pr-4">
                        <h2 className="text-lg sm:text-xl font-semibold text-foreground">{title}</h2>
                        {description && (
                            <p className="text-xs sm:text-sm text-muted-foreground mt-1">{description}</p>
                        )}
                    </div>
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={onClose}
                        className="h-8 w-8 p-0 rounded-full shrink-0"
                    >
                        <X className="h-4 w-4" />
                    </Button>
                </div>

                {/* Content  */}
                <div className="p-4 sm:p-6 overflow-y-auto flex-1">{children}</div>
            </div>
        </div>
    );
}
