import { create } from 'zustand'

interface UIState {
  fontSize: number
  categoryFilter: string
  searchQuery: string
  setFontSize: (size: number) => void
  setCategoryFilter: (category: string) => void
  setSearchQuery: (query: string) => void
}

export const useUIStore = create<UIState>((set) => ({
  fontSize: 1.0,
  categoryFilter: 'all posts',
  searchQuery: '',
  setFontSize: (size) => set({ fontSize: size }),
  setCategoryFilter: (category) => set({ categoryFilter: category }),
  setSearchQuery: (query) => set({ searchQuery: query }),
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
  const setCategoryFilter = useUIStore((state) => state.setCategoryFilter)
  const setSearchQuery = useUIStore((state) => state.setSearchQuery)
  
  return {
    categoryFilter,
    searchQuery,
    setCategoryFilter,
    setSearchQuery,
    clearFilters: () => {
      setCategoryFilter('all posts')
      setSearchQuery('')
    }
  }
}
