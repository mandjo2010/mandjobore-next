/**
 * LayoutWrapper - Reproduction fidèle du wrapper principal de Gatsby
 * Correspondance avec src/components/LayoutWrapper/LayoutWrapper.js
 */
'use client'

import { Box, styled, ThemeProvider } from '@mui/material'
import React, { ReactNode } from 'react'

import { useResponsiveDetector } from '@/hooks/useResponsiveDetector'
import { useGatsbyUIStore } from '@/store/gatsby-ui-store'
import { gatsbyVariables } from '@/theme/gatsby-theme'
import { theme as correctedTheme } from '@/theme/muiTheme'

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
  backgroundColor: theme.gatsby?.colors?.background || '#ffffff',
  bottom: 0,
  left: 0,
  overflow: 'hidden',
  position: 'absolute',
  right: 0,
  top: 0,
  
  // Variables CSS Gatsby
  ...gatsbyVariables,
  
  '&.closed': {
    '& .navigator-list': {
      height: 'var(--navigator-closed-height)'
    }
  },
  
  '&.is-aside': {
    '& .navigator': {
      transform: `translateX(calc(-100% + var(--info-width)))`,
      width: 'var(--info-width)'
    }
  },
  
  // Classes d'état du Navigator (reproduction exacte des CSS Gatsby)
  '&.is-featured': {
    '& .navigator': {
      transform: 'translateX(0)',
      width: 'calc(100% - var(--actions-width))'
    }
  },
  
  // Nouveau mode 3 colonnes : InfoBox (320px) + Navigator (milieu) + ActionsBar (64px)
  '&.is-three-columns': {
    '& .navigator': {
      left: 'var(--info-width)',
      right: 'var(--actions-width)',
      transform: 'translateX(0)',
      width: 'calc(100% - var(--info-width) - var(--actions-width))'
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
  
  '@media print': {
    overflow: 'visible',
    position: 'relative'
  }
}))

interface LayoutWrapperProps {
  children: ReactNode
}

export default function LayoutWrapper({ children }: LayoutWrapperProps) {
  const { navigatorPosition, navigatorShape, setIsWideScreen } = useGatsbyUIStore()
  
  // Détection responsive connectée au store
  const isWide = useResponsiveDetector()
  
  // Mettre à jour le store quand la taille change
  React.useEffect(() => {
    setIsWideScreen(isWide)
  }, [isWide, setIsWideScreen])
  
  // Classes CSS dynamiques comme dans Gatsby
  const wrapperClasses = [
    navigatorPosition,
    navigatorShape
  ].join(' ')
  
  return (
    <ThemeProvider theme={correctedTheme}>
      <StyledWrapper className={wrapperClasses}>
        {children}
      </StyledWrapper>
    </ThemeProvider>
  )
}
