import { Student } from '@/store/student-store';

/**
 * Generates a new student ID in the format S_ID00001, S_ID00002, etc.
 * @param existingStudents - Array of existing students to check for the last ID
 * @returns A new unique student ID
 */
export function generateStudentId(existingStudents: Student[]): string {
    if (existingStudents.length === 0) {
        return 'S_ID00001';
    }

    // Extract all numeric IDs from existing students
    const numericIds = existingStudents
        .map(student => {
            const match = student.id.match(/^S_ID(\d+)$/);
            return match ? parseInt(match[1], 10) : 0;
        })
        .filter(id => id > 0);

    // Find the highest ID number
    const maxId = numericIds.length > 0 ? Math.max(...numericIds) : 0;

    // Generate next ID with proper padding
    const nextId = maxId + 1;
    const paddedId = nextId.toString().padStart(5, '0');

    return `S_ID${paddedId}`;
}
