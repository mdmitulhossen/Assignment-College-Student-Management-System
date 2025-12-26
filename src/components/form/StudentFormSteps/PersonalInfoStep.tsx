'use client';

import { FormSelect } from '@/components/form/FormSelect';
import { HOBBY_OPTIONS } from '@/lib/constants/form.constants';
import { StudentFormData } from '@/lib/schemas/student.schema';
import { CheckCircle2, Heart } from 'lucide-react';
import { FieldErrors, UseFormRegister } from 'react-hook-form';

interface PersonalInfoStepProps {
    register: UseFormRegister<StudentFormData>;
    errors: FieldErrors<StudentFormData>;
}

export function PersonalInfoStep({ register, errors }: PersonalInfoStepProps) {
    return (
        <div className="space-y-6">
            <div className="flex items-center gap-3 pb-4 border-b">
                <div className="w-10 h-10 rounded-full bg-pink-100 flex items-center justify-center">
                    <Heart className="w-5 h-5 text-pink-600" />
                </div>
                <div>
                    <h3 className="text-lg xl:text-xl font-semibold text-foreground">Personal Information</h3>
                    <p className="text-sm xl:text-base text-muted-foreground">
                        Additional details about the student
                    </p>
                </div>
            </div>

            <FormSelect
                label="Hobby"
                name="hobby"
                register={register}
                error={errors.hobby}
                options={HOBBY_OPTIONS}
                placeholder="Select a hobby"
                helperText="Choose the student&apos;s primary interest"
                required
            />

            <div className="flex items-start gap-3 p-4 bg-green-50 border border-green-200 rounded-lg">
                <CheckCircle2 className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
                <div>
                    <p className="text-sm font-medium text-green-900">Almost Done!</p>
                    <p className="text-xs text-green-700 mt-1">
                        Review your information and click Submit to create the student record.
                    </p>
                </div>
            </div>
        </div>
    );
}

