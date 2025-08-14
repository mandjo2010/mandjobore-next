import * as React from 'react'
import { Box } from '@mui/material'
import { useNavigatorState } from '@/store/ui'
import InfoBox from './InfoBox'
import Navigator from './Navigator'
import ActionsBar from './ActionsBar'

interface RootLayoutProps {
  children: React.ReactNode
}

/**
 * Layout principal reproduisant l'architecture Gatsby
 * Structure: InfoBox (320px) | MainContent (flex) | ActionsBar (60px)
 */
export default function RootLayout({ children }: RootLayoutProps) {
  const { position, shape } = useNavigatorState()
  
  return (
    <Box
      sx={{
        display: 'flex',
        minHeight: '100vh',
        width: '100%',
        overflow: 'hidden',
        // Variables CSS pour les transitions
        '--transition-duration': '300ms',
        '--ease-function': 'cubic-bezier(0.4, 0, 0.2, 1)',
      }}
    >
      {/* InfoBox - Sidebar gauche (320px) */}
      <Box
        component="aside"
        sx={{
          width: 320,
          flexShrink: 0,
          borderRight: '1px solid #dedede',
          transition: 'transform var(--transition-duration) var(--ease-function)',
          transform: shape === 'closed' ? 'translateX(-100%)' : 'translateX(0)',
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
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Navigator - Liste d'articles */}
        <Box
          sx={{
            width: position === 'is-featured' ? '100%' : '400px',
            flexShrink: 0,
            borderRight: position === 'is-aside' ? '1px solid #dedede' : 'none',
            transition: 'all var(--transition-duration) var(--ease-function)',
            transform: position === 'moving-aside' ? 'translateX(-100%)' : 'translateX(0)',
            opacity: position === 'moving-aside' ? 0.8 : 1,
            zIndex: position === 'is-featured' ? 999 : 1,
          }}
        >
          <Navigator />
        </Box>

        {/* Contenu de l'article */}
        <Box
          sx={{
            flex: 1,
            display: position === 'is-featured' ? 'none' : 'flex',
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
          width: 60,
          flexShrink: 0,
          borderLeft: '1px solid #dedede',
          zIndex: 1001,
        }}
      >
        <ActionsBar />
      </Box>
    </Box>
  )
}
