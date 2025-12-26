import { PageHeader } from '@/components/shared/PageHeader';

export function DashboardHeader() {
    return (
        <PageHeader
            title="Dashboard"
            action={{
                href: '/students/new',
                label: 'Add Student',
                icon: '+',
            }}
        />
    );
}
