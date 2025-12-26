'use client';

import { FormField } from '@/components/form/FormField';
import { FormSelect } from '@/components/form/FormSelect';
import { COURSE_OPTIONS } from '@/lib/constants/form.constants';
import { StudentFormData } from '@/lib/schemas/student.schema';
import { GraduationCap } from 'lucide-react';
import { FieldErrors, UseFormRegister } from 'react-hook-form';

interface AcademicInfoStepProps {
    register: UseFormRegister<StudentFormData>;
    errors: FieldErrors<StudentFormData>;
}

export function AcademicInfoStep({ register, errors }: AcademicInfoStepProps) {
    const today = new Date().toISOString().split('T')[0];

    return (
        <div className="space-y-6">
            <div className="flex items-center gap-3 pb-4 border-b">
                <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
                    <GraduationCap className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                    <h3 className="text-lg xl:text-xl font-semibold text-foreground">Academic Information</h3>
                    <p className="text-sm xl:text-base text-muted-foreground">
                        Select the course for the student
                    </p>
                </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
                <FormSelect
                    label="Course"
                    name="course"
                    register={register}
                    error={errors.course}
                    options={COURSE_OPTIONS}
                    placeholder="Select a course"
                    helperText="Choose the primary course of study"
                    required
                />

                <FormField
                    label="Admission Date"
                    name="admissionDate"
                    type="date"
                    register={register}
                    error={errors.admissionDate}
                    max={today}
                    helperText="Cannot be a future date"
                    required
                />
            </div>
        </div>
    );
}
