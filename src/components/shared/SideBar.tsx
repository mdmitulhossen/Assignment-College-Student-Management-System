
'use client';

import { cn } from '@/lib/utils';
import { GraduationCap, LayoutDashboard, UserPlus, Users } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const SideBar = () => {
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
        <aside className="fixed left-0 top-0 z-40 h-screen w-78 border-r bg-background">
            <div className="flex h-full flex-col">
                {/* Logo */}
                <div className="flex items-center gap-3 border-b px-6 py-6">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-linear-to-r from-(--gradient-start) to-(--gradient-end) shadow-md shadow-primary/30">
                        <GraduationCap className="h-8 w-8 text-white" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold">College Student</h1>
                        <p className="text-lg text-muted-foreground">Management System</p>
                    </div>
                </div>

                {/* Navigation */}
                <nav className="flex-1 space-y-1 p-4 mt-3">
                    {menuItems.map((item) => {
                        const Icon = item.icon;
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={cn(
                                    'flex items-center gap-3 rounded-lg px-3 py-3.5 text-xl font-medium transition-colors',
                                    item.active
                                        ? 'bg-linear-to-r from-(--gradient-start) to-(--gradient-end) text-white shadow-lg shadow-primary/30'
                                        : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
                                )}
                            >
                                <Icon className="h-6 w-6" />
                                {item.label}
                            </Link>
                        );
                    })}
                </nav>

                {/* User Profile */}
                <div className="border-t p-4 flex flex-col items-center">
                    <div className="flex items-center gap-3 bg-gray-50 shadow rounded-lg px-5 py-2">
                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/90 text-white font-semibold">
                            A
                        </div>
                        <div>
                            <p className="text-lg font-medium">Super Admin</p>
                            <p className=" text-muted-foreground text-sm">Administrator</p>
                        </div>
                    </div>
                    <p className="mt-4 text-xs text-muted-foreground">© 2025 Student Portal</p>
                </div>
            </div>
        </aside>
    );
}


export default SideBar;