import DashboardContent from "@/components/layout/DashboardContent";
import { ThemeProvider } from "@/components/layout/ThemeProvider";

interface DashboardLayoutProps {
    children: React.ReactNode;
    title?: string;
    subtitle?: string;
    action?: React.ReactNode;
}

const DashboardLayout = ({ children, title = "Dashboard", subtitle, action }: DashboardLayoutProps) => {
    return (
        <ThemeProvider>
            <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
                <DashboardContent title={title} subtitle={subtitle} action={action}>
                    {children}
                </DashboardContent>
            </div>
        </ThemeProvider>
    );
};

export default DashboardLayout;
