import { create } from "zustand";

export type PageKey =
  | "home"
  | "about"
  | "services"
  | "portfolio"
  | "packages"
  | "contact";

interface NavigationState {
  currentPage: PageKey;
  previousPage: PageKey | null;
  isTransitioning: boolean;
  isMobileMenuOpen: boolean;
  navigate: (page: PageKey) => void;
  setMobileMenuOpen: (open: boolean) => void;
}

export const useNavigation = create<NavigationState>((set) => ({
  currentPage: "home",
  previousPage: null,
  isTransitioning: false,
  isMobileMenuOpen: false,
  navigate: (page) =>
    set((state) => ({
      previousPage: state.currentPage,
      currentPage: page,
      isTransitioning: true,
      isMobileMenuOpen: false,
      // Reset transition after animation completes
    })),
  setMobileMenuOpen: (open) => set({ isMobileMenuOpen: open }),
}));
