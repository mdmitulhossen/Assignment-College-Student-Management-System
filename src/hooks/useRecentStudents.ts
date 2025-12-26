import { type Student, useStudentStore } from '@/store/student-store';
import { useMemo } from 'react';

export function useRecentStudents(limit: number = 5) {
    const { students } = useStudentStore();

    const recentStudents = useMemo(() => {
        return students
            .filter((s: Student) => s.status === 'Active')
            .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
            .slice(0, limit);
    }, [students, limit]);

    return recentStudents;
}
