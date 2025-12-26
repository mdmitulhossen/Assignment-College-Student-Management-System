
'use client';

import { DashboardHeader } from '@/components/dashboard/DashboardHeader';
import { GenderDistributionCard } from '@/components/dashboard/GenderDistributionCard';
import { RecentStudentsTable } from '@/components/dashboard/RecentStudentsTable';
import { StatCard } from '@/components/dashboard/StatCard';
import { TopCoursesCard } from '@/components/dashboard/TopCoursesCard';
import { useDashboardStats } from '@/hooks/useDashboardStats';
import { DASHBOARD_STATS } from '@/lib/dashboard.constants';

const DashboardPage = () => {
    const stats = useDashboardStats();

    return (
        <div className="space-y-6">
            <DashboardHeader />

            {/* Statistics Cards */}
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
                {DASHBOARD_STATS.map((config) => (
                    <StatCard key={config.key} config={config} value={stats[config.key]} />
                ))}
            </div>

            {/* Charts Section */}
            <div className="grid gap-6 grid-cols-1 lg:grid-cols-2">
                <GenderDistributionCard
                    distribution={stats.genderDistribution}
                    totalStudents={stats.totalStudents}
                />
                <TopCoursesCard courses={stats.topCourses} />
            </div>

            {/* Recent Students Table */}
            <RecentStudentsTable />
        </div>
    );
};

export default DashboardPage;