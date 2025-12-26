
'use client';

import { getCurrentDate, getGreeting } from "@/utils/greeting.helper";

interface TopBarProps {
    title: string;
    subtitle?: string;
    action?: React.ReactNode;
}

const TopBar = ({ subtitle }: TopBarProps) => {

    return (
        <div className="sticky top-0 z-30 flex items-center justify-between bg-background/95 backdrop-blur-md px-8 py-2 shadow-sm">
            <div className="flex-1">
                <div className="flex items-center gap-2">
                    <h1 className="text-3xl font-bold bg-linear-to-r from-(--gradient-start) to-(--gradient-end) bg-clip-text text-transparent">
                        {getGreeting()}
                    </h1>
                    <span className="text-2xl">👋</span>
                </div>
                <p className="mt-1 text-sm text-muted-foreground">{getCurrentDate()}</p>
                {subtitle && <p className="mt-2 text-base font-medium text-foreground">{subtitle}</p>}
            </div>

            <div className="flex items-center gap-4">
                <div className="flex items-center gap-3 rounded-lg px-5 py-2.5 bg-gray-50 shadow">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-linear-to-r from-(--gradient-start) to-(--gradient-end) text-white font-semibold shadow-md">
                        A
                    </div>
                    <div>
                        <p className="font-semibold">Super Admin</p>
                        <p className="text-xs text-muted-foreground">Administrator</p>
                    </div>
                </div>
            </div>
        </div>
    );
}


export default TopBar;