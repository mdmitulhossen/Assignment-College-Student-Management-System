'use client';

import { FormSelect } from '@/components/form/FormSelect';
import { GENDER_OPTIONS } from '@/lib/constants/form.constants';
import { StudentFormData } from '@/lib/schemas/student.schema';
import { User } from 'lucide-react';
import { FieldErrors, UseFormRegister } from 'react-hook-form';
import { FormField } from '../FormField';

interface BasicInfoStepProps {
    register: UseFormRegister<StudentFormData>;
    errors: FieldErrors<StudentFormData>;
}

export function BasicInfoStep({ register, errors }: BasicInfoStepProps) {
    return (
        <div className="space-y-6">
            <div className="flex items-center gap-3 pb-4 border-b">
                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                    <User className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                    <h3 className="text-lg xl:text-xl font-semibold text-foreground">Basic Information</h3>
                    <p className="text-sm xl:text-base text-muted-foreground">
                        Enter the student&apos;s personal details
                    </p>
                </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
                <div className='md:col-span-2'>
                    <FormField
                        label="Full Name"
                        name="name"
                        register={register}
                        error={errors.name}
                        placeholder="e.g., John Doe"
                        helperText="Minimum 3 characters required"
                        required
                    />
                </div>

                <FormField
                    label="Age"
                    name="age"
                    type="number"
                    register={register}
                    error={errors.age}
                    placeholder="e.g., 20"
                    helperText="Must be between 16-60"
                    min={16}
                    max={60}
                    required
                />

                <FormSelect
                    label="Gender"
                    name="gender"
                    register={register}
                    error={errors.gender}
                    options={GENDER_OPTIONS}
                    placeholder="Select gender"
                    required
                />
            </div>
        </div>
    );
}
