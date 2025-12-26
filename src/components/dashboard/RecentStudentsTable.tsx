'use client';

import { CardHeading } from '@/components/shared/CardHeading';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { DataTable, type Column } from '@/components/ui/data-table';
import { useStudentStore, type Student } from '@/store/student-store';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { useMemo } from 'react';

export function RecentStudentsTable() {
    const { students } = useStudentStore();

    const recentStudents = useMemo(() => {
        return students
            .filter((s) => s.status === 'Active')
            .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
            .slice(0, 5);
    }, [students]);

    const getInitials = (name: string) => {
        return name
            .split(' ')
            .map((n) => n[0])
            .join('')
            .toUpperCase()
            .slice(0, 2);
    };

    const formatDate = (date: Date) => {
        return new Intl.DateTimeFormat('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
        }).format(new Date(date));
    };

    const getAvatarColor = (index: number) => {
        const colors = [
            'bg-teal-500',
            'bg-blue-500',
            'bg-purple-500',
            'bg-pink-500',
            'bg-orange-500',
        ];
        return colors[index % colors.length];
    };

    const getHobby = (email: string) => {
        if (email.includes('john')) return 'Travelling';
        if (email.includes('jane')) return 'Reading';
        if (email.includes('alex')) return 'Gaming';
        if (email.includes('emily')) return 'Painting';
        if (email.includes('michael')) return 'Sports';
        if (email.includes('sarah')) return 'Music';
        if (email.includes('david')) return 'Coding';
        if (email.includes('lisa')) return 'Dancing';
        if (email.includes('james')) return 'Photography';
        return 'Movies';
    };

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
            cell: (student) => (
                <p className="text-sm">
                    {new Date().getFullYear() - new Date(student.createdAt).getFullYear() + 18}
                </p>
            ),
        },
        {
            header: 'Hobby',
            cell: (student) => (
                <span className="inline-block px-3 py-1 bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400 rounded-full text-sm font-medium">
                    {getHobby(student.email)}
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
