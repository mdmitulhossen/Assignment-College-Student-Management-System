'use client';

import SideBar from "@/components/shared/SideBar";
import TopBar from "@/components/shared/TopBar";


interface DashboardLayoutProps {
    children: React.ReactNode;
    title?: string;
    subtitle?: string;
    action?: React.ReactNode;
}

const DashboardLayout = ({ children, title = "Dashboard", subtitle, action }: DashboardLayoutProps) => {
    // const isExpanded = useSidebarStore((state) => state.isExpanded);

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            <SideBar />
            <div className="ml-78">
                <TopBar title={title} subtitle={subtitle} action={action} />
                <main className="p-8">
                    {children}
                </main>
            </div>
        </div>
    );
};

export default DashboardLayout;
