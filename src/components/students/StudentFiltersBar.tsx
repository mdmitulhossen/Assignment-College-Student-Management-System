import { Button } from '@/components/ui/button';
import { StudentFilters, StudentSort, ViewMode } from '@/lib/types/student-list.types';
import { X } from 'lucide-react';
import { FilterDropdown } from './FilterDropdown';
import { SearchBar } from './SearchBar';
import { SortSelect } from './SortSelect';
import { ViewToggle } from './ViewToggle';

interface FilterOption {
    value: string;
    label: string;
}

interface StudentFiltersBarProps {
    filters: StudentFilters;
    sort: StudentSort;
    viewMode: ViewMode;
    totalStudents: number;
    filteredCount: number;
    genderOptions: FilterOption[];
    courseOptions: FilterOption[];
    statusOptions: FilterOption[];
    onFilterChange: (key: keyof StudentFilters, value: string) => void;
    onSortFieldChange: (field: StudentSort['field']) => void;
    onSortOrderChange: (order: StudentSort['order']) => void;
    onViewModeChange: (view: ViewMode) => void;
    onResetFilters: () => void;
}

export function StudentFiltersBar({
    filters,
    sort,
    viewMode,
    totalStudents,
    filteredCount,
    genderOptions,
    courseOptions,
    statusOptions,
    onFilterChange,
    onSortFieldChange,
    onSortOrderChange,
    onViewModeChange,
    onResetFilters,
}: StudentFiltersBarProps) {
    const hasActiveFilters =
        filters.search ||
        filters.gender !== 'all' ||
        filters.course !== 'all' ||
        filters.status !== 'all';

    return (
        <div className="space-y-4">
            <div className="flex gap-3 items-start sm:items-center justify-between">
                <div className="flex-1 w-full sm:w-auto">
                    <SearchBar
                        value={filters.search}
                        onChange={(value) => onFilterChange('search', value)}
                        placeholder="Search by name or course..."
                    />
                </div>

                <div className="flex gap-3 items-center">
                    <ViewToggle view={viewMode} onChange={onViewModeChange} />

                    {hasActiveFilters && (
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={onResetFilters}
                            className="whitespace-nowrap"
                        >
                            <X className="h-4 w-4 mr-2" />
                            Reset
                        </Button>
                    )}
                </div>
            </div>

            {/* Second Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                <FilterDropdown
                    label="Gender"
                    value={filters.gender}
                    options={genderOptions}
                    onChange={(value) => onFilterChange('gender', value)}
                />

                <FilterDropdown
                    label="Course"
                    value={filters.course}
                    options={courseOptions}
                    onChange={(value) => onFilterChange('course', value)}
                />

                <FilterDropdown
                    label="Status"
                    value={filters.status}
                    options={statusOptions}
                    onChange={(value) => onFilterChange('status', value)}
                />

                <SortSelect
                    label="Sort By"
                    field={sort.field}
                    order={sort.order}
                    onFieldChange={onSortFieldChange}
                    onOrderChange={onSortOrderChange}
                />
            </div>

            <div className="text-sm text-muted-foreground">
                Showing {filteredCount} of {totalStudents} students
            </div>
        </div>
    );
}
