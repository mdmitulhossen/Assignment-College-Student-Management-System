/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { FormNavigationButtons } from '@/components/students/FormNavigationButtons';
import { StepContent } from '@/components/students/StepContent';
import { StepIndicator } from '@/components/students/StepIndicator';
import { useFormSteps } from '@/hooks/students/useFormSteps';
import { useStudentSubmission } from '@/hooks/students/useStudentSubmission';
import { FORM_STEPS } from '@/lib/constants/form.constants';
import { StudentFormData, studentSchema } from '@/lib/schemas/student.schema';
import { Student, useStudentStore } from '@/store/student-store';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';

interface StudentFormProps {
    mode?: 'add' | 'edit';
    initialData?: Student;
}

export function StudentForm({ mode = 'add', initialData }: StudentFormProps) {
    const { saveDraft, clearDraft, getDraft } = useStudentStore();
    const saveTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    const {
        register,
        handleSubmit,
        trigger,
        reset,
        watch,
        formState: { errors },
    } = useForm<StudentFormData>({
        resolver: zodResolver(studentSchema),
        mode: 'onChange',
        defaultValues: initialData
            ? {
                name: initialData.name,
                age: initialData.age,
                gender: initialData.gender,
                course: initialData.course,
                hobby: initialData.hobby,
                admissionDate: initialData.admissionDate,
            }
            : undefined,
    });

    const { currentStep, goToNextStep, goToPreviousStep } = useFormSteps(
        FORM_STEPS.length,
        trigger
    );

    const { isSubmitting, submitStudent } = useStudentSubmission(mode, initialData?.id);

    // Handle manual submit button click
    const handleManualSubmit = async () => {
        const isValid = await trigger();
        if (!isValid) return;

        handleSubmit((data) => {
            if (currentStep === FORM_STEPS.length) {
                submitStudent(data);
                if (mode === 'add') {
                    clearDraft();
                }
            }
        })();
    };

    const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    };

    // Prevent Enter key from submitting the form
    const handleKeyDown = (e: React.KeyboardEvent<HTMLFormElement>) => {
        if (e.key === 'Enter') {
            e.preventDefault();
        }
    };

    // Load draft on mount
    useEffect(() => {
        if (mode === 'add' && !initialData) {
            const draft = getDraft();
            if (draft && Object.keys(draft).length > 0) {
                reset(draft);
            }
        }
    }, [mode, initialData, getDraft, reset]);

    // Auto-save draft
    useEffect(() => {
        if (mode === 'add') {
            const subscription = watch((value) => {
                if (saveTimeoutRef.current) {
                    clearTimeout(saveTimeoutRef.current);
                }

                saveTimeoutRef.current = setTimeout(() => {
                    const hasData = Object.values(value).some(
                        (v) => v !== undefined && v !== '' && v !== null
                    );
                    if (hasData) {
                        saveDraft(value as any);
                    }
                }, 500);
            });

            return () => {
                subscription.unsubscribe();
                if (saveTimeoutRef.current) {
                    clearTimeout(saveTimeoutRef.current);
                }
            };
        }
    }, [mode, watch, saveDraft]);

    // Reset form with initial data when it changes (for edit mode)
    useEffect(() => {
        if (initialData && mode === 'edit') {
            reset({
                name: initialData.name,
                age: initialData.age,
                gender: initialData.gender,
                course: initialData.course,
                hobby: initialData.hobby,
                admissionDate: initialData.admissionDate,
            });
        }
    }, [initialData, mode, reset]);

    const isEditMode = mode === 'edit';

    return (
        <div className="max-w-3xl mx-auto">
            <div className="mb-8 text-center">
                <h1 className="text-2xl lg:text-3xl 2xl:text-4xl font-bold text-foreground">
                    {isEditMode ? 'Edit Student' : 'Add New Student'}
                </h1>
                <p className="text-muted-foreground mt-2">
                    {isEditMode
                        ? 'Update the student information below'
                        : 'Fill in the details below to create a new student record'}
                </p>
            </div>

            <StepIndicator steps={FORM_STEPS} currentStep={currentStep} className="mb-8" />


            <form
                onSubmit={handleFormSubmit}
                onKeyDown={handleKeyDown}
                noValidate
            >
                <StepContent currentStep={currentStep} register={register} errors={errors} />

                <FormNavigationButtons
                    currentStep={currentStep}
                    totalSteps={FORM_STEPS.length}
                    isSubmitting={isSubmitting}
                    onPrevious={goToPreviousStep}
                    onNext={goToNextStep}
                    onSubmit={handleManualSubmit}
                    submitText={isEditMode ? 'Update Student' : 'Add Student'}
                />
            </form>
        </div>
    );
}
