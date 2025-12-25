'use client';

import { Sidebar } from "@/components/shared/SideBar";
import TopBar from "@/components/shared/ToBar";
import { cn } from "@/lib/utils";
import { useSidebarStore } from "@/store/sidebar-store";


interface DashboardLayoutProps {
    children: React.ReactNode;
    title?: string;
    subtitle?: string;
    action?: React.ReactNode;
}

const DashboardLayout = ({ children, title = "Dashboard", subtitle, action }: DashboardLayoutProps) => {
    const isExpanded = useSidebarStore((state) => state.isExpanded);

    return (
        <div className="min-h-screen bg-linear-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950">
            <Sidebar />
            {/* Mobile: Full width */}
            {/* Desktop: Dynamic margin based on sidebar state with smooth transition */}
            <div
                className={cn(
                    "pt-4 px-4 pb-4 transition-all duration-300",
                    // Desktop margins that match sidebar width + gap
                    isExpanded ? "lg:ml-76" : "lg:ml-24"
                )}
            >
                <TopBar title={title} subtitle={subtitle} action={action} />
                <main className="mt-4 rounded-2xl bg-background/50 backdrop-blur-sm p-4 lg:p-6 min-h-[calc(100vh-180px)]">
                    {children}
                </main>
            </div>
        </div>
    );
};

export default DashboardLayout;
