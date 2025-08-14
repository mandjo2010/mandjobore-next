import { Box } from '@mui/material'
import * as React from 'react'

interface SeparatorLineProps {
  orientation?: 'horizontal' | 'vertical'
  position?: 'top' | 'bottom' | 'left' | 'right' | 'before' | 'after'
  responsive?: boolean
  margin?: boolean
}

/**
 * SeparatorLine - Composant réutilisable pour les barres de séparation Gatsby
 * Reproduit exactement les ::before et ::after du projet original
 */
export default function SeparatorLine({ 
  margin = true,
  orientation = 'horizontal',
  position = 'after',
  responsive = true
}: SeparatorLineProps) {
  const isHorizontal = orientation === 'horizontal'
  const isVertical = orientation === 'vertical'

  return (
    <Box
      sx={{
        position: 'absolute',
        
        // Configuration selon l'orientation
        ...(isHorizontal && {
          borderTop: '1px solid var(--color-lines)',
          height: 0,
          left: margin ? 'var(--lines-margin)' : 0,
          right: margin ? 'var(--lines-margin)' : 0,
          ...(position === 'top' && { top: 0 }),
          ...(position === 'bottom' && { bottom: 0 }),
        }),
        
        ...(isVertical && {
          borderLeft: position === 'left' ? '1px solid var(--color-lines)' : 'none',
          borderRight: position === 'right' ? '1px solid var(--color-lines)' : 'none',
          bottom: margin ? 'var(--lines-margin)' : 0,
          top: margin ? 'var(--lines-margin)' : 0,
          width: '1px',
          ...(position === 'left' && { left: 0 }),
          ...(position === 'right' && { right: 0 }),
        }),
        
        // Gestion responsive
        ...(responsive && {
          // Mobile: barres horizontales uniquement
          '@media (max-width: 600px)': {
            ...(isVertical && { display: 'none' }),
          },
          
          // Desktop: barres verticales principales
          '@media (min-width: 1024px)': {
            ...(isHorizontal && position !== 'bottom' && { display: 'none' }),
          },
        }),
        
        // Contenu vide (::before / ::after)
        content: '""',
        
        opacity: 0.8,
        
        // Transition fluide
        transition: 'var(--separator-transition)',
        // Couleur et z-index
        zIndex: 1,
      }}
    />
  )
}

// Hook pour gérer les séparateurs en tant que pseudo-éléments
export const useSeparatorStyles = () => {
  return {
    // Barre horizontale bas (InfoBar style)
    horizontalBottomSeparator: {
      '&::before': {
        borderTop: '1px solid var(--color-lines)',
        bottom: 0,
        content: '""',
        height: 0,
        left: 'var(--lines-margin)',
        position: 'absolute',
        right: 'var(--lines-margin)',
        transition: 'var(--separator-transition)',
      },
    },
    
    // Barre horizontale haut (mobile)
    horizontalTopSeparator: {
      '&::before': {
        '@media (min-width: 1024px)': {
          display: 'none',
        },
        borderTop: '1px solid var(--color-lines)',
        content: '""',
        height: 0,
        left: 'var(--lines-margin)',
        position: 'absolute',
        right: 'var(--lines-margin)',
        top: 0,
        transition: 'var(--separator-transition)',
      },
    },
    
    // Barre verticale gauche (ActionsBar style)
    // CORRECTION: respecte les marges top/bottom (20px du haut et du bas)
    verticalLeftSeparator: {
      '&::before': {
        '@media (max-width: 1023px)': {
          display: 'none',
        },
        borderLeft: '1px solid var(--color-lines)',
        bottom: 'var(--lines-margin)', // 20px du bas
        content: '""',
        left: 0,
        position: 'absolute',
        top: 'var(--lines-margin)', // 20px du haut
        transition: 'var(--separator-transition)',
        width: '1px',
      },
    },
    
    // Barre verticale droite (InfoBox style)
    // CORRECTION: respecte les marges top/bottom (20px du haut et du bas)
    verticalRightSeparator: {
      '&::after': {
        '@media (max-width: 1023px)': {
          display: 'none',
        },
        borderRight: '1px solid var(--color-lines)',
        bottom: 'var(--lines-margin)', // 20px du bas
        content: '""',
        position: 'absolute',
        right: 0,
        top: 'var(--lines-margin)', // 20px du haut
        transition: 'var(--separator-transition)',
        width: '1px',
      },
    },
  }
}
