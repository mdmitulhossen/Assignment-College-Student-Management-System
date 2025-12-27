import { DashboardHeader } from '@/components/dashboard/DashboardHeader';
import DashboardStatsSection from '@/components/dashboard/DashboardStatsSection';
import { RecentStudentsTable } from '@/components/dashboard/RecentStudentsTable';


const DashboardPage = () => {

    return (
        <div className="space-y-6">
            <DashboardHeader />
            <DashboardStatsSection />
            <RecentStudentsTable />
        </div>
    );
};

export default DashboardPage;