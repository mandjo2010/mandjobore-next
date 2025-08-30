/**
 * GatsbyLayoutMain - Layout principal reproduisant la structure exacte de Gatsby
 * Utilise Main + InfoBox + InfoBar + Navigator avec logique correcte
 */
'use client'

import { Box } from '@mui/material'
import React, { useEffect } from 'react'

import InfoBar from '@/components/InfoBar'
import InfoBox from '@/components/InfoBox'
import Main from '@/components/Main'
import { useGatsbyUIStore } from '@/store/gatsby-ui-store'

interface Page {
  slug: string
  title: string
  menuTitle?: string
}

interface Part {
  title: string
  html: string
}

interface GatsbyLayoutMainProps {
  children: React.ReactNode
  pages: Page[]
  parts: Part[]
  isPage?: boolean // true pour pages statiques, false pour accueil
}

export default function GatsbyLayoutMain({ 
  children, 
  isPage = false, 
  pages, 
  parts 
}: GatsbyLayoutMainProps) {
  const { featureNavigator, moveNavigatorAside } = useGatsbyUIStore()

  // Effect pour déclencher la navigation correcte selon le type de contenu
  useEffect(() => {
    if (isPage) {
      // Pour les pages statiques comme About, déclencher moveNavigatorAside
      moveNavigatorAside()
    } else {
      // Pour l'accueil, déclencher featureNavigator
      featureNavigator()
    }
  }, [isPage, moveNavigatorAside, featureNavigator])

  return (
    <Box sx={{ minHeight: '100vh', position: 'relative' }}>
      {/* InfoBox - Sidebar desktop */}
      <InfoBox pages={pages} parts={parts} />
      
      {/* InfoBar - Barre mobile */}
      <InfoBar pages={pages} />
      
      {/* Main content area */}
      <Main>
        {children}
      </Main>
    </Box>
  )
}
