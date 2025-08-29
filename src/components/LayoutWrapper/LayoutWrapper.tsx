/**
 * LayoutWrapper - Reproduction fidèle du wrapper principal de Gatsby
 * Correspondance avec src/components/LayoutWrapper/LayoutWrapper.js
 */
'use client'

import React, { ReactNode } from 'react'
import { Box, styled } from '@mui/material'
import { useGatsbyUIStore } from '@/store/gatsby-ui-store'
import { gatsbyVariables } from '@/theme/gatsby-theme'
import { useResponsiveDetector } from '@/hooks/useResponsiveDetector'

// Helpers temporairement désactivés pour éviter les boucles
// const isWideScreen = () => {
//   if (typeof window === 'undefined') return false
//   return window.innerWidth >= 1024 // breakpoint L
// }

// const timeouts: Record<string, NodeJS.Timeout> = {}
// const timeoutThrottlerHandler = (name: string, delay: number, handler: () => void) => {
//   if (timeouts[name]) {
//     clearTimeout(timeouts[name])
//   }
//   timeouts[name] = setTimeout(handler, delay)
// }

const StyledWrapper = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: 0,
  left: 0,
  bottom: 0,
  right: 0,
  overflow: 'hidden',
  backgroundColor: theme.gatsby?.colors?.background || '#ffffff',
  
  // Variables CSS Gatsby
  ...gatsbyVariables,
  
  // Classes d'état du Navigator (reproduction exacte des CSS Gatsby)
  '&.is-featured': {
    '& .navigator': {
      transform: 'translateX(0)',
      width: 'calc(100% - var(--actions-width))'
    }
  },
  
  '&.is-aside': {
    '& .navigator': {
      transform: `translateX(calc(-100% + var(--info-width)))`,
      width: 'var(--info-width)'
    }
  },
  
  '&.moving-aside, &.moving-featured': {
    '& .navigator': {
      transition: 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)'
    }
  },
  
  '&.open': {
    '& .navigator-list': {
      height: 'auto'
    }
  },
  
  '&.closed': {
    '& .navigator-list': {
      height: 'var(--navigator-closed-height)'
    }
  },
  
  '@media print': {
    position: 'relative',
    overflow: 'visible'
  }
}))

interface LayoutWrapperProps {
  children: ReactNode
}

export default function LayoutWrapper({ children }: LayoutWrapperProps) {
  const { navigatorPosition, navigatorShape } = useGatsbyUIStore()
  
  // Détection responsive isolée (pas connectée au store pour éviter les boucles)
  const _isWide = useResponsiveDetector()
  
  // On peut utiliser _isWide ici si nécessaire pour la logique locale
  // mais on évite de l'envoyer au store automatiquement
  
  // Classes CSS dynamiques comme dans Gatsby
  const wrapperClasses = [
    navigatorPosition,
    navigatorShape
  ].join(' ')
  
  return (
    <StyledWrapper className={wrapperClasses}>
      {children}
    </StyledWrapper>
  )
}
