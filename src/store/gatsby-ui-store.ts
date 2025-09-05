/**
 * Store Zustand reproduisant fidèlement le store Redux de Gatsby
 * Correspondance exacte avec l'ancien src/state/store.js
 */
import { create } from 'zustand'

// Types exacts de l'ancien store Gatsby + nouveau mode 3 colonnes
export type NavigatorPosition = 'is-featured' | 'is-aside' | 'is-three-columns' | 'moving-aside' | 'moving-featured'
export type NavigatorShape = 'open' | 'closed'
export type AnimationPhase = 'idle' | 'navigator-moving' | 'content-loading' | 'content-entering'

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
  animationPhase: AnimationPhase
  currentArticleSlug: string | null
  
  // États pour reproduire les comportements Gatsby
  showPostsList: boolean // Affiche la liste des posts dans la sidebar (comme dans l'ancien Navigator)
  showInfoContent: boolean // Affiche le contenu info de l'auteur

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
  setShowPostsList: (show: boolean) => void
  setShowInfoContent: (show: boolean) => void
  
  // Helpers reproduisant les utilitaires Gatsby
  featureNavigator: () => void
  moveNavigatorAside: () => void
  navigateToArticle: (slug: string) => void // Nouvelle fonction pour clic article
  resetToHome: () => void // Nouvelle action pour reset complet
}

export const useGatsbyUIStore = create<GatsbyUIState>((set, get) => ({
  // Nouveaux états pour les animations
  animationPhase: 'idle',
  categoryFilter: 'all posts',
  currentArticleSlug: null,
  
  // Helpers reproduisant src/utils/shared.js (simplified to avoid infinite loops)
  featureNavigator: () => {
    const state = get()
    set({ 
      animationPhase: 'idle',
      currentArticleSlug: null,
      isTransitioning: false,
      lastNavigatorPosition: state.navigatorPosition,
      navigatorPosition: 'is-three-columns', // Mode 3 colonnes pour la page d'accueil
      navigatorShape: 'open'
    })
  }, 
  fontSizeIncrease: 1,
  // Nouveaux états
  isInfoBoxExpanded: true,
  isTransitioning: false,
  isWideScreen: false,
  lastNavigatorPosition: 'is-three-columns', // Cohérent avec le nouvel état initial

  moveNavigatorAside: () => {
    const state = get()
    
    // Phase 1: Démarrer la transition - Navigator commence à bouger
    set({ 
      animationPhase: 'navigator-moving',
      isTransitioning: true,
      lastNavigatorPosition: state.navigatorPosition,
      navigatorPosition: 'moving-aside',
      navigatorShape: 'closed',
      // CORRECTION: Masquer InfoBox et afficher liste automatiquement
      showInfoContent: false,
      showPostsList: true
    })
    
    // Phase 2: Après 200ms, Navigator atteint sa position finale
    setTimeout(() => {
      set({
        animationPhase: 'content-loading',
        navigatorPosition: 'is-aside'
      })
    }, 200)
    
    // Phase 3: Après 250ms, contenu prêt à apparaître
    setTimeout(() => {
      set({
        animationPhase: 'content-entering'
      })
    }, 250)
    
    // Phase 4: Animation complète après 850ms
    setTimeout(() => {
      set({
        animationPhase: 'idle',
        isTransitioning: false
      })
    }, 850)
  },
  navigateToArticle: (slug: string) => {
    const state = get()
    
    // Étape 1: Sauvegarder le slug et démarrer la transition navigator
    set({ 
      animationPhase: 'navigator-moving',
      currentArticleSlug: slug,
      isTransitioning: true,
      lastNavigatorPosition: state.navigatorPosition,
      navigatorPosition: 'moving-aside',
      navigatorShape: 'closed'
    })
    
    // Étape 2: Navigator atteint sa position finale (200ms)
    setTimeout(() => {
      set({
        animationPhase: 'content-loading',
        navigatorPosition: 'is-aside'
      })
    }, 200)
    
    // Étape 3: Contenu prêt à apparaître (250ms)
    setTimeout(() => {
      set({
        animationPhase: 'content-entering'
      })
    }, 250)
    
    // Étape 4: Animation terminée (850ms)
    setTimeout(() => {
      set({
        animationPhase: 'idle',
        isTransitioning: false
      })
    }, 850)
  },
  navigatorFilter: '',
  // État initial modifié pour afficher les 3 colonnes dès l'accueil
  navigatorPosition: 'is-three-columns', // Nouveau mode 3 colonnes
  navigatorShape: 'open',
  resetToHome: () => {
    const state = get()
    set({ 
      categoryFilter: 'all posts',
      isInfoBoxExpanded: true,
      isTransitioning: false,
      lastNavigatorPosition: state.navigatorPosition,
      navigatorFilter: '',
      navigatorPosition: 'is-three-columns', // Mode 3 colonnes pour l'accueil
      navigatorShape: 'open',
      scrollToTop: true
    })
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
  setScrollToTop: (scroll) => set({ scrollToTop: scroll }),
  setShowInfoContent: (show) => set({ 
    showInfoContent: show,
    showPostsList: !show // Basculement exclusif
  }),

  setShowPostsList: (show) => set({ 
    showInfoContent: !show, // Basculement exclusif entre info auteur et liste posts
    showPostsList: show
  }),
  
  showInfoContent: true, // Contenu auteur affiché par défaut

  showPostsList: false // Liste des posts dans sidebar (mode collapsed)
}))

// Hooks de convenance reproduisant les patterns Gatsby
export const useNavigatorState = () => {
  const navigatorPosition = useGatsbyUIStore((s) => s.navigatorPosition)
  const navigatorShape = useGatsbyUIStore((s) => s.navigatorShape)
  const isWideScreen = useGatsbyUIStore((s) => s.isWideScreen)
  const isTransitioning = useGatsbyUIStore((s) => s.isTransitioning)
  const lastNavigatorPosition = useGatsbyUIStore((s) => s.lastNavigatorPosition)
  return { isTransitioning, isWideScreen, lastNavigatorPosition, navigatorPosition, navigatorShape }
}

export const useNavigatorActions = () => {
  const setNavigatorPosition = useGatsbyUIStore((s) => s.setNavigatorPosition)
  const setNavigatorShape = useGatsbyUIStore((s) => s.setNavigatorShape)
  const featureNavigator = useGatsbyUIStore((s) => s.featureNavigator)
  const moveNavigatorAside = useGatsbyUIStore((s) => s.moveNavigatorAside)
  const resetToHome = useGatsbyUIStore((s) => s.resetToHome)
  return { featureNavigator, moveNavigatorAside, resetToHome, setNavigatorPosition, setNavigatorShape }
}

export const useUIPreferences = () => {
  const fontSizeIncrease = useGatsbyUIStore((s) => s.fontSizeIncrease)
  const setFontSizeIncrease = useGatsbyUIStore((s) => s.setFontSizeIncrease)
  const scrollToTop = useGatsbyUIStore((s) => s.scrollToTop)
  const setScrollToTop = useGatsbyUIStore((s) => s.setScrollToTop)
  const isInfoBoxExpanded = useGatsbyUIStore((s) => s.isInfoBoxExpanded)
  const setInfoBoxExpanded = useGatsbyUIStore((s) => s.setInfoBoxExpanded)
  return { fontSizeIncrease, isInfoBoxExpanded, scrollToTop, setFontSizeIncrease, setInfoBoxExpanded, setScrollToTop }
}

export const useFilters = () => {
  const categoryFilter = useGatsbyUIStore((s) => s.categoryFilter)
  const setCategoryFilter = useGatsbyUIStore((s) => s.setCategoryFilter)
  const navigatorFilter = useGatsbyUIStore((s) => s.navigatorFilter)
  const setNavigatorFilter = useGatsbyUIStore((s) => s.setNavigatorFilter)
  return { categoryFilter, navigatorFilter, setCategoryFilter, setNavigatorFilter }
}

export const useResponsive = () => {
  const isWideScreen = useGatsbyUIStore((s) => s.isWideScreen)
  const setIsWideScreen = useGatsbyUIStore((s) => s.setIsWideScreen)
  return { isWideScreen, setIsWideScreen }
}

export const useAnimations = () => {
  const isTransitioning = useGatsbyUIStore((s) => s.isTransitioning)
  const setIsTransitioning = useGatsbyUIStore((s) => s.setIsTransitioning)
  const lastNavigatorPosition = useGatsbyUIStore((s) => s.lastNavigatorPosition)
  const animationPhase = useGatsbyUIStore((s) => s.animationPhase)
  const currentArticleSlug = useGatsbyUIStore((s) => s.currentArticleSlug)
  const navigateToArticle = useGatsbyUIStore((s) => s.navigateToArticle)
  return { 
    animationPhase, 
    currentArticleSlug, 
    isTransitioning, 
    lastNavigatorPosition, 
    navigateToArticle, 
    setIsTransitioning 
  }
}
