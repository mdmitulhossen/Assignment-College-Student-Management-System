'use client';

import { Sidebar } from "@/components/shared/SideBar";
import TopBar from "@/components/shared/ToBar";


interface DashboardLayoutProps {
    children: React.ReactNode;
    title?: string;
    subtitle?: string;
    action?: React.ReactNode;
}

const DashboardLayout = ({ children, title = "Dashboard", subtitle, action }: DashboardLayoutProps) => {
    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            <Sidebar />
            <div className="ml-64">
                <TopBar title={title} subtitle={subtitle} action={action} />
                <main className="p-8">
                    {children}
                </main>
            </div>
        </div>
    );
};

export default DashboardLayout;
