import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Student {
    id: string;
    name: string;
    email: string;
    phone: string;
    course: string;
    gender: 'Male' | 'Female' | 'Other';
    status: 'Active' | 'Deleted';
    createdAt: Date;
}

interface StudentStore {
    students: Student[];
    addStudent: (student: Omit<Student, 'id' | 'createdAt'>) => void;
    updateStudent: (id: string, student: Partial<Omit<Student, 'id' | 'createdAt'>>) => void;
    deleteStudent: (id: string) => void;
    getStudentById: (id: string) => Student | undefined;
}

export const useStudentStore = create<StudentStore>()(
    persist(
        (set, get) => ({
            students: [],
            addStudent: (student) =>
                set((state) => ({
                    students: [
                        ...state.students,
                        {
                            ...student,
                            id: crypto.randomUUID(),
                            createdAt: new Date(),
                        },
                    ],
                })),
            updateStudent: (id, updatedData) =>
                set((state) => ({
                    students: state.students.map((student) =>
                        student.id === id ? { ...student, ...updatedData } : student
                    ),
                })),
            deleteStudent: (id) =>
                set((state) => ({
                    students: state.students.map((student) =>
                        student.id === id ? { ...student, status: 'Deleted' as const } : student
                    ),
                })),
            getStudentById: (id) => get().students.find((student) => student.id === id),
        }),
        {
            name: 'student-storage',
        }
    )
);
