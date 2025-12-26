'use client';

import { FormNavigationButtons } from '@/components/students/FormNavigationButtons';
import { StepContent } from '@/components/students/StepContent';
import { StepIndicator } from '@/components/students/StepIndicator';
import { useFormSteps } from '@/hooks/students/useFormSteps';
import { useStudentSubmission } from '@/hooks/students/useStudentSubmission';
import { FORM_STEPS } from '@/lib/constants/form.constants';
import { StudentFormData, studentSchema } from '@/lib/schemas/student.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

export function StudentForm() {
    const {
        register,
        handleSubmit,
        trigger,
        formState: { errors },
    } = useForm<StudentFormData>({
        resolver: zodResolver(studentSchema),
        mode: 'onChange',
    });

    const { currentStep, goToNextStep, goToPreviousStep } = useFormSteps(
        FORM_STEPS.length,
        trigger
    );

    const { isSubmitting, submitStudent } = useStudentSubmission();

    return (
        <div className="max-w-3xl mx-auto">
            <div className="mb-8 text-center">
                <h1 className="text-2xl lg:text-3xl 2xl:text-4xl font-bold text-foreground">
                    Add New Student
                </h1>
                <p className="text-muted-foreground mt-2">
                    Fill in the details below to create a new student record
                </p>
            </div>

            <StepIndicator steps={FORM_STEPS} currentStep={currentStep} className="mb-8" />

            <form onSubmit={handleSubmit(submitStudent)}>
                <StepContent
                    currentStep={currentStep}
                    register={register}
                    errors={errors}
                />

                <FormNavigationButtons
                    currentStep={currentStep}
                    totalSteps={FORM_STEPS.length}
                    isSubmitting={isSubmitting}
                    onPrevious={goToPreviousStep}
                    onNext={goToNextStep}
                />
            </form>
        </div>
    );
}
