import { cn } from '@/lib/utils';
import { Check } from 'lucide-react';

export interface Step {
    id: number;
    title: string;
    description: string;
}

interface StepIndicatorProps {
    steps: readonly Step[];
    currentStep: number;
    className?: string;
}

export function StepIndicator({
    steps,
    currentStep,
    className,
}: StepIndicatorProps) {
    return (
        <div className={cn('w-full', className)}>
            <div className="flex items-center justify-between">
                {steps.map((step, index) => {
                    const isCompleted = currentStep > step.id;
                    const isCurrent = currentStep === step.id;
                    const isPending = currentStep < step.id;

                    return (
                        <div key={step.id} className="flex flex-1 items-center">
                            {/* Step Circle and Label */}
                            <div className="flex flex-1 flex-col items-center">
                                {/* Circle with Number/Check */}
                                <div
                                    className={cn(
                                        'relative z-10 flex h-10 w-10 items-center justify-center rounded-full font-semibold transition-all duration-300',
                                        isCompleted &&
                                        'bg-primary text-primary-foreground shadow-md',
                                        isCurrent &&
                                        'bg-primary text-primary-foreground ring-4 ring-primary/20 shadow-lg scale-110',
                                        isPending &&
                                        'bg-muted text-muted-foreground border-2 border-border'
                                    )}
                                >
                                    {isCompleted ? (
                                        <Check className="h-5 w-5" strokeWidth={3} />
                                    ) : (
                                        <span className="text-sm font-bold">{step.id}</span>
                                    )}
                                </div>

                                {/* Step Title and Description */}
                                <div className="mt-3 text-center max-w-30">
                                    <p
                                        className={cn(
                                            'text-sm font-medium transition-colors duration-200',
                                            (isCompleted || isCurrent)
                                                ? 'text-foreground'
                                                : 'text-muted-foreground'
                                        )}
                                    >
                                        {step.title}
                                    </p>
                                    <p className="text-xs text-muted-foreground mt-0.5 hidden sm:block">
                                        {step.description}
                                    </p>
                                </div>
                            </div>

                            {/* Dashed Connector Line */}
                            {index < steps.length - 1 && (
                                <div className="flex-1 px-2 relative -mt-12 hidden sm:block">
                                    <div
                                        className={cn(
                                            'h-0.5 w-full transition-all duration-300',
                                            currentStep > step.id
                                                ? 'bg-primary'
                                                : 'bg-transparent'
                                        )}
                                        style={{
                                            backgroundImage:
                                                currentStep <= step.id
                                                    ? 'repeating-linear-gradient(to right, hsl(var(--muted-foreground)) 0, hsl(var(--muted-foreground)) 4px, transparent 4px, transparent 10px)'
                                                    : undefined,
                                            backgroundSize:
                                                currentStep <= step.id ? '10px 2px' : undefined,
                                        }}
                                    />
                                </div>
                            )}

                            {/* Mobile Connector (Simpler) */}
                            {index < steps.length - 1 && (
                                <div className="flex-1 px-2 relative -mt-12 sm:hidden">
                                    <div
                                        className={cn(
                                            'h-0.5 w-full border-t-2 border-dashed transition-all duration-300',
                                            currentStep > step.id
                                                ? 'border-primary border-solid'
                                                : 'border-muted-foreground'
                                        )}
                                    />
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
