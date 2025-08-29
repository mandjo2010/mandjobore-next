import { create } from 'zustand'

// Store ULTRA-MINIMAL pour éliminer les boucles infinies
// Aucun setTimeout, aucune logique complexe
interface MinimalUIState {
  // Navigation simple
  isNavigatorOpen: boolean
  openNavigator: () => void
  closeNavigator: () => void
  // Compat actions (stables)
  setNavigatorPosition: (position: unknown) => void
  setNavigatorShape: (shape: unknown) => void

  // Recherche / overlay
  isSearchOpen: boolean
  toggleSearch: () => void

  // Filtres
  fontSize: number
  setFontSize: (size: number) => void
  categoryFilter: string
  setCategoryFilter: (category: string) => void
  clearFilters: () => void
  searchQuery: string
  setSearchQuery: (q: string) => void

  // Plein écran
  isFullscreen: boolean
  setIsFullscreen: (v: boolean) => void

  // Scroll to top
  scrollToTop: boolean
  setScrollToTop: (v: boolean) => void
}

export const useMinimalUIStore = create<MinimalUIState>((set, get) => ({
  // État initial simple
  isNavigatorOpen: true,
  openNavigator: () => {
    if (!get().isNavigatorOpen) set({ isNavigatorOpen: true })
  },
  closeNavigator: () => {
    if (get().isNavigatorOpen) set({ isNavigatorOpen: false })
  },
  setNavigatorPosition: (_position) => {}, // compat stable
  setNavigatorShape: (_shape) => {}, // compat stable

  isSearchOpen: false,
  toggleSearch: () => {
    const next = !get().isSearchOpen
    set({ isSearchOpen: next })
  },

  fontSize: 1.0,
  setFontSize: (size) => {
    if (get().fontSize !== size) set({ fontSize: size })
  },
  categoryFilter: 'all posts',
  setCategoryFilter: (category) => {
    if (get().categoryFilter !== category) set({ categoryFilter: category })
  },
  clearFilters: () => {
    if (get().categoryFilter !== 'all posts') set({ categoryFilter: 'all posts' })
  },
  searchQuery: '',
  setSearchQuery: (q) => {
    if (get().searchQuery !== q) set({ searchQuery: q })
  },

  isFullscreen: false,
  setIsFullscreen: (v) => {
    if (get().isFullscreen !== v) set({ isFullscreen: v })
  },

  scrollToTop: false,
  setScrollToTop: (v) => {
    if (get().scrollToTop !== v) set({ scrollToTop: v })
  },
}))

// --- Debug instrumentation supprimée

// Hooks de compatibilité ULTRA-SIMPLES
export const useMinimalNavigatorState = () => useMinimalUIStore((state) => ({
  isOpen: state.isNavigatorOpen,
  isFeatured: state.isNavigatorOpen,
  navigatorPosition: state.isNavigatorOpen ? 'is-featured' : 'is-aside',
  navigatorShape: state.isNavigatorOpen ? 'open' : 'closed',
}))

export const useMinimalNavigatorActions = () => useMinimalUIStore((state) => ({
  setNavigatorPosition: state.setNavigatorPosition,
  setNavigatorShape: state.setNavigatorShape,
  moveNavigatorAside: state.closeNavigator,
  moveNavigatorFeatured: state.openNavigator,
}))

export const useMinimalFilters = () => useMinimalUIStore((state) => ({
  categoryFilter: state.categoryFilter,
  setCategoryFilter: state.setCategoryFilter,
  searchQuery: state.searchQuery,
  setSearchQuery: state.setSearchQuery,
  clearFilters: state.clearFilters,
  hasActiveFilters: state.categoryFilter !== 'all posts' || state.searchQuery.length > 0,
}))

export const useMinimalPreferences = () => useMinimalUIStore((state) => ({
  fontSize: state.fontSize,
  setFontSize: state.setFontSize,
  isFullscreen: state.isFullscreen,
  setIsFullscreen: state.setIsFullscreen,
}))

export const useMinimalScrollActions = () => useMinimalUIStore((state) => ({
  scrollToTop: state.scrollToTop,
  setScrollToTop: state.setScrollToTop,
}))
