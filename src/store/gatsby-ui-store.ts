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

  // Actions Redux converties en Zustand
  setNavigatorPosition: (position: NavigatorPosition) => void
  setNavigatorShape: (shape: NavigatorShape) => void
  setNavigatorFilter: (filter: string) => void
  setIsWideScreen: (isWide: boolean) => void
  setScrollToTop: (scroll: boolean) => void
  setFontSizeIncrease: (increase: number) => void
  setCategoryFilter: (category: string) => void

  // Helpers reproduisant les utilitaires Gatsby
  featureNavigator: () => void
  moveNavigatorAside: () => void
}

export const useGatsbyUIStore = create<GatsbyUIState>((set) => ({
  // État initial exactement comme dans Gatsby
  navigatorPosition: 'is-aside',
  navigatorShape: 'open', 
  navigatorFilter: '',
  isWideScreen: false,
  scrollToTop: false,
  fontSizeIncrease: 1,
  categoryFilter: 'all posts',

  // Actions Redux → Zustand (version simple)
  setNavigatorPosition: (position) => set({ navigatorPosition: position }),
  setNavigatorShape: (shape) => set({ navigatorShape: shape }),
  setNavigatorFilter: (filter) => set({ navigatorFilter: filter }),
  setIsWideScreen: (isWide) => set({ isWideScreen: isWide }),
  setScrollToTop: (scroll) => set({ scrollToTop: scroll }),
  setFontSizeIncrease: (increase) => set({ fontSizeIncrease: increase }),
  setCategoryFilter: (category) => set({ categoryFilter: category }),

  // Helpers reproduisant src/utils/shared.js (version simple)
  featureNavigator: () => set({ 
    navigatorPosition: 'is-featured',
    navigatorShape: 'open'
  }),
  moveNavigatorAside: () => set({ 
    navigatorPosition: 'is-aside',
    navigatorShape: 'open'
  })
}))

// Hooks de convenance reproduisant les patterns Gatsby
export const useNavigatorState = () => useGatsbyUIStore((state) => ({
  navigatorPosition: state.navigatorPosition,
  navigatorShape: state.navigatorShape,
  isWideScreen: state.isWideScreen
}))

export const useNavigatorActions = () => useGatsbyUIStore((state) => ({
  setNavigatorPosition: state.setNavigatorPosition,
  setNavigatorShape: state.setNavigatorShape,
  featureNavigator: state.featureNavigator,
  moveNavigatorAside: state.moveNavigatorAside
}))

export const useUIPreferences = () => useGatsbyUIStore((state) => ({
  fontSizeIncrease: state.fontSizeIncrease,
  setFontSizeIncrease: state.setFontSizeIncrease,
  scrollToTop: state.scrollToTop,
  setScrollToTop: state.setScrollToTop
}))

export const useFilters = () => useGatsbyUIStore((state) => ({
  categoryFilter: state.categoryFilter,
  setCategoryFilter: state.setCategoryFilter,
  navigatorFilter: state.navigatorFilter,
  setNavigatorFilter: state.setNavigatorFilter
}))

export const useResponsive = () => useGatsbyUIStore((state) => ({
  isWideScreen: state.isWideScreen,
  setIsWideScreen: state.setIsWideScreen
}))
