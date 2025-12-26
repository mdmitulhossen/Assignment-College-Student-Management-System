'use client';

import { Button } from '@/components/ui/button';
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
import { Plus, X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useMemo, useState } from 'react';
import { FilterDropdown } from './FilterDropdown';
import { SearchBar } from './SearchBar';
import { SortSelect } from './SortSelect';
import { StudentCardView } from './StudentCardView';
import { StudentTableView } from './StudentTableView';
import { ViewToggle } from './ViewToggle';

export function StudentList() {
    const router = useRouter();
    const { students, deleteStudent } = useStudentStore();
    const [viewMode, setViewMode] = useState<ViewMode>('table');
    const [filters, setFilters] = useState<StudentFilters>(INITIAL_FILTERS);
    const [sort, setSort] = useState<StudentSort>(INITIAL_SORT);

    const activeStudents = students.filter((s) => s.status === 'Active');

    const processedStudents = useMemo(() => {
        let result = filterStudents(activeStudents, filters);
        result = sortStudents(result, sort);
        return result;
    }, [activeStudents, filters, sort]);

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
        router.push(`/students/${student.id}`);
    };

    const handleEdit = (student: Student) => {
        router.push(`/students/${student.id}/edit`);
    };

    const handleDelete = (student: Student) => {
        if (confirm(`Are you sure you want to delete ${student.name}?`)) {
            deleteStudent(student.id);
        }
    };

    const hasActiveFilters =
        filters.search || filters.gender !== 'all' || filters.course !== 'all' || filters.status !== 'all';

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
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl lg:text-3xl font-bold text-foreground">Students</h1>
                    <p className="text-muted-foreground mt-1">
                        Manage and view all student records
                    </p>
                </div>
                <Button onClick={() => router.push('/students/new')}>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Student
                </Button>
            </div>

            <div className="p-4 lg:p-6 space-y-4">
                <div className="flex flex-col lg:flex-row gap-4">
                    <SearchBar
                        value={filters.search}
                        onChange={(value) => handleFilterChange('search', value)}
                        placeholder="Search by name or course..."
                    />

                    <div className="flex flex-col sm:flex-row gap-4 flex-wrap lg:flex-nowrap">
                        <FilterDropdown
                            value={filters.gender}
                            options={genderOptions}
                            onChange={(value) => handleFilterChange('gender', value)}
                        />

                        <FilterDropdown
                            value={filters.course}
                            options={courseOptions}
                            onChange={(value) => handleFilterChange('course', value)}
                        />

                        <FilterDropdown
                            value={filters.status}
                            options={statusOptions}
                            onChange={(value) => handleFilterChange('status', value)}
                        />

                        <SortSelect
                            field={sort.field}
                            order={sort.order}
                            onFieldChange={handleSortFieldChange}
                            onOrderChange={handleSortOrderChange}
                        />

                        <ViewToggle view={viewMode} onChange={setViewMode} />

                        {hasActiveFilters && (
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={handleResetFilters}
                                className="whitespace-nowrap"
                            >
                                <X className="h-4 w-4 mr-2" />
                                Reset
                            </Button>
                        )}
                    </div>
                </div>

                <div className="text-sm text-muted-foreground">
                    Showing {processedStudents.length} of {activeStudents.length} students
                </div>
            </div>

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
        </div>
    );
}
