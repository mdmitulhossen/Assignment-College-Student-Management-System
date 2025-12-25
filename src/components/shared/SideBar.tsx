'use client';

import { cn } from '@/lib/utils';
import { GraduationCap, LayoutDashboard, UserPlus, Users } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function Sidebar() {
    const pathname = usePathname();

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
        <aside className="fixed left-0 top-0 z-40 h-screen w-64 border-r bg-background">
            <div className="flex h-full flex-col">
                {/* Logo */}
                <div className="flex h-16 items-center gap-3 border-b px-6">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-teal-600">
                        <GraduationCap className="h-6 w-6 text-white" />
                    </div>
                    <div>
                        <h1 className="text-lg font-bold">Student Portal</h1>
                        <p className="text-xs text-muted-foreground">Management System</p>
                    </div>
                </div>

                {/* Navigation */}
                <nav className="flex-1 space-y-1 p-4">
                    {menuItems.map((item) => {
                        const Icon = item.icon;
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={cn(
                                    'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors',
                                    item.active
                                        ? 'bg-teal-600 text-white'
                                        : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
                                )}
                            >
                                <Icon className="h-5 w-5" />
                                {item.label}
                            </Link>
                        );
                    })}
                </nav>

                {/* User Profile */}
                <div className="border-t p-4">
                    <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-600 text-white font-semibold">
                            A
                        </div>
                        <div>
                            <p className="text-sm font-medium">Admin User</p>
                            <p className="text-xs text-muted-foreground">Administrator</p>
                        </div>
                    </div>
                    <p className="mt-4 text-xs text-muted-foreground">© {new Date().getFullYear()} Manage Student</p>
                </div>
            </div>
        </aside>
    );
}