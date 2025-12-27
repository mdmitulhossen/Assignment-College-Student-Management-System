'use client';

import { Button } from '@/components/ui/button';
import { AlertTriangle } from 'lucide-react';
import { Modal } from './Modal';

interface ConfirmationModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    title: string;
    description: string;
    confirmText?: string;
    cancelText?: string;
    variant?: 'default' | 'destructive';
    isLoading?: boolean;
}

export function ConfirmationModal({
    isOpen,
    onClose,
    onConfirm,
    title,
    description,
    confirmText = 'Confirm',
    cancelText = 'Cancel',
    variant = 'destructive',
    isLoading = false,
}: ConfirmationModalProps) {
    const handleConfirm = () => {
        onConfirm();
        onClose();
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title={title} size="sm">
            <div className="space-y-4">
                {/* Warning Icon */}
                <div className="flex items-start gap-3">
                    <div
                        className={`flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full shrink-0 ${variant === 'destructive'
                            ? 'bg-destructive/10 text-destructive'
                            : 'bg-primary/10 text-primary'
                            }`}
                    >
                        <AlertTriangle className="h-5 w-5 sm:h-6 sm:w-6" />
                    </div>
                    <p className="text-xs sm:text-sm text-muted-foreground flex-1">{description}</p>
                </div>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 justify-end pt-2">
                    <Button
                        variant="outline"
                        onClick={onClose}
                        disabled={isLoading}
                        className="w-full sm:w-auto"
                    >
                        {cancelText}
                    </Button>
                    <Button
                        variant={variant}
                        onClick={handleConfirm}
                        disabled={isLoading}
                        className="min-w-24 w-full sm:w-auto text-white!"
                    >
                        {isLoading ? 'Processing...' : confirmText}
                    </Button>
                </div>
            </div>
        </Modal>
    );
}
