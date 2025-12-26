
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
        <Card className={cn('border-0 border-b-4 rounded-xl transition-all hover:shadow-lg overflow-hidden group duration-150', borderClass)}>
            <CardContent className="pt-6">
                <div className="flex justify-between mb-1">
                    <div className='space-y-2'>
                        <p className="text-lg font-medium text-muted-foreground">{config.title}</p>
                        <p className="2xl:text-[44px] text-4xl font-semibold">0{value}</p>
                    </div>
                    <div >
                        <div className={cn('rounded-xl group-hover:scale-110 transition-all duration-200 p-2 h-16 w-16 flex items-center justify-center', colorClass)}>
                            <Icon className="h-7.5 w-7.5" />
                        </div>
                    </div>
                </div>
                <div className="flex items-center gap-1 text-sm">
                    {config.trend === 'up' ? (
                        <span className="text-green-500 dark:text-primary/80 flex items-center">
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
            {/* <div className={cn('w-full border-b-5 rounded-full transition-all hover:shadow-lg', borderClass)}></div> */}
        </Card>
    );
}
