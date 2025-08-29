/**
 * Store Zustand reproduisant fidèlement le store Redux de Gatsby
 * Correspondance exacte avec l'ancien src/state/store.js
 */
import { create } from 'zustand'

// Types exacts de l'ancien store Gatsby
export type NavigatorPosition = 'is-featured' | 'is-aside' | 'moving-aside' | 'moving-featured'
export type NavigatorShape = 'open' | 'closed'

interface GatsbyUIState {
  // États exacts de l'ancien Redux store
  navigatorPosition: NavigatorPosition
  navigatorShape: NavigatorShape
  navigatorFilter: string
  isWideScreen: boolean
  scrollToTop: boolean
  fontSizeIncrease: number
  categoryFilter: string

  // Nouveaux états pour les animations et UI avancée
  isInfoBoxExpanded: boolean
  isTransitioning: boolean
  lastNavigatorPosition: NavigatorPosition

  // Actions Redux converties en Zustand
  setNavigatorPosition: (position: NavigatorPosition) => void
  setNavigatorShape: (shape: NavigatorShape) => void
  setNavigatorFilter: (filter: string) => void
  setIsWideScreen: (isWide: boolean) => void
  setScrollToTop: (scroll: boolean) => void
  setFontSizeIncrease: (increase: number) => void
  setCategoryFilter: (category: string) => void

  // Nouvelles actions pour les animations
  setInfoBoxExpanded: (expanded: boolean) => void
  setIsTransitioning: (transitioning: boolean) => void
  
  // Helpers reproduisant les utilitaires Gatsby
  featureNavigator: () => void
  moveNavigatorAside: () => void
  resetToHome: () => void // Nouvelle action pour reset complet
}

export const useGatsbyUIStore = create<GatsbyUIState>((set, get) => ({
  categoryFilter: 'all posts',
  // Helpers reproduisant src/utils/shared.js avec animations
  featureNavigator: () => {
    const state = get()
    set({ 
      isTransitioning: true,
      lastNavigatorPosition: state.navigatorPosition
    })
    
    // Animation avec délai
    setTimeout(() => {
      set({ 
        isTransitioning: false,
        navigatorPosition: 'is-featured',
        navigatorShape: 'open'
      })
    }, 100)
  }, 
  fontSizeIncrease: 1,
  // Nouveaux états
  isInfoBoxExpanded: true,
  isTransitioning: false,
  isWideScreen: false,
  lastNavigatorPosition: 'is-aside',

  moveNavigatorAside: () => {
    const state = get()
    set({ 
      isTransitioning: true,
      lastNavigatorPosition: state.navigatorPosition
    })
    
    setTimeout(() => {
      set({ 
        isTransitioning: false,
        navigatorPosition: 'is-aside',
        navigatorShape: 'open'
      })
    }, 100)
  },
  navigatorFilter: '',
  // État initial exactement comme dans Gatsby
  navigatorPosition: 'is-aside',

  navigatorShape: 'open',
  resetToHome: () => {
    const state = get()
    set({ 
      isTransitioning: true,
      lastNavigatorPosition: state.navigatorPosition
    })
    
    setTimeout(() => {
      set({ 
        categoryFilter: 'all posts',
        isInfoBoxExpanded: true,
        isTransitioning: false,
        navigatorFilter: '',
        navigatorPosition: 'is-aside',
        navigatorShape: 'open',
        scrollToTop: true
      })
    }, 100)
  },
  scrollToTop: false,
  setCategoryFilter: (category) => set({ categoryFilter: category }),
  setFontSizeIncrease: (increase) => set({ fontSizeIncrease: increase }),
  // Nouvelles actions
  setInfoBoxExpanded: (expanded) => set({ isInfoBoxExpanded: expanded }),
  setIsTransitioning: (transitioning) => set({ isTransitioning: transitioning }),

  setIsWideScreen: (isWide) => set({ isWideScreen: isWide }),
  setNavigatorFilter: (filter) => set({ navigatorFilter: filter }),

  // Actions Redux → Zustand (version simple)
  setNavigatorPosition: (position) => set((state) => ({ 
    lastNavigatorPosition: state.navigatorPosition,
    navigatorPosition: position 
  })),
  
  setNavigatorShape: (shape) => set({ navigatorShape: shape }),

  setScrollToTop: (scroll) => set({ scrollToTop: scroll })
}))

// Hooks de convenance reproduisant les patterns Gatsby
export const useNavigatorState = () => useGatsbyUIStore((state) => ({
  isTransitioning: state.isTransitioning,
  isWideScreen: state.isWideScreen,
  lastNavigatorPosition: state.lastNavigatorPosition,
  navigatorPosition: state.navigatorPosition,
  navigatorShape: state.navigatorShape
}))

export const useNavigatorActions = () => useGatsbyUIStore((state) => ({
  featureNavigator: state.featureNavigator,
  moveNavigatorAside: state.moveNavigatorAside,
  resetToHome: state.resetToHome,
  setNavigatorPosition: state.setNavigatorPosition,
  setNavigatorShape: state.setNavigatorShape
}))

export const useUIPreferences = () => useGatsbyUIStore((state) => ({
  fontSizeIncrease: state.fontSizeIncrease,
  isInfoBoxExpanded: state.isInfoBoxExpanded,
  scrollToTop: state.scrollToTop,
  setFontSizeIncrease: state.setFontSizeIncrease,
  setInfoBoxExpanded: state.setInfoBoxExpanded,
  setScrollToTop: state.setScrollToTop
}))

export const useFilters = () => useGatsbyUIStore((state) => ({
  categoryFilter: state.categoryFilter,
  navigatorFilter: state.navigatorFilter,
  setCategoryFilter: state.setCategoryFilter,
  setNavigatorFilter: state.setNavigatorFilter
}))

export const useResponsive = () => useGatsbyUIStore((state) => ({
  isWideScreen: state.isWideScreen,
  setIsWideScreen: state.setIsWideScreen
}))

export const useAnimations = () => useGatsbyUIStore((state) => ({
  isTransitioning: state.isTransitioning,
  lastNavigatorPosition: state.lastNavigatorPosition,
  setIsTransitioning: state.setIsTransitioning
}))
