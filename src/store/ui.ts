import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type NavigatorPosition = 'is-featured' | 'is-aside' | 'moving-aside'
export type NavigatorShape = 'open' | 'closed'

interface UIState {
  // Navigation et layout (nouveau système Gatsby)
  navigatorPosition: NavigatorPosition
  navigatorShape: NavigatorShape
  
  // Recherche et posts (existant + amélioré)
  isSearchOpen: boolean
  showPostsList: boolean
  categoryFilter: string
  searchQuery: string
  
  // Préférences utilisateur (nouveau)
  fontSize: number // 1.0 = 100%, 1.25 = 125%, 1.5 = 150%
  
  // Actions de base
  toggleSearch: () => void
  togglePostsList: () => void
  setNavigatorPosition: (position: NavigatorPosition) => void
  setNavigatorShape: (shape: NavigatorShape) => void
  setCategoryFilter: (category: string) => void
  setSearchQuery: (query: string) => void
  setFontSize: (size: number) => void
  
  // Actions composées (système Gatsby)
  moveNavigatorAside: () => void
  moveNavigatorFeatured: () => void
  toggleNavigatorShape: () => void
  resetFilters: () => void
}

export const useUIStore = create<UIState>()(
  persist(
    (set, get) => ({
      // État initial
      navigatorPosition: 'is-aside',
      navigatorShape: 'open',
      isSearchOpen: false,
      showPostsList: false,
      categoryFilter: 'all posts',
      searchQuery: '',
      fontSize: 1.0,
      
      // Actions de base (conservées)
      toggleSearch: () => set((s) => ({ isSearchOpen: !s.isSearchOpen })),
      togglePostsList: () => set((s) => ({ showPostsList: !s.showPostsList })),
      
      // Nouvelles actions
      setNavigatorPosition: (position) => set({ navigatorPosition: position }),
      setNavigatorShape: (shape) => set({ navigatorShape: shape }),
      setCategoryFilter: (category) => set({ categoryFilter: category }),
      setSearchQuery: (query) => set({ searchQuery: query }),
      setFontSize: (size) => set({ fontSize: size }),
      
      // Actions complexes avec animations (reproduction Gatsby)
      moveNavigatorAside: () => {
        const { navigatorPosition } = get()
        if (navigatorPosition === 'is-featured') {
          set({ navigatorPosition: 'moving-aside' })
          // Animation de 300ms comme dans Gatsby
          setTimeout(() => {
            set({ navigatorPosition: 'is-aside' })
          }, 300)
        }
      },
      
      moveNavigatorFeatured: () => {
        const { navigatorPosition } = get()
        if (navigatorPosition === 'is-aside') {
          set({ navigatorPosition: 'moving-aside' })
          setTimeout(() => {
            set({ navigatorPosition: 'is-featured' })
          }, 300)
        }
      },
      
      toggleNavigatorShape: () => {
        const { navigatorShape } = get()
        set({ 
          navigatorShape: navigatorShape === 'open' ? 'closed' : 'open' 
        })
      },
      
      resetFilters: () => {
        set({ 
          categoryFilter: 'all posts',
          searchQuery: ''
        })
      }
    }),
    {
      name: 'mandjobore-ui-store', // persiste dans localStorage
      partialize: (state) => ({
        fontSize: state.fontSize,
        categoryFilter: state.categoryFilter,
        navigatorPosition: state.navigatorPosition,
        navigatorShape: state.navigatorShape
      })
    }
  )
)

// ===== HOOKS UTILITAIRES =====

// Hook pour les actions spécifiques du navigateur
export const useNavigatorActions = () => {
  const {
    moveNavigatorAside,
    moveNavigatorFeatured,
    toggleNavigatorShape
  } = useUIStore()
  
  return {
    moveNavigatorAside,
    moveNavigatorFeatured,
    toggleNavigatorShape
  }
}

// Hook pour l'état du navigateur
export const useNavigatorState = () => {
  const { navigatorPosition, navigatorShape } = useUIStore()
  
  return {
    position: navigatorPosition,
    shape: navigatorShape,
    isAside: navigatorPosition === 'is-aside',
    isFeatured: navigatorPosition === 'is-featured',
    isMoving: navigatorPosition === 'moving-aside',
    isOpen: navigatorShape === 'open',
    isClosed: navigatorShape === 'closed'
  }
}

// Hook pour les filtres
export const useFilters = () => {
  const {
    categoryFilter,
    searchQuery,
    setCategoryFilter,
    setSearchQuery,
    resetFilters
  } = useUIStore()
  
  return {
    categoryFilter,
    searchQuery,
    setCategoryFilter,
    setSearchQuery,
    resetFilters,
    hasActiveFilters: categoryFilter !== 'all posts' || searchQuery !== ''
  }
}

// Hook pour les préférences utilisateur
export const usePreferences = () => {
  const { fontSize, setFontSize } = useUIStore()
  
  return {
    fontSize,
    setFontSize,
    fontSizeLabel: fontSize === 1.5 ? '150%' : fontSize === 1.25 ? '125%' : '100%'
  }
}
