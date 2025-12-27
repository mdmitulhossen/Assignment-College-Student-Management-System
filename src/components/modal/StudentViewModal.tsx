'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Student } from '@/store/student-store';
import { formatDate } from '@/utils/format.utils';
import {
    BookOpen,
    Calendar,
    Edit,
    Heart,
    Mail,
    Phone,
    Trash2,
    Undo2,
    User,
} from 'lucide-react';
import { Modal } from './Modal';

interface StudentViewModalProps {
    isOpen: boolean;
    onClose: () => void;
    student: Student | null;
    onEdit?: (student: Student) => void;
    onDelete?: (student: Student) => void;
    onRestore?: (student: Student) => void;
}

export function StudentViewModal({
    isOpen,
    onClose,
    student,
    onEdit,
    onDelete,
    onRestore,
}: StudentViewModalProps) {
    if (!student) return null;

    const InfoRow = ({
        icon: Icon,
        label,
        value,
    }: {
        icon: React.ElementType;
        label: string;
        value: string | number;
    }) => (
        <div className="flex items-start gap-2 sm:gap-3 py-2 sm:py-3 border-b border-border last:border-0">
            <div className="flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-lg bg-primary/10 text-primary shrink-0">
                <Icon className="h-4 w-4 sm:h-5 sm:w-5" />
            </div>
            <div className="flex-1 min-w-0">
                <p className="text-xs sm:text-sm font-medium text-muted-foreground">{label}</p>
                <p className="text-sm sm:text-base text-foreground mt-0.5 wrap-break-word">{value}</p>
            </div>
        </div>
    );

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title="Student Details"
            description="View complete student information"
            size="lg"
        >
            <div className="space-y-6">
                {/* Status Badge */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                    <Badge
                        variant={student.status === 'Active' ? 'default' : 'destructive'}
                        className="text-xs sm:text-sm px-2 sm:px-3 py-1"
                    >
                        {student.status}
                    </Badge>
                    {student.status === 'Deleted' && onRestore && (
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => onRestore(student)}
                            className="gap-2 w-full sm:w-auto"
                        >
                            <Undo2 className="h-4 w-4" />
                            Restore Student
                        </Button>
                    )}
                </div>

                {/* Student Information */}
                <div className="space-y-1">
                    <InfoRow icon={User} label="Full Name" value={student.name} />
                    <InfoRow icon={User} label="Age" value={`${student.age} years`} />
                    <InfoRow icon={User} label="Gender" value={student.gender} />
                    <InfoRow icon={BookOpen} label="Course" value={student.course} />
                    <InfoRow icon={Heart} label="Hobby" value={student.hobby} />
                    <InfoRow
                        icon={Calendar}
                        label="Admission Date"
                        value={formatDate(student.admissionDate)}
                    />
                    {student.email && <InfoRow icon={Mail} label="Email" value={student.email} />}
                    {student.phone && <InfoRow icon={Phone} label="Phone" value={student.phone} />}
                </div>

                {/* Metadata */}
                <div className="pt-4 border-t border-border">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-muted-foreground">
                        <div>
                            <span className="font-medium">Created:</span>{' '}
                            {formatDate(student.createdAt)}
                        </div>
                        <div>
                            <span className="font-medium">Last Updated:</span>{' '}
                            {formatDate(student.updatedAt)}
                        </div>
                    </div>
                </div>

                {/* Action Buttons */}
                {student.status === 'Active' && (
                    <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 justify-end pt-2 border-t border-border">
                        <Button variant="outline" onClick={onClose} className="w-full sm:w-auto">
                            Close
                        </Button>
                        {onEdit && (
                            <Button
                                variant="default"
                                onClick={() => {
                                    onEdit(student);
                                    onClose();
                                }}
                                className="gap-2 w-full sm:w-auto"
                            >
                                <Edit className="h-4 w-4" />
                                Edit Student
                            </Button>
                        )}
                        {onDelete && (
                            <Button
                                variant="destructive"
                                onClick={() => {
                                    onDelete(student);
                                    onClose();
                                }}
                                className="gap-2 w-full sm:w-auto text-white!"
                            >
                                <Trash2 className="h-4 w-4" />
                                Delete
                            </Button>
                        )}
                    </div>
                )}

                {student.status === 'Deleted' && (
                    <div className="flex gap-3 justify-end pt-2 border-t border-border">
                        <Button variant="outline" onClick={onClose} className="w-full sm:w-auto">
                            Close
                        </Button>
                    </div>
                )}
            </div>
        </Modal>
    );
}
