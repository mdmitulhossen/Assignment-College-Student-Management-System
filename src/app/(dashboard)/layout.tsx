'use client';

import SideBar from "@/components/shared/SideBar";
import TopBar from "@/components/shared/TopBar";
import { cn } from "@/lib/utils";
import { useSidebarStore } from "@/store/sidebar-store";

interface DashboardLayoutProps {
    children: React.ReactNode;
    title?: string;
    subtitle?: string;
    action?: React.ReactNode;
}

const DashboardLayout = ({ children, title = "Dashboard", subtitle, action }: DashboardLayoutProps) => {
    const { isExpanded } = useSidebarStore();

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            <SideBar />

            <div className={cn(
                "transition-all duration-300",
                // Mobile: No margin (sidebar is overlay)
                "ml-0",
                // lg to 2xl: 68 width normal, 20 collapsed
                isExpanded ? "lg:ml-68" : "lg:ml-20",
                // 2xl+: 78 width normal, 20 collapsed
                isExpanded ? "2xl:ml-78" : "2xl:ml-20"
            )}>
                <TopBar title={title} subtitle={subtitle} action={action} />
                <main className="2xl:p-8 p-4">
                    {children}
                </main>
            </div>
        </div>
    );
};

export default DashboardLayout;
