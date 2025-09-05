/**
 * NavigatorSlideUpAnimation - Animation de montée des articles de bas en haut
 * Se déclenche après l'animation "page turning" de l'article
 */
'use client'

import { Box, styled, keyframes } from '@mui/material'
import { ReactNode } from 'react'

import { useAnimations, useNavigatorState } from '@/store/gatsby-ui-store'

interface NavigatorSlideUpAnimationProps {
  children: ReactNode
  className?: string
}

// Animation de montée depuis le bas - comme un rideau qui se lève
const slideUpFromBottom = keyframes`
  0% {
    opacity: 0;
    transform: translateY(100%);
  }
  60% {
    opacity: 0.8;
    transform: translateY(20%);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
`

// Animation de descente vers le bas (pour retour accueil)
const slideDownToBottom = keyframes`
  0% {
    opacity: 1;
    transform: translateY(0);
  }
  100% {
    opacity: 0;
    transform: translateY(100%);
  }
`

const AnimatedNavigatorContainer = styled(Box)<{ 
  navigatorPosition: string
  animationPhase: string
}>(({ animationPhase, navigatorPosition }) => ({
  height: '100%',
  // État initial - Liste cachée en bas
  opacity: 0,
  overflow: 'hidden',
  position: 'relative',
  
  transform: 'translateY(100%)',
  width: '100%',
  
  // Animation de montée quand on passe en mode aside et que l'article est chargé
  ...((navigatorPosition === 'is-aside' || navigatorPosition === 'moving-aside') && 
      animationPhase === 'content-entering' && {
    animation: `${slideUpFromBottom} 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards`,
    animationDelay: '0.3s' // Démarre après l'animation de l'article
  }),
  
  // État stable - Liste visible en mode aside
  ...((navigatorPosition === 'is-aside') && animationPhase === 'idle' && {
    opacity: 1,
    transform: 'translateY(0)',
    transition: 'none'
  }),
  
  // Animation de descente pour retour accueil
  ...((navigatorPosition === 'is-featured' || navigatorPosition === 'is-three-columns') && {
    animation: `${slideDownToBottom} 0.5s ease-in forwards`
  }),
  
  // Mode 3 colonnes ou featured - liste cachée
  ...((navigatorPosition === 'is-featured' || navigatorPosition === 'is-three-columns') && 
      animationPhase === 'idle' && {
    opacity: 0,
    transform: 'translateY(100%)',
    transition: 'none'
  })
}))

export default function NavigatorSlideUpAnimation({ 
  children, 
  className = '' 
}: NavigatorSlideUpAnimationProps) {
  const { animationPhase } = useAnimations()
  const { navigatorPosition } = useNavigatorState()
  
  return (
    <AnimatedNavigatorContainer
      navigatorPosition={navigatorPosition}
      animationPhase={animationPhase}
      className={`navigator-slide-up-animation ${className}`}
    >
      {children}
    </AnimatedNavigatorContainer>
  )
}

// Export des types
export type { NavigatorSlideUpAnimationProps }
