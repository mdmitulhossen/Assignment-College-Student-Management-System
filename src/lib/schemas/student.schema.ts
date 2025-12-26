import { z } from 'zod';

export const studentSchema = z.object({
    // Basic Information
    name: z
        .string({ message: 'Name is required' })
        .min(3, 'Name must be at least 3 characters')
        .max(100, 'Name must not exceed 100 characters'),
    age: z
        .number({ message: 'Age must be a number' })
        .int('Age must be a whole number')
        .min(16, 'Age must be at least 16')
        .max(60, 'Age must not exceed 60'),
    gender: z.enum(['Male', 'Female', 'Other'], {
        message: 'Gender is required',
    }),
    admissionDate: z
        .date({ message: 'Admission date is required' })
        .refine((date) => date <= new Date(), {
            message: 'Admission date cannot be in the future',
        }),

    // Academic Information
    course: z.string({ message: 'Course is required' }).min(1, 'Course is required'),

    // Personal Information
    hobby: z.enum(['Reading', 'Travelling', 'Movies', 'Games'], {
        message: 'Hobby is required',
    }),
    email: z.string().email('Invalid email address').optional().or(z.literal('')),
    phone: z.string().optional().or(z.literal('')),
});

export type StudentFormData = z.infer<typeof studentSchema>;

// Step-specific schemas for multi-step validation
export const basicInfoSchema = studentSchema.pick({
    name: true,
    age: true,
    gender: true,
    admissionDate: true,
});

export const academicInfoSchema = studentSchema.pick({
    course: true,
});

export const personalInfoSchema = studentSchema.pick({
    hobby: true,
    email: true,
    phone: true,
});

export type BasicInfoData = z.infer<typeof basicInfoSchema>;
export type AcademicInfoData = z.infer<typeof academicInfoSchema>;
export type PersonalInfoData = z.infer<typeof personalInfoSchema>;
