'use client';

import { cn } from '@/lib/utils';
import { useSidebarStore } from '@/store/sidebar-store';
import { ChevronLeft, ChevronRight, GraduationCap, LayoutDashboard, UserPlus, Users } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function Sidebar() {
    const pathname = usePathname();
    const { isExpanded, isMobileOpen, toggleSidebar, toggleMobileSidebar, closeMobileSidebar } = useSidebarStore();

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
                    onClick={toggleMobileSidebar}
                />
            )}

            {/* Sidebar */}
            <aside
                className={cn(
                    'fixed left-0 top-0 z-40 h-screen p-4 transition-all duration-300',
                    'lg:translate-x-0',
                    isExpanded ? 'w-72' : 'w-26',
                    isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
                )}
            >
                <div className="flex h-full flex-col rounded-2xl border bg-background shadow-lg">
                    {/* Logo & Toggle */}
                    <div className={cn('flex h-16 items-center border-b px-3', isExpanded ? 'justify-between' : 'justify-center')}>
                        {isExpanded ? (
                            <div className="flex items-center gap-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-linear-to-r from-(--gradient-start) to-(--gradient-end) shadow-md shadow-primary/20">
                                    <GraduationCap className="h-6 w-6 text-white" />
                                </div>
                                <div>
                                    <h1 className="text-base font-bold">Student Portal</h1>
                                    <p className="text-[10px] text-muted-foreground">Management System</p>
                                </div>
                            </div>
                        ) : (
                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-linear-to-r from-(--gradient-start) to-(--gradient-end) shadow-md shadow-primary/20">
                                <GraduationCap className="h-6 w-6 text-white" />
                            </div>
                        )}

                        {/* Toggle Button - Hidden on mobile */}
                        <button
                            onClick={toggleSidebar}
                            className={cn(
                                'hidden lg:flex h-8 w-8 items-center justify-center rounded-lg hover:bg-accent transition-colors',
                                !isExpanded && 'absolute -right-3 top-6 bg-background border shadow-md'
                            )}
                        >
                            {isExpanded ? <ChevronLeft className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                        </button>
                    </div>

                    {/* Navigation */}
                    <nav className="flex-1 space-y-1 p-3">
                        {menuItems.map((item) => {
                            const Icon = item.icon;
                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    onClick={closeMobileSidebar}
                                    className={cn(
                                        'group relative flex items-center rounded-lg text-sm font-medium transition-all',
                                        item.active
                                            ? 'bg-linear-to-r from-(--gradient-start) to-(--gradient-end) text-white shadow-lg shadow-primary/30'
                                            : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground',
                                        isExpanded ? 'gap-3 px-3 py-3' : 'justify-center px-3 py-3 w-full'
                                    )}
                                    title={!isExpanded ? item.label : ''}
                                >
                                    <Icon className="h-5 w-5 shrink-0" />
                                    {isExpanded && <span className="whitespace-nowrap">{item.label}</span>}

                                    {/* Tooltip for collapsed state */}
                                    {!isExpanded && (
                                        <div className="absolute left-full ml-2 hidden group-hover:block whitespace-nowrap rounded-lg bg-foreground px-3 py-2 text-xs text-background shadow-lg z-50">
                                            {item.label}
                                        </div>
                                    )}
                                </Link>
                            );
                        })}
                    </nav>

                    {/* User Profile */}
                    <div className="border-t p-3">
                        {isExpanded ? (
                            <>
                                <div className="flex items-center gap-3 rounded-lg p-2 hover:bg-accent/50 transition-colors">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-linear-to-r from-purple-500 to-purple-600 text-white font-semibold shadow-md shrink-0">
                                        A
                                    </div>
                                    <div className="min-w-0 flex-1">
                                        <p className="text-sm font-medium truncate">Admin User</p>
                                        <p className="text-xs text-muted-foreground truncate">Administrator</p>
                                    </div>
                                </div>
                                <p className="mt-3 text-[10px] text-center text-muted-foreground">
                                    © {new Date().getFullYear()} Student Portal
                                </p>
                            </>
                        ) : (
                            <div className="flex justify-center">
                                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-linear-to-r from-purple-500 to-purple-600 text-white font-semibold shadow-md">
                                    A
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </aside>

            {/* Sidebar Width Placeholder */}
            <div className={cn('hidden lg:block transition-all duration-300', isExpanded ? 'w-72' : 'w-20')} />
        </>
    );
}