
import { CardHeading } from '@/components/shared/CardHeading';
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

function GenderBar({ label, count, percentage }: GenderBarProps) {
    return (
        <div>
            <div className="flex items-center justify-between mb-2">
                <span className="font-medium">{label}</span>
                <span className="font-bold">
                    {count} <span className='text-primary font-medium'>({percentage}%)</span>
                </span>
            </div>
            <div className="h-3 w-full bg-primary/10 dark:bg-gray-700 rounded-full overflow-hidden">
                <div
                    className={`h-full rounded-full transition-all bg-primary`}
                    style={{ width: `${percentage}%` }}
                />
            </div>
        </div>
    );
}

export function GenderDistributionCard({ distribution, totalStudents }: GenderDistributionCardProps) {
    return (
        <Card className="card-box">
            <CardContent className="pt-6">
                <div className="flex items-center justify-between mb-6 flex-wrap">
                    <CardHeading title="Gender Distribution" />
                    <span className="text-gray-600 bg-gray-100 inline-block px-4 py-2 rounded-md">Total: {totalStudents}</span>
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
