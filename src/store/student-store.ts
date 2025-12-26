import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type HobbyType = 'Reading' | 'Travelling' | 'Movies' | 'Games';

export interface Student {
    id: string;
    name: string;
    age: number;
    gender: 'Male' | 'Female' | 'Other';
    course: string;
    hobby: HobbyType;
    admissionDate: Date;
    email?: string;
    phone?: string;
    status: 'Active' | 'Deleted';
    createdAt: Date;
    updatedAt: Date;
}

interface StudentStore {
    students: Student[];
    addStudent: (student: Omit<Student, 'id' | 'status' | 'createdAt' | 'updatedAt'>) => void;
    updateStudent: (id: string, student: Partial<Omit<Student, 'id' | 'createdAt' | 'updatedAt'>>) => void;
    deleteStudent: (id: string) => void;
    restoreStudent: (id: string) => void;
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
                            status: 'Active' as const,
                            createdAt: new Date(),
                            updatedAt: new Date(),
                        },
                    ],
                })),
            updateStudent: (id, updatedData) =>
                set((state) => ({
                    students: state.students.map((student) =>
                        student.id === id
                            ? { ...student, ...updatedData, updatedAt: new Date() }
                            : student
                    ),
                })),
            deleteStudent: (id) =>
                set((state) => ({
                    students: state.students.map((student) =>
                        student.id === id ? { ...student, status: 'Deleted' as const } : student
                    ),
                })),
            restoreStudent: (id) =>
                set((state) => ({
                    students: state.students.map((student) =>
                        student.id === id
                            ? { ...student, status: 'Active' as const, updatedAt: new Date() }
                            : student
                    ),
                })),
            getStudentById: (id) => get().students.find((student) => student.id === id),
        }),
        {
            name: 'student-storage',
        }
    )
);
