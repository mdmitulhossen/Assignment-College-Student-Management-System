import { Student, useStudentStore } from '@/store/student-store';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';

export function useStudentActions() {
    const router = useRouter();
    const { deleteStudent, restoreStudent } = useStudentStore();

    // Modal states
    const [viewModalOpen, setViewModalOpen] = useState(false);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);

    const handleView = (student: Student) => {
        setSelectedStudent(student);
        setViewModalOpen(true);
    };

    const handleEdit = (student: Student) => {
        router.push(`/students/${student.id}/edit`);
    };

    const handleDelete = (student: Student) => {
        setSelectedStudent(student);
        setDeleteModalOpen(true);
    };

    const confirmDelete = () => {
        if (selectedStudent) {
            deleteStudent(selectedStudent.id);
            toast.success(`${selectedStudent.name} has been deleted successfully`, {
                description: 'The student record has been moved to deleted status',
            });
            setDeleteModalOpen(false);
            setSelectedStudent(null);
        }
    };

    const handleRestore = (student: Student) => {
        restoreStudent(student.id);
        toast.success(`${student.name} has been restored successfully`, {
            description: 'The student is now active again',
        });
        setViewModalOpen(false);
        setSelectedStudent(null);
    };

    const closeViewModal = () => {
        setViewModalOpen(false);
        setSelectedStudent(null);
    };

    const closeDeleteModal = () => {
        setDeleteModalOpen(false);
        setSelectedStudent(null);
    };

    return {
        // States
        viewModalOpen,
        deleteModalOpen,
        selectedStudent,
        // Actions
        handleView,
        handleEdit,
        handleDelete,
        handleRestore,
        confirmDelete,
        // Modal controls
        closeViewModal,
        closeDeleteModal,
    };
}
