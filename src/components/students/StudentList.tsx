'use client';

import { ConfirmationModal } from '@/components/modal/ConfirmationModal';
import { StudentViewModal } from '@/components/modal/StudentViewModal';
import { PageHeader } from '@/components/shared/PageHeader';
import { useStudentActions } from '@/hooks/useStudentActions';
import { useStudentFilters } from '@/hooks/useStudentFilters';
import { COURSE_OPTIONS, GENDER_OPTIONS } from '@/lib/constants/form.constants';
import { ViewMode } from '@/lib/types/student-list.types';
import { useStudentStore } from '@/store/student-store';
import { useState } from 'react';
import { StudentCardView } from './StudentCardView';
import { StudentFiltersBar } from './StudentFiltersBar';
import { StudentTableView } from './StudentTableView';

export function StudentList() {
    const { students } = useStudentStore();
    const [viewMode, setViewMode] = useState<ViewMode>('table');

    const {
        viewModalOpen,
        deleteModalOpen,
        selectedStudent,
        handleView,
        handleEdit,
        handleDelete,
        handleRestore,
        confirmDelete,
        closeViewModal,
        closeDeleteModal,
    } = useStudentActions();

    const {
        processedStudents,
        filters,
        sort,
        handleFilterChange,
        handleSortFieldChange,
        handleSortOrderChange,
        handleResetFilters,
        totalCount,
        filteredCount,
    } = useStudentFilters({ students, debounceDelay: 300 });

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
                totalStudents={totalCount}
                filteredCount={filteredCount}
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
                onClose={closeViewModal}
                student={selectedStudent}
                onEdit={handleEdit}
                onDelete={handleDelete}
                onRestore={handleRestore}
            />

            {/* Delete Confirmation Modal */}
            <ConfirmationModal
                isOpen={deleteModalOpen}
                onClose={closeDeleteModal}
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
