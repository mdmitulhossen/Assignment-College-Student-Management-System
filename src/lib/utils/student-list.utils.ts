import { StudentFilters, StudentSort } from '@/lib/types/student-list.types';
import { Student } from '@/store/student-store';

export function filterStudents(students: Student[], filters: StudentFilters): Student[] {
    return students.filter((student) => {
        const searchLower = filters.search.toLowerCase();
        const matchesSearch =
            !filters.search ||
            student.name.toLowerCase().includes(searchLower) ||
            student.course.toLowerCase().includes(searchLower);

        const matchesGender =
            filters.gender === 'all' || student.gender === filters.gender;

        const matchesCourse =
            filters.course === 'all' || student.course === filters.course;

        const matchesStatus =
            filters.status === 'all' || student.status === filters.status;

        return matchesSearch && matchesGender && matchesCourse && matchesStatus;
    });
}

export function sortStudents(students: Student[], sort: StudentSort): Student[] {
    const sorted = [...students];

    sorted.sort((a, b) => {
        let compareValue = 0;

        if (sort.field === 'name') {
            compareValue = a.name.localeCompare(b.name);
        } else if (sort.field === 'admissionDate') {
            compareValue = new Date(a.admissionDate).getTime() - new Date(b.admissionDate).getTime();
        }

        return sort.order === 'asc' ? compareValue : -compareValue;
    });

    return sorted;
}

export function getUniqueValues<T, K extends keyof T>(
    items: T[],
    key: K
): Array<T[K]> {
    const uniqueSet = new Set(items.map((item) => item[key]));
    return Array.from(uniqueSet);
}
