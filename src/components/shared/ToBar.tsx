
'use client';

import { cn } from '@/lib/utils';
import { useSidebarStore } from '@/store/sidebar-store';
import { Menu, X } from 'lucide-react';
import { useEffect, useState } from 'react';

interface TopBarProps {
    title: string;
    subtitle?: string;
    action?: React.ReactNode;
}

const TopBar = ({ title, subtitle }: TopBarProps) => {
    const { isMobileOpen, toggleMobileSidebar } = useSidebarStore();
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const scrolled = window.scrollY > 10;
            if (scrolled !== isScrolled) {
                setIsScrolled(scrolled);
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, [isScrolled]);

    const getGreeting = () => {
        const hour = new Date().getHours();
        if (hour < 12) return 'Good Morning';
        if (hour < 18) return 'Good Afternoon';
        return 'Good Evening';
    };

    const getCurrentDate = () => {
        return new Date().toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    return (
        <div
            className={cn(
                "sticky top-0 z-30 flex items-center justify-between rounded-2xl border px-6",
                "transition-all duration-300 ease-out",
                isScrolled
                    ? "py-3 bg-background/80 backdrop-blur-xl shadow-xl"
                    : "py-4 bg-background/80 backdrop-blur-md shadow-md"
            )}
        >            {/* Mobile Menu Button */}
            <button
                onClick={toggleMobileSidebar}
                className="flex lg:hidden h-9 w-9 items-center justify-center rounded-lg hover:bg-accent transition-colors"
                aria-label="Toggle menu"
            >
                {isMobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>

            <div className="flex-1 lg:flex-none">
                <div className="flex items-center gap-2">
                    <h1 className="text-xl md:text-2xl lg:text-3xl font-bold bg-linear-to-r from-(--gradient-start) to-(--gradient-end) bg-clip-text text-transparent">
                        {getGreeting()}
                    </h1>
                    <span className="text-lg md:text-xl lg:text-2xl">👋</span>
                </div>
                <p className="mt-0.5 text-xs lg:text-sm text-muted-foreground">{getCurrentDate()}</p>
                {subtitle && <p className="mt-1.5 text-sm lg:text-base font-medium text-foreground">{subtitle}</p>}
            </div>
            <div className="flex items-center gap-4">
                {/* <Button variant="ghost" size="icon" onClick={toggleDarkMode}>
                    {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                </Button> */}
                <div className="hidden md:flex items-center gap-3 rounded-lg px-4 py-2 shadow-sm">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-linear-to-r from-purple-500 to-purple-600 text-white text-sm font-semibold shadow-md">
                        A
                    </div>
                    <div>
                        <p className="text-sm font-semibold">Admin User</p>
                        <p className="text-xs text-muted-foreground">Administrator</p>
                    </div>
                </div>
                {/* Mobile - Just Avatar */}
                <div className="flex md:hidden h-9 w-9 items-center justify-center rounded-full bg-linear-to-r from-purple-500 to-purple-600 text-white text-sm font-semibold shadow-md">
                    A
                </div>
            </div>
        </div>
    );
};

export default TopBar;