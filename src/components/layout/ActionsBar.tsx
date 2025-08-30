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
import FontSetter from './FontSetter'

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
        // Ligne de séparation en haut (comme l'original)
        '&::before': {
          borderTop: '1px solid #e0e0e0',
          content: '""',
          height: 0,
          left: '20px',
          position: 'absolute',
          right: '20px',
          top: 0
        },
        // Version desktop (reproduction exacte du responsive Gatsby)
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
            width: 0,
            zIndex: 201 // S'assurer que la ligne est visible
          },
          flexDirection: 'column',
          height: '100%',
          left: 'auto',
          padding: '20px 0',
          right: 0,
          top: 0,
          width: '64px',
          
          zIndex: 200 // S'assurer que l'ActionsBar est au-dessus
        },
        background: '#ffffff',
        bottom: 0,
        display: 'flex',
        flexDirection: 'row',
        height: '80px',
        justifyContent: 'space-between',
        left: 0,
        padding: '0 20px',
        // Style de base reproduisant l'ancien actionsBar
        position: 'absolute',
        
        width: '100%',

        zIndex: 200 // S'assurer que l'ActionsBar est au-dessus
      }}
    >
      {/* Groupe de boutons principaux */}
      <Box
        sx={{
          '@media (min-width: 1024px)': {
            flexDirection: 'column',
            gap: 2
          },
          alignItems: 'center',
          display: 'flex',
          flexDirection: 'row',
          gap: 1
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

        {/* CategoryFilter */}
        <CategoryFilter categories={categories} />
      </Box>

      {/* Groupe de boutons secondaires */}
      <Box
        sx={{
          '@media (min-width: 1024px)': {
            flexDirection: 'column',
            gap: 2
          },
          alignItems: 'center',
          display: 'flex',
          flexDirection: 'row',
          gap: 1
        }}
      >
        {/* FontSetter - pas sur la page d'accueil */}
        {!isHomePage && <FontSetter />}

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

        {/* Bouton Fullscreen */}
        <Tooltip title={isFullscreen ? "Exit fullscreen" : "Fullscreen"} placement="top">
          <IconButton
            onClick={fullscreenOnClick}
            sx={{
              '&:hover': { color: 'primary.main' },
              color: 'text.secondary'
            }}
            size="small"
          >
            {isFullscreen ? (
              <FullscreenExit fontSize="small" />
            ) : (
              <Fullscreen fontSize="small" />
            )}
          </IconButton>
        </Tooltip>
      </Box>
    </Box>
  )
}
