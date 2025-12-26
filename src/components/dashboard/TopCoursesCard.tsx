import { CardHeading } from '@/components/shared/CardHeading';
import { Button } from '@/components/ui/button';
import { type CourseData } from '@/hooks/useDashboardStats';
import { ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { Card, CardContent } from '../ui/card';

interface TopCoursesCardProps {
    courses: CourseData[];
}

export function TopCoursesCard({ courses }: TopCoursesCardProps) {
    return (
        <Card className="card-box">
            <CardContent className="pt-6">
                <div className="flex items-center justify-between mb-6">
                    <CardHeading title="Top Courses" />
                    <Link href="/students">
                        <Button variant="ghost" size="default" className="text-primary hover:text-primary/80 bg-primary/10">
                            View All
                            {/* <ArrowRight className="ml-1 h-4 w-4" />q */}
                        </Button>
                    </Link>
                </div>
                <div className="space-y-1">
                    {courses.length === 0 ? (
                        <p className="text-sm text-muted-foreground text-center py-8">
                            No courses available
                        </p>
                    ) : (
                        courses.map((course, index) => (
                            <div
                                key={index}
                                className="flex items-center gap-4 rounded-lg hover:bg-accent transition-colors cursor-pointer group sm:p-2 p-1"
                            >
                                <div className="flex h-12 w-12 items-center justify-center rounded-lg font-semibold shrink-0 group-hover:scale-105 transition-transform text-4xl text-primary">
                                    #{index + 1}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="font-semibold truncate">{course.course}</p>
                                    <p className="text-muted-foreground text-sm">
                                        {course.count} student{course.count !== 1 ? 's' : ''}
                                    </p>
                                </div>
                                <ChevronRight className="h-5 w-5 shrink-0 text-primary" />
                            </div>
                        ))
                    )}
                </div>
            </CardContent>
        </Card>
    );
}
