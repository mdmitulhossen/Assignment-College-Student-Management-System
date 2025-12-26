
import { STAT_CARD_BORDERS, STAT_CARD_COLORS, type StatConfig } from '@/lib/dashboard.constants';
import { cn } from '@/lib/utils';
import { TrendingDown, TrendingUp } from 'lucide-react';
import { Card, CardContent } from '../ui/card';

interface StatCardProps {
    config: StatConfig;
    value: number;
}

export function StatCard({ config, value }: StatCardProps) {
    const Icon = config.icon;
    const colorClass = STAT_CARD_COLORS[config.color];
    const borderClass = STAT_CARD_BORDERS[config.color];

    return (
        <Card className={'border-0 rounded-2xl transition-all hover:shadow-lg overflow-hidden group duration-150'}>
            <CardContent className="pt-6">
                <div className="flex justify-between mb-2">
                    <div className='space-y-3'>
                        <p className="text-xl font-medium text-muted-foreground">{config.title}</p>
                        <p className="2xl:text-5xl text-4xl font-bold">{value}</p>
                    </div>
                    <div >
                        <div className={cn('rounded-2xl group-hover:scale-110 transition-all duration-200 p-2 h-16 w-16 flex items-center justify-center', colorClass)}>
                            <Icon className="h-8 w-8" />
                        </div>
                    </div>
                </div>
                <div className="flex items-center gap-1 text-sm">
                    {config.trend === 'up' ? (
                        <span className="text-primary dark:text-primary/80 flex items-center">
                            <TrendingUp className="h-3 w-3 mr-1" />
                            {config.change}
                        </span>
                    ) : (
                        <span className="text-red-600 dark:text-red-400 flex items-center">
                            <TrendingDown className="h-3 w-3 mr-1" />
                            {config.change}
                        </span>
                    )}
                    <span className="text-muted-foreground">vs last month</span>
                </div>

            </CardContent>
            <div className={cn('w-full border-b-5 rounded-full transition-all hover:shadow-lg', borderClass)}></div>
        </Card>
    );
}
