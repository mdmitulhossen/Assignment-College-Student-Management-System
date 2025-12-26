import { Button } from '@/components/ui/button';
import { Student } from '@/store/student-store';
import { Eye, Pencil, Trash2 } from 'lucide-react';

interface StudentActionsProps {
    student: Student;
    onView: (student: Student) => void;
    onEdit: (student: Student) => void;
    onDelete: (student: Student) => void;
}

export function StudentActions({
    student,
    onView,
    onEdit,
    onDelete,
}: StudentActionsProps) {
    return (
        <div className="flex items-center gap-2">
            <Button
                variant="ghost"
                size="sm"
                onClick={() => onView(student)}
                className="h-8 w-8 p-0"
                title="View"
            >
                <Eye className="h-4 w-4" />
            </Button>
            <Button
                variant="ghost"
                size="sm"
                onClick={() => onEdit(student)}
                className="h-8 w-8 p-0"
                title="Edit"
            >
                <Pencil className="h-4 w-4" />
            </Button>
            <Button
                variant="ghost"
                size="sm"
                onClick={() => onDelete(student)}
                className="h-8 w-8 p-0 text-destructive hover:text-destructive"
                title="Delete"
            >
                <Trash2 className="h-4 w-4" />
            </Button>
        </div>
    );
}
