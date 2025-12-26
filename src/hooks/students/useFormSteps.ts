import { StudentFormData } from '@/lib/schemas/student.schema';
import { useState } from 'react';
import { UseFormTrigger } from 'react-hook-form';

const STEP_VALIDATION_FIELDS = {
    1: ['name', 'age', 'gender'] as const,
    2: ['course', 'admissionDate'] as const,
    3: ['hobby'] as const,
};

export function useFormSteps(totalSteps: number, trigger: UseFormTrigger<StudentFormData>) {
    const [currentStep, setCurrentStep] = useState(1);

    const goToNextStep = async () => {
        const fieldsToValidate = STEP_VALIDATION_FIELDS[currentStep as keyof typeof STEP_VALIDATION_FIELDS];

        if (fieldsToValidate.length > 0) {
            const isValid = await trigger(fieldsToValidate);
            if (!isValid) return;
        }

        setCurrentStep((prev) => Math.min(prev + 1, totalSteps));
    };

    const goToPreviousStep = () => {
        setCurrentStep((prev) => Math.max(prev - 1, 1));
    };

    return {
        currentStep,
        goToNextStep,
        goToPreviousStep,
    };
}
