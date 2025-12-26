'use client';

import { StudentForm } from '@/components/students/StudentForm';
import { useStudentStore } from '@/store/student-store';
import { notFound, useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function EditStudentPage() {
    const params = useParams();
    const studentId = params.id as string;
    const { getStudentById } = useStudentStore();
    const [isLoading, setIsLoading] = useState(true);
    const student = getStudentById(studentId);

    useEffect(() => {
        // Simulate loading for better UX
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 300);

        return () => clearTimeout(timer);
    }, []);

    // Show loading state
    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <div className="text-center space-y-4">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
                    <p className="text-muted-foreground">Loading student data...</p>
                </div>
            </div>
        );
    }

    // Student not found
    if (!student) {
        notFound();
    }

    // Student is deleted
    if (student.status === 'Deleted') {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <div className="text-center space-y-4">
                    <div className="text-6xl">🚫</div>
                    <h2 className="text-2xl font-bold text-foreground">Cannot Edit Deleted Student</h2>
                    <p className="text-muted-foreground">
                        This student has been deleted and cannot be edited.
                    </p>
                    <p className="text-sm text-muted-foreground">
                        Please restore the student first if you want to edit their information.
                    </p>
                </div>
            </div>
        );
    }

    return <StudentForm mode="edit" initialData={student} />;
}
