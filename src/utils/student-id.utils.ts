import { Student } from '@/store/student-store';

export function generateStudentId(existingStudents: Student[]): string {
    if (existingStudents.length === 0) {
        return 'S_ID00001';
    }

    const numericIds = existingStudents
        .map(student => {
            const match = student.id.match(/^S_ID(\d+)$/);
            return match ? parseInt(match[1], 10) : 0;
        })
        .filter(id => id > 0);

    const maxId = numericIds.length > 0 ? Math.max(...numericIds) : 0;
    const nextId = maxId + 1;
    const paddedId = nextId.toString().padStart(5, '0');

    return `S_ID${paddedId}`;
}
