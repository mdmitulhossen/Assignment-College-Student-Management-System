'use client';

import { CardHeading } from '@/components/shared/CardHeading';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { DataTable, type Column } from '@/components/ui/data-table';
import { useRecentStudents } from '@/hooks/useRecentStudents';
import { useStudentActions } from '@/hooks/useStudentActions';
import { type Student } from '@/store/student-store';
import { formatDate } from '@/utils/format.utils';
import { User } from 'lucide-react';
import Link from 'next/link';
import { ConfirmationModal } from '../modal/ConfirmationModal';
import { StudentViewModal } from '../modal/StudentViewModal';
import { StudentActions } from '../students/StudentActions';
import { Badge } from '../ui/badge';

export function RecentStudentsTable() {
    const recentStudents = useRecentStudents(5);
    console.log(recentStudents, 'abc')
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

    const columns: Column<Student>[] = [
        {
            header: '#S_ID',
            cell: (student) => (
                <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-teal-50 flex items-center justify-center text-white font-semibold shrink-0">
                        <User className="h-6 w-6 text-teal-950" />
                    </div>
                    <div>
                        <p className="font-semibold">{student.id}</p>
                    </div>
                </div>
            ),
        },
        {
            header: 'Name',
            cell: (student) => (
                <div className="flex items-center gap-3">
                    <div>
                        <p className="font-semibold">{student.name}</p>
                    </div>
                </div>
            ),
        },
        {
            header: 'Course',
            accessor: 'course',
            cell: (student) => <p className="text-sm">{student.course}</p>,
        },
        {
            header: 'Joined',
            cell: (student) => (
                <p className="text-sm text-muted-foreground">{formatDate(student.createdAt)}</p>
            ),
        },
        {
            header: 'Gender',
            cell: (student) => <p className="text-sm">{student.gender}</p>,
        },
        {
            header: 'Age',
            cell: (student) => <p className="text-sm">{student.age}</p>,
        },
        {
            header: 'Hobby',
            cell: (student) => <p className="text-sm">{student.hobby}</p>,
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
            header: 'Action',
            cell: (student) => (
                <StudentActions
                    student={student}
                    onView={handleView}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                />
            ),
            className: 'text-right',
        },
    ];

    return (
        <>
            <Card className='card-box'>
                <CardContent className="pt-6">
                    <div className="flex items-center justify-between mb-6">
                        <CardHeading title="Recent Students" />
                        <Link href="/students">
                            <Button
                                variant="ghost"
                                size="default"
                                className="text-primary hover:text-primary/80 bg-primary/10"
                            >
                                View All
                            </Button>
                        </Link>
                    </div>

                    <DataTable
                        data={recentStudents}
                        columns={columns}
                        pageSize={5}
                        emptyStateTitle="No students found"
                        emptyStateDescription="Try adjusting your filters or add a new student"
                        emptyStateAction="Add Student"
                        emptyStateHref="/students/new"
                    />
                </CardContent>
            </Card>

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
                description={`Are you sure you want to delete ${selectedStudent?.name}? This action can be undone later from the view modal.`}
                confirmText="Delete"
                variant="destructive"
            />
        </>
    );
}
