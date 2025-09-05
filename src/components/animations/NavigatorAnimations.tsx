/**
 * NavigatorAnimations - Reproduit les animations de position du Navigator Gatsby
 * Correspond aux transitions "moving-aside", "is-aside", etc.
 */
'use client'

import { Box, styled } from '@mui/material'
import { ReactNode } from 'react'

import { useNavigatorState } from '@/store/gatsby-ui-store'

interface NavigatorAnimationsProps {
  children: ReactNode
  className?: string
}

const AnimatedNavigator = styled(Box)<{
  navigatorPosition: string
  navigatorShape: string
  isTransitioning: boolean
}>(({ isTransitioning, navigatorPosition, navigatorShape, theme }) => ({
  height: '100%',
  position: 'relative',
  // Transitions fluides reproduisant Gatsby
  transition: 'left 0.9s ease, width 0.5s ease, transform 0.3s ease',
  
  willChange: 'transform, left, width',
  
  // État par défaut - 3 colonnes (home)
  ...(navigatorPosition === 'is-three-columns' && {
    left: '320px',
    transform: 'translateX(0)',
    width: 'calc(100vw - 320px - 60px)',
  }),
  
  // État featured (accueil traditionnel)
  ...(navigatorPosition === 'is-featured' && {
    left: '320px',
    transform: 'translateX(0)',
    width: 'calc(100vw - 320px - 60px)',
  }),
  
  // Animation en cours - Navigator se déplace vers la gauche
  ...(navigatorPosition === 'moving-aside' && {
    // Position finale après animation
    '&.animation-complete': {
      transform: 'translateX(0)',
    },
    left: '0px',
    transform: 'translateX(-100vw)',
    transition: 'left 0.9s ease, width 0.5s ease, transform 0.9s ease',
    
    width: '319px'
  }),
  
  // Position finale - Navigator en sidebar gauche
  ...(navigatorPosition === 'is-aside' && {
    left: '0px',
    transform: 'translateX(0)',
    width: '319px',
    
    // Mode fermé - auto-hide comme dans Gatsby
    ...(navigatorShape === 'closed' && {
      bottom: 'calc(-100% + 100px + 80px)',
      height: 'calc(100% - 100px)',
      position: 'absolute'
    }),
    
    // Mode ouvert - liste complète visible
    ...(navigatorShape === 'open' && {
      bottom: '0',
      height: 'calc(100% - 100px)',
      position: 'relative'
    })
  }),
  
  // Responsive - Mobile
  '@media (max-width: 1023px)': {
    ...(navigatorPosition === 'is-aside' && {
      background: theme.palette.background.paper,
      height: '100vh',
      left: 0,
      position: 'fixed',
      top: 0,
      // Animation slide depuis la gauche sur mobile
      transform: isTransitioning ? 'translateX(-100%)' : 'translateX(0)',
      transition: 'transform 0.5s ease',
      
      width: '100vw',
      zIndex: 1000
    })
  }
}))

// Composant wrapper pour gérer l'état d'animation complète
export default function NavigatorAnimations({ 
  children, 
  className = '' 
}: NavigatorAnimationsProps) {
  const { isTransitioning, navigatorPosition, navigatorShape } = useNavigatorState()
  
  return (
    <AnimatedNavigator
      navigatorPosition={navigatorPosition}
      navigatorShape={navigatorShape}
      isTransitioning={isTransitioning}
      className={`navigator-animations ${navigatorPosition} ${navigatorShape} ${className}`}
    >
      {children}
    </AnimatedNavigator>
  )
}

// Export des types
export type { NavigatorAnimationsProps }
