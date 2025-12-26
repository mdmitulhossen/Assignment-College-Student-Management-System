'use client';

import { FormSelect } from '@/components/form/FormSelect';
import { COURSE_OPTIONS } from '@/lib/constants/form.constants';
import { StudentFormData } from '@/lib/schemas/student.schema';
import { GraduationCap, Info } from 'lucide-react';
import { FieldErrors, UseFormRegister } from 'react-hook-form';

interface AcademicInfoStepProps {
    register: UseFormRegister<StudentFormData>;
    errors: FieldErrors<StudentFormData>;
}

export function AcademicInfoStep({ register, errors }: AcademicInfoStepProps) {
    return (
        <div className="space-y-6">
            <div className="flex items-center gap-3 pb-4 border-b">
                <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
                    <GraduationCap className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                    <h3 className="text-lg font-semibold text-foreground">Academic Information</h3>
                    <p className="text-sm text-muted-foreground">
                        Select the course for the student
                    </p>
                </div>
            </div>

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

            <div className="flex items-start gap-3 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <div>
                    <p className="text-sm font-medium text-blue-900">Course Assignment</p>
                    <p className="text-xs text-blue-700 mt-1">
                        The selected course will be assigned to the student. You can change this
                        later from the student profile.
                    </p>
                </div>
            </div>
        </div>
    );
}
