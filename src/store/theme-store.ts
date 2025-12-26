import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

type Theme = 'light' | 'dark' | 'system';

interface ThemeState {
    theme: Theme;
    resolvedTheme: 'light' | 'dark';
    setTheme: (theme: Theme) => void;
    initializeTheme: () => void;
}

export const useThemeStore = create<ThemeState>()(
    persist(
        (set, get) => ({
            theme: 'system',
            resolvedTheme: 'light',

            setTheme: (theme: Theme) => {
                set({ theme });

                // Apply theme immediately
                const root = window.document.documentElement;
                const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
                const resolvedTheme = theme === 'system' ? systemTheme : theme;

                root.classList.remove('light', 'dark');
                root.classList.add(resolvedTheme);

                set({ resolvedTheme });
            },

            initializeTheme: () => {
                const { theme } = get();
                const root = window.document.documentElement;
                const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
                const resolvedTheme = theme === 'system' ? systemTheme : theme;

                root.classList.remove('light', 'dark');
                root.classList.add(resolvedTheme);

                set({ resolvedTheme });

                // Listen for system theme changes
                const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
                const handleChange = (e: MediaQueryListEvent) => {
                    const { theme } = get();
                    if (theme === 'system') {
                        const newResolvedTheme = e.matches ? 'dark' : 'light';
                        root.classList.remove('light', 'dark');
                        root.classList.add(newResolvedTheme);
                        set({ resolvedTheme: newResolvedTheme });
                    }
                };

                mediaQuery.addEventListener('change', handleChange);
            },
        }),
        {
            name: 'theme-storage',
            storage: createJSONStorage(() => localStorage),
            partialize: (state) => ({ theme: state.theme }),
        }
    )
);
