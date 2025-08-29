import { Box } from '@mui/material'
import * as React from 'react'

import { useNavigatorState } from '@/store/ui'

import ActionsBar from './ActionsBar'
import InfoBox from './InfoBox'
import NavigatorSimple from './NavigatorSimple'

interface RootLayoutProps {
  children: React.ReactNode
  posts?: Array<{
    slug: string;
    title: string;
    excerpt: string;
    category?: string | null;
    cover?: string | null;
    date: string;
  }>
}

/**
 * Layout principal reproduisant l'architecture Gatsby
 * Structure: InfoBox (320px) | MainContent (flex) | ActionsBar (60px)
 */
export default function RootLayout({ children, posts = [] }: RootLayoutProps) {
  const { navigatorPosition, isOpen } = useNavigatorState()
  
  return (
    <Box
      sx={{
        '--ease-function': 'cubic-bezier(0.4, 0, 0.2, 1)',
        // Variables CSS pour les transitions
        '--transition-duration': '300ms',
        display: 'flex',
        minHeight: '100vh',
        overflow: 'hidden',
        width: '100%',
      }}
    >
      {/* InfoBox - Sidebar gauche (320px) */}
      <Box
        component="aside"
        sx={{
          flexShrink: 0,
          transform: !isOpen ? 'translateX(-100%)' : 'translateX(0)',
          transition: 'transform var(--transition-duration) var(--ease-function)',
          width: 320,
          zIndex: 1000,
        }}
      >
        <InfoBox />
      </Box>

      {/* Zone de contenu principal */}
      <Box
        component="main"
        sx={{
          display: 'flex',
          flex: 1,
          overflow: 'hidden',
          position: 'relative',
        }}
      >
        {/* Navigator - Liste d'articles */}
        <Box
          sx={{
            borderRight: navigatorPosition === 'is-aside' ? '1px solid var(--color-lines)' : 'none',
            flexShrink: 0,
            opacity: navigatorPosition === 'moving-aside' ? 0.8 : 1,
            transform: navigatorPosition === 'moving-aside' ? 'translateX(-100%)' : 'translateX(0)',
            transition: 'all var(--transition-duration) var(--ease-function)',
            width: navigatorPosition === 'is-featured' ? '100%' : '400px',
            zIndex: navigatorPosition === 'is-featured' ? 999 : 1,
          }}
        >
          <NavigatorSimple posts={posts} />
        </Box>

        {/* Contenu de l'article */}
        <Box
          sx={{
            display: navigatorPosition === 'is-featured' ? 'none' : 'flex',
            flex: 1,
            flexDirection: 'column',
            overflow: 'hidden',
            transition: 'all var(--transition-duration) var(--ease-function)',
          }}
        >
          {children}
        </Box>
      </Box>

      {/* ActionsBar - Barre d'actions droite */}
      <Box
        component="aside"
        sx={{
          flexShrink: 0,
          width: 60,
          zIndex: 1001,
        }}
      >
        <ActionsBar />
      </Box>
    </Box>
  )
}
