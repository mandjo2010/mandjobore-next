'use client'

import { 
  Home, 
  Search, 
  KeyboardArrowUp, 
  Fullscreen, 
  FullscreenExit 
} from '@mui/icons-material'
import { Box, IconButton, Tooltip } from '@mui/material'
import { usePathname } from 'next/navigation'
import { useRouter } from 'next/router'
import React, { useState, useEffect } from 'react'

import { useGatsbyUIStore } from '@/store/gatsby-ui-store'

import CategoryFilter from './CategoryFilter'

/**
 * ActionsBar - Reproduction exacte de l'ancien ActionsBar Gatsby
 * Basé sur src/components/ActionsBar/ActionsBar.js du starter original
 */
export default function ActionsBar({ 
  categories = [],
}: { 
  categories?: string[]
}) {
  const router = useRouter()
  const pathname = usePathname()
  const isHomePage = pathname === '/'
  
  // États du store Gatsby
  const { 
    featureNavigator,
    moveNavigatorAside,
    setScrollToTop
  } = useGatsbyUIStore()
  
  // États locaux
  const [isFullscreen, setIsFullscreen] = useState(false)

  // Gestion du plein écran (comme dans l'original screenfull)
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement)
    }

    document.addEventListener('fullscreenchange', handleFullscreenChange)
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange)
  }, [])

  // Actions handlers (reproduisant la logique Gatsby exacte)
  const homeOnClick = () => {
    featureNavigator() // Retour à l'accueil avec 3 colonnes
    router.push('/')
  }

  const searchOnClick = () => {
    moveNavigatorAside() // Mode article/page
    router.push('/search')
  }

  const fullscreenOnClick = () => {
    if (document.fullscreenElement) {
      document.exitFullscreen()
    } else {
      document.documentElement.requestFullscreen()
    }
  }

  const arrowUpOnClick = () => {
    setScrollToTop(true)
  }

  return (
    <Box
      component="aside"
      sx={{
        // Large screens: 1024px+ = Affichage complet de l'ActionsBar (mode vertical)
        '@media (min-width: 1024px)': {
          // Ligne de séparation à gauche (reproduction exacte Gatsby)
          '&::before': {
            borderLeft: '1px solid #e0e0e0', // Couleur exacte du thème Gatsby (--base-lines)
            borderTop: 'none',
            bottom: '20px',
            content: '""',
            height: 'auto',
            left: 0,
            position: 'absolute',
            right: 'auto',
            top: '20px',
            width: '1px'
          },
          backgroundColor: '#ffffff',
          bottom: 0,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-start',
          padding: '20px 0',
          position: 'fixed',
          right: 0,
          top: 0,
          width: '64px'
        },
        
        // Medium/Small screens: moins de 1024px = ActionsBar horizontale en bas (zoom 175%+)
        '@media (max-width: 1023px)': {
          // Ligne de séparation en haut (comme l'original InfoBar mobile)
          '&::before': {
            borderTop: '1px solid #e0e0e0',
            borderLeft: 'none',
            content: '""',
            height: 0,
            left: '20px',
            position: 'absolute',
            right: '20px',
            top: 0,
            width: 'auto'
          },
          backgroundColor: '#ffffff',
          bottom: 0,
          display: 'flex',
          flexDirection: 'row',
          height: '64px',
          justifyContent: 'space-between', // Répartir gauche et droite
          left: 0,
          padding: '10px 20px',
          position: 'fixed',
          right: 0,
          width: '100%'
        },
        
        // Style de base (comme l'original)
        display: 'none'
      }}
    >
      {/* Groupe de boutons principaux (haut en mode vertical, gauche en mode horizontal) */}
      <Box
        sx={{
          '@media (min-width: 1024px)': {
            flexDirection: 'column',
            gap: 2,
            width: '100%'
          },
          '@media (max-width: 1023px)': {
            flexDirection: 'row',
            gap: 1
          },
          alignItems: 'center',
          display: 'flex'
        }}
      >
        {/* Bouton Home (retour à l'accueil) */}
        <Tooltip title="Back to home" placement="top">
          <IconButton
            onClick={homeOnClick}
            sx={{
              '&:hover': { color: 'primary.main' },
              color: 'text.secondary'
            }}
            size="small"
          >
            <Home fontSize="small" />
          </IconButton>
        </Tooltip>

        {/* Filtres de catégories - EN HAUT en mode vertical, avec les autres boutons en mode horizontal */}
        {isHomePage && categories.length > 0 && (
          <Box 
            sx={{ 
              '@media (min-width: 1024px)': { display: 'block' }, // Visible en mode vertical (EN HAUT)
              '@media (max-width: 1023px)': { display: 'block' } // Visible en mode horizontal
            }}
          >
            <CategoryFilter categories={categories} />
          </Box>
        )}

        {/* Bouton Search */}
        <Tooltip title="Search" placement="top">
          <IconButton
            onClick={searchOnClick}
            sx={{
              '&:hover': { color: 'primary.main' },
              color: 'text.secondary'
            }}
            size="small"
          >
            <Search fontSize="small" />
          </IconButton>
        </Tooltip>
      </Box>

      {/* Groupe de boutons secondaires (bas en mode vertical, droite en mode horizontal) */}
      <Box
        sx={{
          '@media (min-width: 1024px)': {
            flexDirection: 'column',
            gap: 2,
            marginTop: 'auto'
          },
          '@media (max-width: 1023px)': {
            flexDirection: 'row',
            gap: 1
          },
          alignItems: 'center',
          display: 'flex'
        }}
      >
        {/* Bouton Fullscreen */}
        <Tooltip title={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"} placement="top">
          <IconButton
            onClick={fullscreenOnClick}
            sx={{
              '&:hover': { color: 'primary.main' },
              color: 'text.secondary'
            }}
            size="small"
          >
            {isFullscreen ? <FullscreenExit fontSize="small" /> : <Fullscreen fontSize="small" />}
          </IconButton>
        </Tooltip>

        {/* Bouton Scroll to top */}
        <Tooltip title="Scroll to top" placement="top">
          <IconButton
            onClick={arrowUpOnClick}
            sx={{
              '&:hover': { color: 'primary.main' },
              color: 'text.secondary'
            }}
            size="small"
          >
            <KeyboardArrowUp fontSize="small" />
          </IconButton>
        </Tooltip>
      </Box>

      {/* FontSetter supprimé - pas d'icônes de zoom */}
    </Box>
  )
}
