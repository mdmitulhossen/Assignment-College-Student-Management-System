'use client';

import SideBar from "@/components/shared/SideBar";
import TopBar from "@/components/shared/TopBar";
import { cn } from "@/lib/utils";
import { useSidebarStore } from "@/store/sidebar-store";

interface DashboardContentProps {
    children: React.ReactNode;
    title?: string;
    subtitle?: string;
    action?: React.ReactNode;
}

const DashboardContent = ({ children, title = "Dashboard", subtitle, action }: DashboardContentProps) => {
    const { isExpanded } = useSidebarStore();

    return (
        <>
            <SideBar />

            <div className={cn(
                "transition-all duration-300",
                "ml-0",
                isExpanded ? "lg:ml-68" : "lg:ml-20",
                isExpanded ? "2xl:ml-78" : "2xl:ml-20"
            )}>
                <TopBar title={title} subtitle={subtitle} action={action} />
                <main className="2xl:p-8 p-4">
                    {children}
                </main>
            </div>
        </>
    );
};

export default DashboardContent;
