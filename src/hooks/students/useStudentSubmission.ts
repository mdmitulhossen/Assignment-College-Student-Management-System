import { StudentFormData } from '@/lib/schemas/student.schema';
import { useStudentStore } from '@/store/student-store';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export function useStudentSubmission() {
    const router = useRouter();
    const { addStudent } = useStudentStore();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const submitStudent = async (data: StudentFormData) => {
        setIsSubmitting(true);

        await new Promise((resolve) => setTimeout(resolve, 1500));

        try {
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

    return {
        isSubmitting,
        submitStudent,
    };
}
