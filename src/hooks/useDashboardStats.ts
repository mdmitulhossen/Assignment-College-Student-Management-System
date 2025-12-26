import { useStudentStore, type Student } from '@/store/student-store';
import { useMemo } from 'react';

export interface GenderDistribution {
    male: { count: number; percentage: string };
    female: { count: number; percentage: string };
    other: { count: number; percentage: string };
}

export interface CourseData {
    course: string;
    count: number;
}

export interface DashboardStats {
    totalStudents: number;
    activeStudents: number;
    inactiveStudents: number;
    uniqueCourses: number;
    genderDistribution: GenderDistribution;
    topCourses: CourseData[];
}

export function useDashboardStats(): DashboardStats {
    const { students } = useStudentStore();

    return useMemo(() => {
        const totalStudents = students.length;
        const activeStudents = students.filter((s: Student) => s.status === 'Active').length;
        const inactiveStudents = students.filter((s: Student) => s.status === 'Deleted').length;
        const uniqueCourses = new Set(students.map((s: Student) => s.course)).size;

        // Gender distribution
        const maleCount = students.filter((s: Student) => s.gender === 'Male').length;
        const femaleCount = students.filter((s: Student) => s.gender === 'Female').length;
        const otherCount = students.filter((s: Student) => s.gender === 'Other').length;

        const calculatePercentage = (count: number) =>
            totalStudents > 0 ? ((count / totalStudents) * 100).toFixed(1) : '0.0';

        const genderDistribution: GenderDistribution = {
            male: { count: maleCount, percentage: calculatePercentage(maleCount) },
            female: { count: femaleCount, percentage: calculatePercentage(femaleCount) },
            other: { count: otherCount, percentage: calculatePercentage(otherCount) },
        };

        // Top courses
        const courseCounts = students.reduce((acc: Record<string, number>, student: Student) => {
            acc[student.course] = (acc[student.course] || 0) + 1;
            return acc;
        }, {} as Record<string, number>);

        const topCourses: CourseData[] = Object.entries(courseCounts)
            .sort(([, a], [, b]) => (b as number) - (a as number))
            .slice(0, 5)
            .map(([course, count]) => ({ course, count: count as number }));

        return {
            totalStudents,
            activeStudents,
            inactiveStudents,
            uniqueCourses,
            genderDistribution,
            topCourses,
        };
    }, [students]);
}
