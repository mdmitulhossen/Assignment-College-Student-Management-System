'use client';

import { CardHeading } from '@/components/shared/CardHeading';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { DataTable, type Column } from '@/components/ui/data-table';
import { useRecentStudents } from '@/hooks/useRecentStudents';
import { getAvatarColor, getHobbyFromEmail } from '@/lib/dashboard.constants';
import { type Student } from '@/store/student-store';
import { calculateAge, formatDate, getInitials } from '@/utils/format.utils';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

export function RecentStudentsTable() {
    const recentStudents = useRecentStudents(5);

    const columns: Column<Student>[] = [
        {
            header: 'Student',
            cell: (student) => {
                const index = recentStudents.findIndex((s) => s.id === student.id);
                return (
                    <div className="flex items-center gap-3">
                        <div
                            className={`h-10 w-10 rounded-full ${getAvatarColor(index)} flex items-center justify-center text-white font-semibold shrink-0`}
                        >
                            {getInitials(student.name)}
                        </div>
                        <div>
                            <p className="font-semibold">{student.name}</p>
                            <p className="text-sm text-muted-foreground">{student.gender}</p>
                        </div>
                    </div>
                );
            },
        },
        {
            header: 'Course',
            accessor: 'course',
            cell: (student) => <p className="text-sm">{student.course}</p>,
        },
        {
            header: 'Age',
            cell: (student) => <p className="text-sm">{calculateAge(student.createdAt)}</p>,
        },
        {
            header: 'Hobby',
            cell: (student) => (
                <span className="inline-block px-3 py-1 bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400 rounded-full text-sm font-medium">
                    {getHobbyFromEmail(student.email)}
                </span>
            ),
        },
        {
            header: 'Joined',
            cell: (student) => (
                <p className="text-sm text-muted-foreground">{formatDate(student.createdAt)}</p>
            ),
        },
        {
            header: 'Action',
            cell: (student) => (
                <div className="text-right">
                    <Link href={`/students/${student.id}`}>
                        <Button
                            variant="ghost"
                            size="sm"
                            className="text-muted-foreground hover:text-primary"
                        >
                            View <ArrowRight className="ml-1 h-4 w-4" />
                        </Button>
                    </Link>
                </div>
            ),
            className: 'text-right',
        },
    ];

    return (
        <Card className='card-box'>
            <CardContent className="pt-6">
                <div className="flex items-center justify-between mb-6">
                    <CardHeading title="Recent Students" />
                    <Link href="/students">
                        <Button
                            variant="ghost"
                            size="default"
                            className="text-primary hover:text-primary/80"
                        >
                            View All <ArrowRight className="ml-1 h-4 w-4" />
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
    );
}
