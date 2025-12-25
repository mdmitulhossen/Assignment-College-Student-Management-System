import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface SidebarState {
    isExpanded: boolean;
    isMobileOpen: boolean;
    toggleSidebar: () => void;
    toggleMobileSidebar: () => void;
    closeMobileSidebar: () => void;
    setIsExpanded: (value: boolean) => void;
}

export const useSidebarStore = create<SidebarState>()(
    persist(
        (set) => ({
            isExpanded: true,
            isMobileOpen: false,
            toggleSidebar: () => set((state) => ({ isExpanded: !state.isExpanded })),
            toggleMobileSidebar: () => set((state) => ({ isMobileOpen: !state.isMobileOpen })),
            closeMobileSidebar: () => set({ isMobileOpen: false }),
            setIsExpanded: (value: boolean) => set({ isExpanded: value }),
        }),
        {
            name: 'sidebar-storage',
            partialize: (state) => ({ isExpanded: state.isExpanded }),
        }
    )
);
