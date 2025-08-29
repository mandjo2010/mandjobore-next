import { create } from 'zustand'

interface UIState {
  fontSize: number
  categoryFilter: string
  searchQuery: string
  isNavOpen: boolean
  isSearchMode: boolean
  setFontSize: (size: number) => void
  setCategoryFilter: (category: string) => void
  setSearchQuery: (query: string) => void
  toggleNav: () => void
  setSearchMode: (isActive: boolean) => void
}

export const useUIStore = create<UIState>((set) => ({
  fontSize: 1.0,
  categoryFilter: 'all posts',
  searchQuery: '',
  isNavOpen: false,
  isSearchMode: false,
  setFontSize: (size) => set({ fontSize: size }),
  setCategoryFilter: (category) => set({ categoryFilter: category }),
  setSearchQuery: (query) => set({ searchQuery: query }),
  toggleNav: () => set((state) => ({ isNavOpen: !state.isNavOpen })),
  setSearchMode: (isActive) => set({ isSearchMode: isActive }),
}))

// Hook de convenance
export const usePreferences = () => {
  const fontSize = useUIStore((state) => state.fontSize)
  const setFontSize = useUIStore((state) => state.setFontSize)
  
  return {
    fontSize,
    setFontSize
  }
}

// Hook pour les filtres
export const useFilters = () => {
  const categoryFilter = useUIStore((state) => state.categoryFilter)
  const searchQuery = useUIStore((state) => state.searchQuery)
  const isSearchMode = useUIStore((state) => state.isSearchMode)
  const setCategoryFilter = useUIStore((state) => state.setCategoryFilter)
  const setSearchQuery = useUIStore((state) => state.setSearchQuery)
  const setSearchMode = useUIStore((state) => state.setSearchMode)
  
  return {
    categoryFilter,
    searchQuery,
    isSearchMode,
    setCategoryFilter,
    setSearchQuery,
    setSearchMode,
    clearFilters: () => {
      setCategoryFilter('all posts')
      setSearchQuery('')
      setSearchMode(false)
    }
  }
}

// Hook pour la navigation mobile
export const useMobileNav = () => {
  const isNavOpen = useUIStore((state) => state.isNavOpen)
  const toggleNav = useUIStore((state) => state.toggleNav)
  
  return {
    isNavOpen,
    toggleNav
  }
}
