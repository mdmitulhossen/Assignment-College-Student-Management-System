import { cn } from '@/lib/utils';
import { Check, ChevronsRight } from 'lucide-react';

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
        <ol className={cn('lg:flex items-center w-full space-y-4 lg:space-y-0 lg:space-x-4', className)}>
            {steps.map((step, index) => {
                const isCompleted = currentStep > step.id;
                const isCurrent = currentStep === step.id;
                const isPending = currentStep < step.id;
                const isLastStep = index === steps.length - 1;

                return (
                    <li key={step.id} className="relative">
                        <div className="flex items-center font-medium w-full">
                            <span
                                className={cn(
                                    'flex justify-center items-center mr-3 rounded-full text-sm transition-all duration-300',
                                    'w-6 h-6 lg:w-8 lg:h-8',
                                    isCompleted && 'bg-primary border-primary text-primary-foreground',
                                    isCurrent && 'bg-primary border-primary text-primary-foreground',
                                    isPending && 'bg-muted border-border text-muted-foreground border'
                                )}
                            >
                                {isCompleted ? (
                                    <Check className="w-3 h-3 lg:w-4 lg:h-4" strokeWidth={3} />
                                ) : (
                                    step.id
                                )}
                            </span>

                            <div className="block flex-1">
                                <h4
                                    className={cn(
                                        'text-sm lg:text-base transition-colors duration-300',
                                        (isCompleted || isCurrent) && 'text-primary',
                                        isPending && 'text-foreground'
                                    )}
                                >
                                    {step.title}
                                </h4>
                                <p className="text-xs text-muted-foreground mt-0.5 hidden sm:block">
                                    {step.description}
                                </p>
                            </div>

                            {!isLastStep && (
                                <ChevronsRight
                                    className={cn(
                                        'w-4 h-4 lg:w-5 lg:h-5 ml-2 sm:ml-4 transition-colors duration-300 shrink-0',
                                        (isCompleted || isCurrent) && 'stroke-primary',
                                        isPending && 'stroke-muted-foreground'
                                    )}
                                    strokeWidth={1.6}
                                />
                            )}
                        </div>
                    </li>
                );
            })}
        </ol>
    );
}
