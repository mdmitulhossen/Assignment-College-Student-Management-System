
'use client';

import { useSidebarStore } from "@/store/sidebar-store";
import { getCurrentDate, getGreeting } from "@/utils/greeting.helper";
import { Menu, PanelLeftClose, X } from "lucide-react";

interface TopBarProps {
    title: string;
    subtitle?: string;
    action?: React.ReactNode;
}

const TopBar = ({ subtitle }: TopBarProps) => {
    const { isExpanded, isMobileOpen, toggleSidebar, toggleMobileSidebar } = useSidebarStore();

    const handleToggle = () => {
        if (window.innerWidth < 1024) {
            toggleMobileSidebar();
        } else {
            toggleSidebar();
        }
    };

    return (
        <div className="sticky top-0 z-30 flex items-center justify-between bg-background/95 backdrop-blur-md px-4 2xl:px-8 py-2 shadow-sm">
            {/* Toggle Button */}
            <button
                onClick={handleToggle}
                className="flex h-10 w-10 items-center group justify-center rounded-lg transition-colors mr-2 sm:mr-4 cursor-pointer hover:bg-accent"
                aria-label="Toggle sidebar"
            >
                {/* Mobile: Menu/Close icon */}
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
                    <h1 className="text-xl sm:text-2xl 2xl:text-3xl font-bold bg-linear-to-r from-(--gradient-start) to-(--gradient-end) bg-clip-text text-transparent">
                        {getGreeting()}
                    </h1>
                    <span className="text-lg sm:text-xl xl:text-2xl">👋</span>
                </div>
                <p className="mt-1 text-xs sm:text-sm text-muted-foreground">{getCurrentDate()}</p>
                {subtitle && <p className="mt-2 text-sm lg:text-base font-medium text-foreground">{subtitle}</p>}
            </div>

            <div className="flex items-center gap-4">
                {/* Desktop View */}
                <div className="hidden sm:flex items-center gap-3 rounded-lg px-3 sm:px-5 py-2.5 bg-gray-50 shadow">
                    <div className="flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-full bg-linear-to-r from-(--gradient-start) to-(--gradient-end) text-white font-semibold shadow-md text-sm">
                        A
                    </div>
                    <div className="hidden md:block">
                        <p className="font-semibold text-sm">Super Admin</p>
                        <p className="text-xs text-muted-foreground">Administrator</p>
                    </div>
                </div>
                {/* Mobile View - Just Avatar */}
                <div className="flex sm:hidden h-8 w-8 items-center justify-center rounded-full bg-linear-to-r from-(--gradient-start) to-(--gradient-end) text-white font-semibold shadow-md text-sm">
                    A
                </div>
            </div>
        </div>
    );
}


export default TopBar;