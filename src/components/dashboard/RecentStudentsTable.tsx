'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useStudentStore } from '@/store/student-store';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { useMemo } from 'react';
import { CardHeading } from '../shared/CardHeading';

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

    return (
        <Card className="card-box">
            <CardContent className="pt-6">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                    <CardHeading title="Recent Students" />

                    <Link href="/students">
                        <Button variant="ghost" size="default" className="text-primary hover:text-primary/80">
                            View All <ArrowRight className="ml-1 h-4 w-4" />
                        </Button>
                    </Link>
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b">
                                <th className="text-left py-3 px-4 text-sm font-bold text-muted-foreground uppercase">
                                    Student
                                </th>
                                <th className="text-left py-3 px-4 text-sm font-bold text-muted-foreground uppercase">
                                    Course
                                </th>
                                <th className="text-left py-3 px-4 text-sm font-bold text-muted-foreground uppercase">
                                    Age
                                </th>
                                <th className="text-left py-3 px-4 text-sm font-bold text-muted-foreground uppercase">
                                    Hobby
                                </th>
                                <th className="text-left py-3 px-4 text-sm font-bold text-muted-foreground uppercase">
                                    Joined
                                </th>
                                <th className="text-right py-3 px-4 text-sm font-bold text-muted-foreground uppercase">
                                    Action
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {recentStudents.length === 0 ? (
                                <tr>
                                    <td
                                        colSpan={6}
                                        className="text-center py-8 text-muted-foreground"
                                    >
                                        No recent students
                                    </td>
                                </tr>
                            ) : (
                                recentStudents.map((student, index) => (
                                    <tr
                                        key={student.id}
                                        className="border-b last:border-0 hover:bg-muted/50 transition-colors"
                                    >
                                        {/* Student */}
                                        <td className="py-4 px-4">
                                            <div className="flex items-center gap-3">
                                                <div
                                                    className={`h-10 w-10 rounded-full ${getAvatarColor(index)} flex items-center justify-center text-white font-semibold shrink-0`}
                                                >
                                                    {getInitials(student.name)}
                                                </div>
                                                <div>
                                                    <p className="font-semibold">
                                                        {student.name}
                                                    </p>
                                                    <p className="text-sm text-muted-foreground">
                                                        {student.gender}
                                                    </p>
                                                </div>
                                            </div>
                                        </td>

                                        {/* Course */}
                                        <td className="py-4 px-4">
                                            <p className="text-sm">{student.course}</p>
                                        </td>

                                        {/* Age */}
                                        <td className="py-4 px-4">
                                            <p className="text-sm">
                                                {new Date().getFullYear() -
                                                    new Date(student.createdAt).getFullYear() +
                                                    18}
                                            </p>
                                        </td>

                                        {/* Hobby */}
                                        <td className="py-4 px-4">
                                            <span className="inline-block px-3 py-1 bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400 rounded-full text-sm font-medium">
                                                {student.email.includes('john')
                                                    ? 'Travelling'
                                                    : student.email.includes('jane')
                                                        ? 'Reading'
                                                        : student.email.includes('alex')
                                                            ? 'Gaming'
                                                            : student.email.includes('emily')
                                                                ? 'Painting'
                                                                : student.email.includes('michael')
                                                                    ? 'Sports'
                                                                    : student.email.includes('sarah')
                                                                        ? 'Music'
                                                                        : student.email.includes('david')
                                                                            ? 'Coding'
                                                                            : student.email.includes('lisa')
                                                                                ? 'Dancing'
                                                                                : student.email.includes('james')
                                                                                    ? 'Photography'
                                                                                    : 'Movies'}
                                            </span>
                                        </td>

                                        {/* Joined */}
                                        <td className="py-4 px-4">
                                            <p className="text-sm text-muted-foreground">
                                                {formatDate(student.createdAt)}
                                            </p>
                                        </td>

                                        {/* Action */}
                                        <td className="py-4 px-4 text-right">
                                            <Link href={`/students/${student.id}`}>
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    className="text-muted-foreground hover:text-primary"
                                                >
                                                    View <ArrowRight className="ml-1 h-4 w-4" />
                                                </Button>
                                            </Link>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </CardContent>
        </Card>
    );
}
