
'use client';

import { useSidebarStore } from "@/store/sidebar-store";
import { useThemeStore } from "@/store/theme-store";
import { getCurrentDate, getGreeting } from "@/utils/greeting.utils";
import { Menu, Moon, PanelLeftClose, Sun, X } from "lucide-react";

interface TopBarProps {
    title: string;
    subtitle?: string;
    action?: React.ReactNode;
}

const TopBar = ({ subtitle }: TopBarProps) => {
    const { isExpanded, isMobileOpen, toggleSidebar, toggleMobileSidebar } = useSidebarStore();
    const { resolvedTheme, setTheme } = useThemeStore();

    const handleToggle = () => {
        if (window.innerWidth < 1024) {
            toggleMobileSidebar();
        } else {
            toggleSidebar();
        }
    };

    const toggleTheme = () => {
        setTheme(resolvedTheme === 'dark' ? 'light' : 'dark');
    };

    return (
        <div className="sticky top-0 z-30 flex items-center justify-between bg-card/95 backdrop-blur-md px-4 2xl:px-8 py-2 shadow-sm border-b">
            <button
                onClick={handleToggle}
                className="flex h-10 w-10 items-center group justify-center rounded-lg transition-colors mr-2 sm:mr-4 cursor-pointer hover:bg-accent"
                aria-label="Toggle sidebar"
            >
                {/* Mobile View: Menu icon */}
                <span className="lg:hidden">
                    {isMobileOpen ? <X className="h-6 w-6 text-primary/70 group-hover:text-primary" /> : <Menu className="h-6 w-6 text-primary/70 group-hover:text-primary" />}
                </span>

                {/* Desktop: Collapse icon */}
                <span className="hidden lg:block">
                    {isExpanded ? <PanelLeftClose className="h-7 w-7 text-primary/70 group-hover:text-primary" /> : <PanelLeftClose className="h-7 w-7 text-primary/70 group-hover:text-primary rotate-180" />}
                </span>
            </button>

            <div className="flex-1">
                <div className="flex items-center gap-2">
                    <h1 className="text-xl sm:text-2xl font-bold bg-linear-to-r from-(--gradient-start) to-(--gradient-end) bg-clip-text text-transparent">
                        {getGreeting()}
                    </h1>
                    <span className="text-lg sm:text-xl xl:text-2xl hidden sm:block">👋</span>
                </div>
                <p className="mt-1 text-xs sm:text-sm 2xl:text-base text-muted-foreground hidden sm:block">{getCurrentDate()}</p>
                {subtitle && <p className="mt-2 text-sm lg:text-base font-medium text-foreground">{subtitle}</p>}
            </div>

            <div className="flex items-center gap-3 md:gap-1">
                {/* Theme Toggle */}
                <button
                    onClick={toggleTheme}
                    className="flex p-1.5 md:p-2 items-center justify-center rounded-lg hover:bg-accent transition-colors group cursor-pointer border border-gray-200 dark:border-gray-700"
                    aria-label="Toggle theme"
                >
                    {resolvedTheme === 'dark' ? (
                        <Sun className="md:h-7 md:w-7 w-5 h-5 text-primary/70 group-hover:text-primary transition-colors" />
                    ) : (
                        <Moon className="md:h-6 md:w-6 w-5 h-5 text-primary/70 group-hover:text-primary transition-colors" />
                    )}
                </button>

                {/* Desktop View */}
                <div className="hidden md:flex items-center gap-3 rounded-lg px-3 sm:px-5 py-2.5">
                    <div className="flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-full bg-linear-to-r from-(--gradient-start) to-(--gradient-end) text-white font-semibold shadow-md text-sm">
                        A
                    </div>
                    <div className="hidden md:block">
                        <p className="font-semibold text-sm">Super Admin</p>
                        <p className="text-xs text-muted-foreground">Administrator</p>
                    </div>
                </div>
                {/* Mobile View - Just Avatar */}
                <div className="flex md:hidden h-8 w-8 items-center justify-center rounded-full bg-linear-to-r from-(--gradient-start) to-(--gradient-end) text-white font-semibold shadow-md text-sm">
                    A
                </div>
            </div>
        </div>
    );
}


export default TopBar;