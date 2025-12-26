import {
    INITIAL_FILTERS,
    INITIAL_SORT,
    StudentFilters,
    StudentSort,
} from '@/lib/types/student-list.types';
import { sortStudents } from '@/lib/utils/student-list.utils';
import { Student } from '@/store/student-store';
import { debounce } from 'lodash';
import { useCallback, useEffect, useMemo, useState } from 'react';

interface UseStudentFiltersProps {
    students: Student[];
    debounceDelay?: number;
}

interface UseStudentFiltersReturn {
    // Processed data
    processedStudents: Student[];

    // Filter state
    filters: StudentFilters;
    setFilters: React.Dispatch<React.SetStateAction<StudentFilters>>;

    // Sort state
    sort: StudentSort;
    setSort: React.Dispatch<React.SetStateAction<StudentSort>>;

    // Actions
    handleFilterChange: (key: keyof StudentFilters, value: string) => void;
    handleSortFieldChange: (field: StudentSort['field']) => void;
    handleSortOrderChange: (order: StudentSort['order']) => void;
    handleResetFilters: () => void;

    // Stats
    totalCount: number;
    filteredCount: number;
}

export function useStudentFilters({
    students,
    debounceDelay = 300,
}: UseStudentFiltersProps): UseStudentFiltersReturn {
    const [filters, setFilters] = useState<StudentFilters>(INITIAL_FILTERS);
    const [sort, setSort] = useState<StudentSort>(INITIAL_SORT);
    const [debouncedSearch, setDebouncedSearch] = useState('');

    // Debounced search handler
    const debouncedSearchHandler = useMemo(
        () =>
            debounce((value: string) => {
                setDebouncedSearch(value);
            }, debounceDelay),
        [debounceDelay]
    );

    // Update debounced search term when filters.search changes
    useEffect(() => {
        debouncedSearchHandler(filters.search);

        // Cleanup debounce on unmount
        return () => {
            debouncedSearchHandler.cancel();
        };
    }, [filters.search, debouncedSearchHandler]);

    // Process students with filters, sort, and search
    const processedStudents = useMemo(() => {
        let result = students;

        // Apply debounced search filter
        if (debouncedSearch.trim()) {
            const searchLower = debouncedSearch.toLowerCase();
            result = result.filter(
                (student) =>
                    student.name.toLowerCase().includes(searchLower) ||
                    student.email?.toLowerCase().includes(searchLower) ||
                    student.course.toLowerCase().includes(searchLower) ||
                    student.phone?.toLowerCase().includes(searchLower)
            );
        }

        // Apply other filters (gender, course, status)
        if (filters.gender !== 'all') {
            result = result.filter((student) => student.gender === filters.gender);
        }

        if (filters.course !== 'all') {
            result = result.filter((student) => student.course === filters.course);
        }

        if (filters.status !== 'all') {
            result = result.filter((student) => student.status === filters.status);
        }

        // Apply sorting
        result = sortStudents(result, sort);

        return result;
    }, [students, filters.gender, filters.course, filters.status, sort, debouncedSearch]);

    // Filter change handler
    const handleFilterChange = useCallback(
        (key: keyof StudentFilters, value: string) => {
            setFilters((prev) => ({ ...prev, [key]: value }));
        },
        []
    );

    // Sort field change handler
    const handleSortFieldChange = useCallback((field: StudentSort['field']) => {
        setSort((prev) => ({ ...prev, field }));
    }, []);

    // Sort order change handler
    const handleSortOrderChange = useCallback((order: StudentSort['order']) => {
        setSort((prev) => ({ ...prev, order }));
    }, []);

    // Reset all filters
    const handleResetFilters = useCallback(() => {
        setFilters(INITIAL_FILTERS);
        setSort(INITIAL_SORT);
        setDebouncedSearch('');
    }, []);

    return {
        // Processed data
        processedStudents,

        // Filter state
        filters,
        setFilters,

        // Sort state
        sort,
        setSort,

        // Actions
        handleFilterChange,
        handleSortFieldChange,
        handleSortOrderChange,
        handleResetFilters,

        // Stats
        totalCount: students.length,
        filteredCount: processedStudents.length,
    };
}
