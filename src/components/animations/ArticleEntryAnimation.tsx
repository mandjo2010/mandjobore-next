/**
 * ArticleEntryAnimation - Animation "page turning" de droite vers gauche
 * Reproduit l'effet de feuilleter une page lors du clic sur un article
 */
'use client'

import { Box, styled, keyframes } from '@mui/material'
import { ReactNode } from 'react'

import { useAnimations } from '@/store/gatsby-ui-store'

interface ArticleEntryAnimationProps {
  children: ReactNode
  className?: string
}

// Keyframes reproduisant l'effet "page turning" - balayage droite vers gauche (simplifié)
const pageSlideIn = keyframes`
  0% {
    opacity: 0;
    transform: translateX(100%);
    box-shadow: -8px 0 15px rgba(0, 0, 0, 0.2);
  }
  100% {
    opacity: 1;
    transform: translateX(0);
    box-shadow: none;
  }
`

const AnimatedContainer = styled(Box)<{ 
  animationPhase: string
}>(({ animationPhase }) => ({
  height: '100%',
  // État par défaut - masqué à droite
  opacity: 0,
  overflow: 'hidden',
  position: 'relative',
  
  transform: 'translateX(100%)',
  width: '100%',
  
  // Animation d'entrée uniquement quand content-entering
  ...(animationPhase === 'content-entering' && {
    animation: `${pageSlideIn} 0.6s ease-out forwards`,
    animationDelay: '0s' // Pas de délai pour éviter le clignotement
  }),
  
  // État final stable
  ...(animationPhase === 'idle' && {
    opacity: 1,
    transform: 'translateX(0)',
    transition: 'none' // Pas de transition pour éviter les conflits
  })
}))

export default function ArticleEntryAnimation({ 
  children, 
  className = '' 
}: ArticleEntryAnimationProps) {
  const { animationPhase } = useAnimations()
  
  return (
    <AnimatedContainer
      animationPhase={animationPhase}
      className={`article-entry-animation ${className}`}
    >
      {children}
    </AnimatedContainer>
  )
}

// Export des types pour compatibilité
export type { ArticleEntryAnimationProps }
