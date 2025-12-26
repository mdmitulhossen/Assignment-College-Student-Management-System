import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function NotFound() {
    return (
        <div className="flex items-center justify-center min-h-[60vh]">
            <div className="text-center space-y-6">
                <div className="text-6xl">🔍</div>
                <h2 className="text-3xl font-bold text-foreground">Student Not Found</h2>
                <p className="text-muted-foreground max-w-md">
                    The student you&apos;re looking for doesn&apos;t exist or may have been
                    removed.
                </p>
                <div className="flex gap-4 justify-center pt-4">
                    <Link href="/students">
                        <Button variant="default">Back to Students</Button>
                    </Link>
                    <Link href="/students/new">
                        <Button variant="outline">Add New Student</Button>
                    </Link>
                </div>
            </div>
        </div>
    );
}
