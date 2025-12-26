export type ViewMode = 'table' | 'card';

export type SortField = 'name' | 'admissionDate';
export type SortOrder = 'asc' | 'desc';

export interface StudentFilters {
    search: string;
    gender: string;
    course: string;
    status: string;
}

export interface StudentSort {
    field: SortField;
    order: SortOrder;
}

export const INITIAL_FILTERS: StudentFilters = {
    search: '',
    gender: 'all',
    course: 'all',
    status: 'all',
};

export const INITIAL_SORT: StudentSort = {
    field: 'name',
    order: 'asc',
};
