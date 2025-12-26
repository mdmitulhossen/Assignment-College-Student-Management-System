import { Column, DataTable } from '@/components/ui/data-table';
import { Student } from '@/store/student-store';
import { formatDate } from '@/utils/format.utils';
import { Badge } from '../ui/badge';
import { StudentActions } from './StudentActions';

interface StudentTableViewProps {
    students: Student[];
    onView: (student: Student) => void;
    onEdit: (student: Student) => void;
    onDelete: (student: Student) => void;
}

export function StudentTableView({
    students,
    onView,
    onEdit,
    onDelete,
}: StudentTableViewProps) {
    const columns: Column<Student>[] = [
        {
            header: 'Name',
            accessor: 'name',
            className: 'font-medium',
        },
        {
            header: 'Course',
            accessor: 'course',
        },
        {
            header: 'Age',
            accessor: 'age',
            className: 'text-center',
        },
        {
            header: 'Gender',
            accessor: 'gender',
        },
        {
            header: 'Hobby',
            accessor: 'hobby',
        },
        {
            header: 'Admission Date',
            cell: (student) => formatDate(student.admissionDate),
        },
        {
            header: 'Status',
            cell: (student) => (
                <Badge variant={student.status === 'Active' ? 'default' : 'destructive'}>
                    {student.status}
                </Badge>
            ),
        },
        {
            header: 'Actions',
            cell: (student) => (
                <StudentActions
                    student={student}
                    onView={onView}
                    onEdit={onEdit}
                    onDelete={onDelete}
                />
            ),
            className: 'text-right',
        },
    ];

    return (
        <DataTable
            data={students}
            columns={columns}
            pageSize={10}
            emptyStateTitle="No students found"
            emptyStateDescription="Try adjusting your search or filter criteria"
            emptyStateAction="Add Student"
            emptyStateHref="/students/new"
        />
    );
}
