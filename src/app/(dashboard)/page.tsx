
'use client';

import { DashboardHeader } from '@/components/dashboard/DashboardHeader';
import { StatCard } from '@/components/dashboard/StatCard';
import { useDashboardStats } from '@/hooks/useDashboardStats';
import { DASHBOARD_STATS } from '@/lib/dashboard.constants';

const DashboardPage = () => {
    const stats = useDashboardStats();

    return (
        <div className="space-y-6">
            <DashboardHeader />

            {/* Statistics Cards */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                {DASHBOARD_STATS.map((config) => (
                    <StatCard key={config.key} config={config} value={stats[config.key]} />
                ))}
            </div>

            {/* Charts Section */}
            {/* <div className="grid gap-6 md:grid-cols-2">
                <GenderDistributionCard
                    distribution={stats.genderDistribution}
                    totalStudents={stats.totalStudents}
                />
                <TopCoursesCard courses={stats.topCourses} />
            </div> */}
        </div>
    );
};

export default DashboardPage;