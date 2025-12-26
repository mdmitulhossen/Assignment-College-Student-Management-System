import { StudentFormData } from '@/lib/schemas/student.schema';
import { useStudentStore } from '@/store/student-store';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';

export function useStudentSubmission(mode: 'add' | 'edit' = 'add', studentId?: string) {
    const router = useRouter();
    const { addStudent, updateStudent } = useStudentStore();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const submitStudent = async (data: StudentFormData) => {
        setIsSubmitting(true);

        await new Promise((resolve) => setTimeout(resolve, 1000));

        try {
            const cleanedData = {
                ...data,
                email: data.email || undefined,
                phone: data.phone || undefined,
            };

            if (mode === 'edit' && studentId) {
                updateStudent(studentId, cleanedData);
                toast.success('Student updated successfully', {
                    description: 'The student information has been updated',
                });
            } else {
                addStudent(cleanedData);
                toast.success('Student added successfully', {
                    description: 'A new student record has been created',
                });
            }

            router.push('/students');
        } catch (error) {
            console.error(`Failed to ${mode} student:`, error);
            toast.error(`Failed to ${mode} student`, {
                description: 'Please try again',
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return {
        isSubmitting,
        submitStudent,
    };
}
