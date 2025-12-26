import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight, Check, Loader2 } from 'lucide-react';

interface FormNavigationButtonsProps {
    currentStep: number;
    totalSteps: number;
    isSubmitting: boolean;
    onPrevious: () => void;
    onNext: () => void;
}

export function FormNavigationButtons({
    currentStep,
    totalSteps,
    isSubmitting,
    onPrevious,
    onNext,
}: FormNavigationButtonsProps) {
    const isFirstStep = currentStep === 1;
    const isLastStep = currentStep === totalSteps;

    return (
        <div className="mt-8 flex items-center justify-between">
            <Button
                type="button"
                variant="outline"
                onClick={onPrevious}
                disabled={isFirstStep || isSubmitting}
                className='cursor-pointer'
            >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Previous
            </Button>

            {isLastStep ? (
                <Button type="submit" disabled={isSubmitting} className='cursor-pointer'>
                    {isSubmitting ? (
                        <>
                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                            Submitting...
                        </>
                    ) : (
                        <>
                            <Check className="w-4 h-4 mr-2" />
                            Submit
                        </>
                    )}
                </Button>
            ) : (
                <Button type="button" onClick={onNext} disabled={isSubmitting} className='cursor-pointer'>
                    Next
                    <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
            )}
        </div>
    );
}
