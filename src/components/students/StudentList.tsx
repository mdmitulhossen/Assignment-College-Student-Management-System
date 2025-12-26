'use client';

import { ConfirmationModal } from '@/components/modal/ConfirmationModal';
import { StudentViewModal } from '@/components/modal/StudentViewModal';
import { PageHeader } from '@/components/shared/PageHeader';
import { COURSE_OPTIONS, GENDER_OPTIONS } from '@/lib/constants/form.constants';
import {
    INITIAL_FILTERS,
    INITIAL_SORT,
    StudentFilters,
    StudentSort,
    ViewMode,
} from '@/lib/types/student-list.types';
import { filterStudents, sortStudents } from '@/lib/utils/student-list.utils';
import { Student, useStudentStore } from '@/store/student-store';
import { useRouter } from 'next/navigation';
import { useMemo, useState } from 'react';
import { toast } from 'sonner';
import { StudentCardView } from './StudentCardView';
import { StudentFiltersBar } from './StudentFiltersBar';
import { StudentTableView } from './StudentTableView';

export function StudentList() {
    const router = useRouter();
    const { students, deleteStudent, restoreStudent } = useStudentStore();
    const [viewMode, setViewMode] = useState<ViewMode>('table');
    const [filters, setFilters] = useState<StudentFilters>(INITIAL_FILTERS);
    const [sort, setSort] = useState<StudentSort>(INITIAL_SORT);

    // Modal states
    const [viewModalOpen, setViewModalOpen] = useState(false);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);

    // const activeStudents = students.filter((s) => s.status === 'Active');

    const processedStudents = useMemo(() => {
        let result = filterStudents(students, filters);
        result = sortStudents(result, sort);
        return result;
    }, [students, filters, sort]);

    const handleFilterChange = (key: keyof StudentFilters, value: string) => {
        setFilters((prev) => ({ ...prev, [key]: value }));
    };

    const handleSortFieldChange = (field: StudentSort['field']) => {
        setSort((prev) => ({ ...prev, field }));
    };

    const handleSortOrderChange = (order: StudentSort['order']) => {
        setSort((prev) => ({ ...prev, order }));
    };

    const handleResetFilters = () => {
        setFilters(INITIAL_FILTERS);
        setSort(INITIAL_SORT);
    };

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

    const genderOptions = [
        { value: 'all', label: 'All Genders' },
        ...GENDER_OPTIONS.map((g) => ({ value: g.value, label: g.label })),
    ];

    const courseOptions = [
        { value: 'all', label: 'All Courses' },
        ...COURSE_OPTIONS.map((c) => ({ value: c.value, label: c.label })),
    ];

    const statusOptions = [
        { value: 'all', label: 'All Status' },
        { value: 'Active', label: 'Active' },
        { value: 'Deleted', label: 'Deleted' },
    ];

    return (
        <div className="space-y-6">
            <PageHeader
                title="Students"
                subtitle="Manage and view all student records"
                action={{
                    href: '/students/new',
                    label: 'Add Student',
                    icon: '+',
                }}
            />

            <StudentFiltersBar
                filters={filters}
                sort={sort}
                viewMode={viewMode}
                totalStudents={students.length}
                filteredCount={processedStudents.length}
                genderOptions={genderOptions}
                courseOptions={courseOptions}
                statusOptions={statusOptions}
                onFilterChange={handleFilterChange}
                onSortFieldChange={handleSortFieldChange}
                onSortOrderChange={handleSortOrderChange}
                onViewModeChange={setViewMode}
                onResetFilters={handleResetFilters}
            />

            <div className="card-box bg-card">
                {viewMode === 'table' ? (
                    <StudentTableView
                        students={processedStudents}
                        onView={handleView}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                    />
                ) : (
                    <div className="p-6">
                        <StudentCardView
                            students={processedStudents}
                            onView={handleView}
                            onEdit={handleEdit}
                            onDelete={handleDelete}
                        />
                    </div>
                )}
            </div>

            {/* View Modal */}
            <StudentViewModal
                isOpen={viewModalOpen}
                onClose={() => {
                    setViewModalOpen(false);
                    setSelectedStudent(null);
                }}
                student={selectedStudent}
                onEdit={handleEdit}
                onDelete={handleDelete}
                onRestore={handleRestore}
            />

            {/* Delete Confirmation Modal */}
            <ConfirmationModal
                isOpen={deleteModalOpen}
                onClose={() => {
                    setDeleteModalOpen(false);
                    setSelectedStudent(null);
                }}
                onConfirm={confirmDelete}
                title="Delete Student"
                description={`Are you sure you want to delete ${selectedStudent?.name}? This will change the student's status to deleted.`}
                confirmText="Delete"
                cancelText="Cancel"
                variant="destructive"
            />
        </div>
    );
}
