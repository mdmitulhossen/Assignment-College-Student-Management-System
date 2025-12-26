import { Button } from '@/components/ui/button';
import { Student } from '@/store/student-store';
import { Edit, Eye, Trash } from 'lucide-react';

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
    const isDeleted = student.status === 'Deleted';

    return (
        <div className="flex items-center justify-end gap-2">
            <Button
                variant="ghost"
                size="default"
                onClick={() => onView(student)}
                className="h-8 w-8 p-0 cursor-pointer"
                title="View"
            >
                <Eye className="w-5! h-5!" />
            </Button>
            {!isDeleted && (
                <>
                    <Button
                        variant="ghost"
                        size="default"
                        onClick={() => onEdit(student)}
                        className="h-8 w-8 p-0 cursor-pointer"
                        title="Edit"
                    >
                        <Edit className="h-5! w-5!" />
                    </Button>
                    <Button
                        variant="ghost"
                        size="default"
                        onClick={() => onDelete(student)}
                        className="h-8 w-8 p-0 text-destructive hover:text-destructive cursor-pointer"
                        title="Delete"
                    >
                        <Trash className="h-5! w-5! text-red-500" />
                    </Button>
                </>
            )}
        </div>
    );
}
