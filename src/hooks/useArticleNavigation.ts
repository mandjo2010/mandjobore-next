/**
 * useArticleNavigation - Hook reproduisant la logique de clic article de Gatsby
 * Correspond à linkOnClick dans src/components/Navigator/ListItem.js
 */
'use client'

import { useRouter } from 'next/navigation'
import { useCallback } from 'react'

import { useAnimations, useNavigatorState, useNavigatorActions } from '@/store/gatsby-ui-store'

interface UseArticleNavigationReturn {
  navigateToArticle: (slug: string, event?: React.MouseEvent) => void
  isNavigating: boolean
  currentSlug: string | null
}

export function useArticleNavigation(): UseArticleNavigationReturn {
  const router = useRouter()
  const { isTransitioning, navigatorPosition } = useNavigatorState()
  const { 
    animationPhase, 
    currentArticleSlug,
    navigateToArticle: storeNavigateToArticle 
  } = useAnimations()
  
  const navigateToArticle = useCallback((slug: string, event?: React.MouseEvent) => {
    // Prévenir le comportement par défaut du lien
    if (event) {
      event.preventDefault()
    }
    
    // Si déjà en cours de navigation, ignorer
    if (isTransitioning) {
      return
    }
    
    // Si déjà sur l'article, ne rien faire
    if (currentArticleSlug === slug) {
      return
    }
    
    // Reproduire la logique moveNavigatorAside de Gatsby
    if (navigatorPosition === 'is-featured' || navigatorPosition === 'is-three-columns') {
      // Démarrer l'animation de transition
      storeNavigateToArticle(slug)
      
      // Naviguer vers l'article après le délai d'animation
      setTimeout(() => {
        router.push(`/posts/${slug}`)
      }, 100) // Navigation rapide, l'animation continue en arrière-plan
      
    } else {
      // Si déjà en mode article, navigation directe
      router.push(`/posts/${slug}`)
    }
  }, [
    router, 
    isTransitioning, 
    currentArticleSlug, 
    navigatorPosition, 
    storeNavigateToArticle
  ])
  
  return {
    currentSlug: currentArticleSlug,
    isNavigating: isTransitioning && animationPhase !== 'idle',
    navigateToArticle
  }
}

// Hook pour gérer le retour à l'accueil (bouton Home)
export function useHomeNavigation() {
  const router = useRouter()
  const { featureNavigator } = useNavigatorActions()
  
  const navigateToHome = useCallback((event?: React.MouseEvent) => {
    if (event) {
      event.preventDefault()
    }
    
    // Remettre Navigator en position featured/3-columns
    featureNavigator()
    
    // Navigation vers l'accueil
    router.push('/')
  }, [router, featureNavigator])
  
  return { navigateToHome }
}

// Types pour export
export type { UseArticleNavigationReturn }
