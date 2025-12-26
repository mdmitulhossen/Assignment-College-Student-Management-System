import { Button } from '@/components/ui/button';
import { type CourseData } from '@/hooks/useDashboardStats';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { Card, CardContent } from '../ui/card';

interface TopCoursesCardProps {
    courses: CourseData[];
}

export function TopCoursesCard({ courses }: TopCoursesCardProps) {
    return (
        <Card className="transition-all hover:shadow-lg">
            <CardContent className="pt-6">
                <div className="flex items-center justify-between mb-6">
                    <h3 className="text-2xl font-bold">Top Courses</h3>
                    <Link href="/students">
                        <Button variant="ghost" size="default" className="text-primary hover:text-primary/80">
                            View All <ArrowRight className="ml-1 h-4 w-4" />
                        </Button>
                    </Link>
                </div>
                <div className="space-y-4">
                    {courses.length === 0 ? (
                        <p className="text-sm text-muted-foreground text-center py-8">
                            No courses available
                        </p>
                    ) : (
                        courses.map((course, index) => (
                            <div
                                key={index}
                                className="flex items-center gap-4 rounded-lg hover:bg-accent transition-colors cursor-pointer group"
                            >
                                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-linear-to-r from-(--gradient-start) to-(--gradient-end) text-white font-bold shrink-0 group-hover:scale-105 transition-transform">
                                    #{index + 1}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="font-semibold truncate text-lg">{course.course}</p>
                                    <p className="text-sm text-muted-foreground">
                                        {course.count} student{course.count !== 1 ? 's' : ''}
                                    </p>
                                </div>
                                <ArrowRight className="h-5 w-5 text-muted-foreground shrink-0" />
                            </div>
                        ))
                    )}
                </div>
            </CardContent>
        </Card>
    );
}
