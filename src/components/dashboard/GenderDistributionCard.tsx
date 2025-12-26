
import { type GenderDistribution } from '@/hooks/useDashboardStats';
import { GENDER_COLORS } from '@/lib/dashboard.constants';
import { Card, CardContent } from '../ui/card';

interface GenderDistributionCardProps {
    distribution: GenderDistribution;
    totalStudents: number;
}

interface GenderBarProps {
    label: string;
    count: number;
    percentage: string;
    colorClass: string;
}

function GenderBar({ label, count, percentage, colorClass }: GenderBarProps) {
    return (
        <div>
            <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">{label}</span>
                <span className="text-sm font-bold">
                    {count} ({percentage}%)
                </span>
            </div>
            <div className="h-2 w-full bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                <div
                    className={`h-full rounded-full transition-all ${colorClass}`}
                    style={{ width: `${percentage}%` }}
                />
            </div>
        </div>
    );
}

export function GenderDistributionCard({ distribution, totalStudents }: GenderDistributionCardProps) {
    return (
        <Card className="transition-all hover:shadow-lg">
            <CardContent className="pt-6">
                <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-bold">Gender Distribution</h3>
                    <span className="text-sm text-muted-foreground">Total: {totalStudents}</span>
                </div>
                <div className="space-y-4">
                    <GenderBar
                        label="Male"
                        count={distribution.male.count}
                        percentage={distribution.male.percentage}
                        colorClass={GENDER_COLORS.male}
                    />
                    <GenderBar
                        label="Female"
                        count={distribution.female.count}
                        percentage={distribution.female.percentage}
                        colorClass={GENDER_COLORS.female}
                    />
                    <GenderBar
                        label="Other"
                        count={distribution.other.count}
                        percentage={distribution.other.percentage}
                        colorClass={GENDER_COLORS.other}
                    />
                </div>
            </CardContent>
        </Card>
    );
}
