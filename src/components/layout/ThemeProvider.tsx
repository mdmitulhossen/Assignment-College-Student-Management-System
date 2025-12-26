'use client';

import { useThemeStore } from '@/store/theme-store';
import { useEffect } from 'react';

export function ThemeProvider({ children }: { children: React.ReactNode }) {
    const initializeTheme = useThemeStore((state) => state.initializeTheme);

    useEffect(() => {
        initializeTheme();
    }, [initializeTheme]);

    return <>{children}</>;
}
