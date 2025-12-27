
import { generateStudentId } from '@/utils/student-id.utils';
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

export interface DraftFormData {
    name?: string;
    age?: number;
    gender?: 'Male' | 'Female' | 'Other';
    course?: string;
    hobby?: HobbyType;
    admissionDate?: Date;
}

interface StudentStore {
    students: Student[];
    draftStudent: DraftFormData | null;
    addStudent: (student: Omit<Student, 'id' | 'status' | 'createdAt' | 'updatedAt'>) => void;
    updateStudent: (id: string, student: Partial<Omit<Student, 'id' | 'createdAt' | 'updatedAt'>>) => void;
    deleteStudent: (id: string) => void;
    restoreStudent: (id: string) => void;
    getStudentById: (id: string) => Student | undefined;
    saveDraft: (data: DraftFormData) => void;
    clearDraft: () => void;
    getDraft: () => DraftFormData | null;
}

export const useStudentStore = create<StudentStore>()(
    persist(
        (set, get) => ({
            students: [],
            draftStudent: null,
            addStudent: (student) =>
                set((state) => ({
                    students: [
                        ...state.students,
                        {
                            ...student,
                            id: generateStudentId(state.students),
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
            saveDraft: (data) => set({ draftStudent: data }),
            clearDraft: () => set({ draftStudent: null }),
            getDraft: () => get().draftStudent,
        }),
        {
            name: 'student-storage',
        }
    )
);
