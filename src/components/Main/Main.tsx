/**
 * Main - Composant principal reproduisant src/components/Main/Main.js
 * Container principal avec scrollbar et animations
 */
'use client'

import { Box } from '@mui/material'
import React from 'react'
// import { useGatsbyUIStore } from '@/store/gatsby-ui-store' // Unused for now

interface MainProps {
  children: React.ReactNode
}

export default function Main({ children }: MainProps) {
  // const { navigatorPosition } = useGatsbyUIStore() // Unused for now

  return (
    <Box
      component="main"
      sx={{
        // Animation d'entrée comme dans Gatsby
        '@keyframes main-entry': {
          '0%': {
            opacity: 0,
            transform: 'translateY(20px)'
          },
          '100%': {
            opacity: 1,
            transform: 'translateY(0)'
          }
        },
        // Responsive selon la position de l'InfoBox
        '@media (min-width: 1024px)': {
          left: '320px', // InfoBox width
          width: 'calc(100vw - 320px - 50px)' // InfoBox width + ActionsBar width
        },
        // Print styles
        '@media print': {
          '& > div': {
            overflow: 'visible !important'
          },
          '& > div > div': {
            position: 'relative !important'
          },
          position: 'relative'
        },
        animation: 'main-entry 0.5s ease',
        bottom: 0,
        
        left: 0,
        position: 'absolute',
        
        top: 0,
        
        width: '100%'
      }}
    >
      {/* Scrollable content - reproduit SpringScrollbars */}
      <Box
        sx={{
          '&::-webkit-scrollbar': {
            width: '8px'
          },
          '&::-webkit-scrollbar-thumb': {
            background: '#c1c1c1',
            borderRadius: '4px'
          },
          '&::-webkit-scrollbar-thumb:hover': {
            background: '#a1a1a1'
          },
          '&::-webkit-scrollbar-track': {
            background: '#f1f1f1'
          },
          height: '100%',
          overflow: 'auto'
        }}
      >
        {children}
      </Box>
    </Box>
  )
}
