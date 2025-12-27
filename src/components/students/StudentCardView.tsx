import { EmptyState } from '@/components/shared/EmptyState';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Student } from '@/store/student-store';
import { formatDate } from '@/utils/format.utils';
import { Calendar, GraduationCap, Hash, Heart, User } from 'lucide-react';
import { StudentActions } from './StudentActions';

interface StudentCardViewProps {
    students: Student[];
    onView: (student: Student) => void;
    onEdit: (student: Student) => void;
    onDelete: (student: Student) => void;
}

export function StudentCardView({
    students,
    onView,
    onEdit,
    onDelete,
}: StudentCardViewProps) {

    if (students.length === 0) {
        return (
            <EmptyState
                title="No students found"
                description="Try adjusting your search or filter criteria"
                actionLabel="Add Student"
                actionHref="/students/new"
            />
        );
    }

    return (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {students.map((student) => (
                <Card key={student.id} className="card-box">
                    <CardContent className="p-6">
                        <div className="flex items-start justify-between mb-4">
                            <div className="flex-1">
                                <h3 className="font-semibold text-lg">{student.name}</h3>
                                <Badge
                                    variant={student.status === 'Active' ? 'default' : 'destructive'}
                                    className="mt-2"
                                >
                                    {student.status}
                                </Badge>
                            </div>
                            <StudentActions
                                student={student}
                                onView={onView}
                                onEdit={onEdit}
                                onDelete={onDelete}
                            />
                        </div>

                        <div className="space-y-2 text-sm">
                            <div className="flex items-center gap-2 text-muted-foreground">
                                <Hash className="h-4 w-4" />
                                <span>{student.id}</span>
                            </div>
                            <div className="flex items-center gap-2 text-muted-foreground">
                                <GraduationCap className="h-4 w-4" />
                                <span>{student.course}</span>
                            </div>
                            <div className="flex items-center gap-2 text-muted-foreground">
                                <User className="h-4 w-4" />
                                <span>
                                    {student.gender} • {student.age} years
                                </span>
                            </div>
                            <div className="flex items-center gap-2 text-muted-foreground">
                                <Heart className="h-4 w-4" />
                                <span>{student.hobby}</span>
                            </div>
                            <div className="flex items-center gap-2 text-muted-foreground">
                                <Calendar className="h-4 w-4" />
                                <span>{formatDate(student.admissionDate)}</span>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
}
