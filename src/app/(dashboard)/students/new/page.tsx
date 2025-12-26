'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowLeft, ArrowRight, Check, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { AcademicInfoStep } from '@/components/form/StudentFormSteps/AcademicInfoStep';
import { BasicInfoStep } from '@/components/form/StudentFormSteps/BasicInfoStep';
import { PersonalInfoStep } from '@/components/form/StudentFormSteps/PersonalInfoStep';
import { Button } from '@/components/ui/button';
import { FORM_STEPS } from '@/lib/constants/form.constants';
import {
    studentSchema,
    type StudentFormData,
} from '@/lib/schemas/student.schema';
import { useStudentStore } from '@/store/student-store';

export default function NewStudentPage() {
    const router = useRouter();
    const { addStudent } = useStudentStore();
    const [currentStep, setCurrentStep] = useState(1);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const {
        register,
        handleSubmit,
        trigger,
        formState: { errors },
    } = useForm<StudentFormData>({
        resolver: zodResolver(studentSchema),
        mode: 'onChange',
    });

    const onSubmit = async (data: StudentFormData) => {
        setIsSubmitting(true);

        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1500));

        try {
            // Clean optional fields
            const cleanedData = {
                ...data,
                email: data.email || undefined,
                phone: data.phone || undefined,
            };

            addStudent(cleanedData);
            router.push('/students');
        } catch (error) {
            console.error('Failed to add student:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleNext = async () => {
        let isValid = false;

        if (currentStep === 1) {
            isValid = await trigger(['name', 'age', 'gender', 'admissionDate']);
        } else if (currentStep === 2) {
            isValid = await trigger(['course']);
        }

        if (isValid) {
            setCurrentStep((prev) => Math.min(prev + 1, 3));
        }
    };

    const handlePrevious = () => {
        setCurrentStep((prev) => Math.max(prev - 1, 1));
    };

    const renderStep = () => {
        switch (currentStep) {
            case 1:
                return <BasicInfoStep register={register} errors={errors} />;
            case 2:
                return <AcademicInfoStep register={register} errors={errors} />;
            case 3:
                return <PersonalInfoStep register={register} errors={errors} />;
            default:
                return null;
        }
    };

    return (
        <div className="min-h-screen bg-background py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <Link
                        href="/students"
                        className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-4 transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Back to Students
                    </Link>
                    <h1 className="text-3xl font-bold text-foreground">Add New Student</h1>
                    <p className="text-muted-foreground mt-2">
                        Fill in the details below to create a new student record
                    </p>
                </div>

                {/* Step Indicator */}
                <div className="mb-8">
                    <div className="flex items-center justify-between">
                        {FORM_STEPS.map((step, index) => (
                            <div key={step.id} className="flex-1 flex items-center">
                                <div className="flex flex-col items-center flex-1">
                                    <div
                                        className={`
                                            w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all
                                            ${currentStep > step.id
                                                ? 'bg-primary text-primary-foreground'
                                                : currentStep === step.id
                                                    ? 'bg-primary text-primary-foreground ring-4 ring-primary/20'
                                                    : 'bg-muted text-muted-foreground'
                                            }
                                        `}
                                    >
                                        {currentStep > step.id ? (
                                            <Check className="w-5 h-5" />
                                        ) : (
                                            step.id
                                        )}
                                    </div>
                                    <div className="mt-2 text-center">
                                        <p
                                            className={`text-sm font-medium ${currentStep >= step.id
                                                    ? 'text-foreground'
                                                    : 'text-muted-foreground'
                                                }`}
                                        >
                                            {step.title}
                                        </p>
                                        <p className="text-xs text-muted-foreground hidden sm:block">
                                            {step.description}
                                        </p>
                                    </div>
                                </div>
                                {index < FORM_STEPS.length - 1 && (
                                    <div
                                        className={`
                                            h-1 flex-1 mx-2 rounded transition-all
                                            ${currentStep > step.id ? 'bg-primary' : 'bg-muted'}
                                        `}
                                    />
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Form */}
                <div className="card-box bg-card">
                    <form onSubmit={handleSubmit(onSubmit)} className="p-6 md:p-8">
                        {renderStep()}

                        {/* Navigation Buttons */}
                        <div className="mt-8 flex items-center justify-between pt-6 border-t">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={handlePrevious}
                                disabled={currentStep === 1 || isSubmitting}
                            >
                                <ArrowLeft className="w-4 h-4 mr-2" />
                                Previous
                            </Button>

                            {currentStep < 3 ? (
                                <Button type="button" onClick={handleNext} disabled={isSubmitting}>
                                    Next
                                    <ArrowRight className="w-4 h-4 ml-2" />
                                </Button>
                            ) : (
                                <Button type="submit" disabled={isSubmitting}>
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
                            )}
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
