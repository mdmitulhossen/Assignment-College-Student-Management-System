import { Button } from '@/components/ui/button';
import Link from 'next/link';

export function DashboardHeader() {
    return (
        <div className="flex items-center justify-between">
            <div>
                <h2 className="text-2xl lg:text-3xl 2xl:text-4xl  font-bold">Dashboard Overview</h2>
                <p className="text-muted-foreground">Monitor and manage your student data efficiently</p>
            </div>
            <Link href="/students/new">
                <Button size="lg" variant={'primary'} className="bg-linear-to-r from-(--gradient-start) to-(--gradient-end) hover:opacity-90 transition-opacity text-lg h-12!">
                    <span className="mr-2 text-2xl">+</span> Add Student
                </Button>
            </Link>
        </div>
    );
}
