import { AcademicInfoStep } from '@/components/form/StudentFormSteps/AcademicInfoStep';
import { BasicInfoStep } from '@/components/form/StudentFormSteps/BasicInfoStep';
import { PersonalInfoStep } from '@/components/form/StudentFormSteps/PersonalInfoStep';
import { StudentFormData } from '@/lib/schemas/student.schema';
import { FieldErrors, UseFormRegister } from 'react-hook-form';

interface StepContentProps {
    currentStep: number;
    register: UseFormRegister<StudentFormData>;
    errors: FieldErrors<StudentFormData>;
}

export function StepContent({ currentStep, register, errors }: StepContentProps) {
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
}
