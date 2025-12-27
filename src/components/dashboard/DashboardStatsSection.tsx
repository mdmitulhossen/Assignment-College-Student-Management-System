'use client';
import { useDashboardStats } from "@/hooks/useDashboardStats";
import { DASHBOARD_STATS } from "@/lib/constants/dashboard.constants";
import { GenderDistributionCard } from "./GenderDistributionCard";
import { StatCard } from "./StatCard";
import { TopCoursesCard } from "./TopCoursesCard";

const DashboardStatsSection = () => {
    const stats = useDashboardStats();
    return (
        <>
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
                {DASHBOARD_STATS.map((config) => (
                    <StatCard key={config.key} config={config} value={stats[config.key]} />
                ))}
            </div>
            <div className="grid gap-6 grid-cols-1 lg:grid-cols-2">
                <GenderDistributionCard
                    distribution={stats.genderDistribution}
                    totalStudents={stats.totalStudents}
                />
                <TopCoursesCard courses={stats.topCourses} />
            </div>

        </>
    );
};

export default DashboardStatsSection;