'use client';

import { FormNavigationButtons } from '@/components/students/FormNavigationButtons';
import { StepContent } from '@/components/students/StepContent';
import { StepIndicator } from '@/components/students/StepIndicator';
import { useFormSteps } from '@/hooks/students/useFormSteps';
import { useStudentSubmission } from '@/hooks/students/useStudentSubmission';
import { FORM_STEPS } from '@/lib/constants/form.constants';
import { StudentFormData, studentSchema } from '@/lib/schemas/student.schema';
import { Student } from '@/store/student-store';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

interface StudentFormProps {
    mode?: 'add' | 'edit';
    initialData?: Student;
}

export function StudentForm({ mode = 'add', initialData }: StudentFormProps) {
    const {
        register,
        handleSubmit,
        trigger,
        reset,
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
                email: initialData.email || '',
                phone: initialData.phone || '',
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
        // Validate all fields first
        const isValid = await trigger();
        if (!isValid) return;

        // Get form data and submit
        handleSubmit((data) => {
            if (currentStep === FORM_STEPS.length) {
                submitStudent(data);
            }
        })();
    };

    // Prevent form submission through Enter key or other means
    const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // Form submission is disabled - use manual button click only
    };

    // Prevent Enter key from submitting the form
    const handleKeyDown = (e: React.KeyboardEvent<HTMLFormElement>) => {
        if (e.key === 'Enter') {
            e.preventDefault();
        }
    };

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
                email: initialData.email || '',
                phone: initialData.phone || '',
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
