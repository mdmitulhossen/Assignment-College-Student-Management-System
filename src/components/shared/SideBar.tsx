
'use client';

import { cn } from '@/lib/utils';
import { useSidebarStore } from '@/store/sidebar-store';
import { GraduationCap, LayoutDashboard, UserPlus, Users, X } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const SideBar = () => {
    const pathname = usePathname();
    const { isExpanded, isMobileOpen, closeMobileSidebar } = useSidebarStore();

    const menuItems = [
        {
            label: 'Dashboard',
            icon: LayoutDashboard,
            href: '/',
            active: pathname === '/',
        },
        {
            label: 'Student List',
            icon: Users,
            href: '/students',
            active: pathname.startsWith('/students') && pathname !== '/students/new',
        },
        {
            label: 'Add Student',
            icon: UserPlus,
            href: '/students/new',
            active: pathname === '/students/new',
        },
    ];

    return (
        <>
            {/* Mobile Overlay */}
            {isMobileOpen && (
                <div
                    className="fixed inset-0 z-40 bg-black/50 lg:hidden"
                    onClick={closeMobileSidebar}
                />
            )}

            {/* Sidebar */}
            <aside className={cn(
                "fixed left-0 top-0 z-50 h-screen border-r bg-card transition-all duration-300",
                "w-68",
                "lg:translate-x-0",
                isMobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0",
                isExpanded ? "lg:w-68" : "lg:w-20",
                isExpanded ? "2xl:w-78" : "2xl:w-20"
            )}>
                <div className="flex h-full flex-col">
                    {isMobileOpen && (
                        <button
                            onClick={closeMobileSidebar}
                            className="absolute top-0 -right-4 z-50 flex h-7 w-7 items-center justify-center rounded-lg bg-primary/90 transition-colors lg:hidden"
                            aria-label="Close sidebar"
                        >
                            <X className="h-5 w-5 text-white" />
                        </button>
                    )}

                    {/* Logo */}
                    <div className={cn(
                        "flex flex-col items-center pt-5 pb-4",
                        isExpanded ? "gap-3 px-6" : "gap-3 px-6 lg:justify-center lg:px-4"
                    )}>
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-linear-to-r from-(--gradient-start) to-(--gradient-end) shadow-md shadow-primary/30">
                            <GraduationCap className="h-8 w-8 text-white" />
                        </div>
                        <div className={cn(
                            isExpanded ? "block" : "block lg:hidden",
                            'text-center'
                        )}>
                            <h1 className="text-xl xl:text-2xl font-bold text-primary ">College Student</h1>
                            <p className="text-base text-muted-foreground">Management System</p>
                        </div>
                    </div>

                    {/* Navigation */}
                    <nav className="flex-1 space-y-2 p-4">
                        {menuItems.map((item) => {
                            const Icon = item.icon;
                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    onClick={closeMobileSidebar}
                                    className={cn(
                                        'group relative flex items-center rounded-lg font-medium transition-colors',
                                        isExpanded ? 'gap-3 px-5 py-3.5 text-lg' : 'gap-3 px-3 py-3.5 text-lg lg:justify-center',
                                        item.active
                                            ? 'bg-linear-to-r from-(--gradient-start) to-(--gradient-end) text-white shadow-lg shadow-primary/30'
                                            : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
                                    )}
                                    title={!isExpanded ? item.label : ''}
                                >
                                    <Icon className="h-6 w-6 shrink-0" />
                                    <span className={cn(
                                        isExpanded ? "block" : "block lg:hidden"
                                    )}>{item.label}</span>

                                    {/* Tooltip for collapsed state - Desktop only */}
                                    {!isExpanded && (
                                        <div className="absolute left-full ml-2 hidden lg:group-hover:block whitespace-nowrap rounded-lg bg-primary/80 px-3 py-2 text-sm text-background shadow-lg z-50">
                                            {item.label}
                                        </div>
                                    )}
                                </Link>
                            );
                        })}
                    </nav>

                    {/* User Profile */}
                    <div className="border-t p-4 flex flex-col items-center">
                        {isExpanded ? (
                            <>
                                <div className="flex items-center gap-3 bg-gray-100 dark:bg-gray-800 shadow rounded-lg px-5 py-2 w-full">
                                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary/90 text-white font-semibold">
                                        A
                                    </div>
                                    <div className="min-w-0">
                                        <p className="text-base font-medium truncate">Super Admin</p>
                                        <p className="text-muted-foreground text-xs truncate">Administrator</p>
                                    </div>
                                </div>
                                <p className="mt-4 text-xs text-muted-foreground">© {new Date().getFullYear()} Student Portal</p>
                            </>
                        ) : (
                            <>
                                <div className="lg:flex hidden h-12 w-12 items-center justify-center rounded-full bg-primary/90 text-white font-semibold">
                                    A
                                </div>
                                <div className="lg:hidden flex items-center gap-3 bg-gray-100 dark:bg-gray-800 shadow rounded-lg px-5 py-2 w-full">
                                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary/90 text-white font-semibold">
                                        A
                                    </div>
                                    <div className="min-w-0">
                                        <p className="text-base font-medium truncate">Super Admin</p>
                                        <p className="text-muted-foreground text-xs truncate">Administrator</p>
                                    </div>
                                </div>
                                <p className="mt-4 text-xs text-muted-foreground lg:hidden">© {new Date().getFullYear()} Student Portal</p>
                            </>
                        )}
                    </div>
                </div>
            </aside>
        </>
    );
}


export default SideBar;