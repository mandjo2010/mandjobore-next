/**
 * GatsbyLayout - Reproduction fidèle du layout principal de Gatsby
 * Correspondance avec src/layouts/index.js
 */
'use client'

import { ThemeProvider, CssBaseline } from '@mui/material'
import { styled } from '@mui/material/styles'
import React, { ReactNode, useEffect } from 'react'

import ActionsBar from '@/components/ActionsBar/ActionsBar'
import InfoBar from '@/components/InfoBar/InfoBar'
import InfoBox from '@/components/InfoBox/InfoBox'
import LayoutWrapper from '@/components/LayoutWrapper/LayoutWrapper'
// Import des composants principaux (à créer)
import GatsbyNavigator from '@/components/Navigator/GatsbyNavigator'
import { useNavigatorState, useResponsive, useUIPreferences } from '@/store/gatsby-ui-store'
import { extendedGatsbyTheme, gatsbyVariables } from '@/theme/gatsby-theme'

// Types pour les données (reproduction exacte de Gatsby)
interface Post {
  slug: string
  title: string
  subTitle?: string
  excerpt: string
  category?: string | null
  cover?: string | null
  date: string
  prefix?: string
}

interface Page {
  slug: string
  title: string
  menuTitle?: string
}

interface Part {
  title: string
  html: string
}

interface GatsbyLayoutProps {
  children: ReactNode
  posts: Post[]
  pages: Page[]
  parts: Part[]
  seo?: {
    title?: string
    description?: string
    image?: string
    url?: string
  }
}

// Container principal avec gestion du fontSize global
const MainContainer = styled('div')<{ fontSize: number }>(({ fontSize }) => ({
  fontSize: `${fontSize}rem`,
  height: '100vh',
  overflow: 'hidden',
  position: 'relative',
  
  // Variables CSS Gatsby
  ...gatsbyVariables,
  
  '&.is-aside .main-content': {
    left: 'var(--info-width)',
    right: 'var(--actions-width)'
  },
  
  // Navigation states reproduisant les classes Gatsby
  '&.is-featured .main-content': {
    left: 0,
    right: 'var(--actions-width)'
  },
  
  // Styles pour le contenu principal
  '& .main-content': {
    '@media (max-width: 1023px)': {
      left: 0,
      right: 0
    },
    bottom: 0,
    left: 'var(--info-width)',
    overflow: 'hidden',
    position: 'absolute',
    right: 'var(--actions-width)',
    top: 0,
    
    transition: 'left 0.5s cubic-bezier(0.4, 0, 0.2, 1)'
  }
}))

export default function GatsbyLayout({ 
  children, 
  pages = [], 
  parts = [], 
  posts = [],
  seo 
}: GatsbyLayoutProps) {
  const { isWideScreen, navigatorPosition, navigatorShape } = useNavigatorState()
  const { setIsWideScreen } = useResponsive()
  const { fontSizeIncrease } = useUIPreferences()
  
  // Gestion responsive reproduisant la logique Gatsby
  useEffect(() => {
    const checkScreenSize = () => {
      const isWide = window.innerWidth >= 1024
      setIsWideScreen(isWide)
    }
    
    checkScreenSize()
    window.addEventListener('resize', checkScreenSize)
    
    return () => window.removeEventListener('resize', checkScreenSize)
  }, []) // Remove setIsWideScreen dependency to prevent infinite loop
  
  // Extraction des catégories pour ActionsBar
  const categories = React.useMemo(() => {
    const categorySet = new Set<string>()
    posts.forEach(post => {
      if (post.category) {
        categorySet.add(post.category)
      }
    })
    return Array.from(categorySet)
  }, [posts])
  
  // Classes CSS dynamiques comme dans Gatsby
  const containerClasses = [
    navigatorPosition,
    navigatorShape,
    isWideScreen ? 'wide-screen' : 'narrow-screen'
  ].join(' ')
  
  return (
    <ThemeProvider theme={extendedGatsbyTheme}>
      <CssBaseline />
      
      {/* SEO Head */}
      {seo && (
        <head>
          <title>{seo.title}</title>
          {seo.description && <meta name="description" content={seo.description} />}
          {seo.image && <meta property="og:image" content={seo.image} />}
          {seo.url && <meta property="og:url" content={seo.url} />}
        </head>
      )}
      
      <LayoutWrapper>
        <MainContainer 
          className={containerClasses}
          fontSize={fontSizeIncrease}
        >
          {/* Navigator - Liste d'articles */}
          <GatsbyNavigator 
            posts={posts}
            categories={categories}
            className="navigator"
          />
          
          {/* Contenu principal */}
          <div className="main-content">
            {children}
          </div>
          
          {/* ActionsBar - Barre d'actions droite */}
          <ActionsBar 
            categories={categories}
          />
          
          {/* InfoBar - Mobile only */}
          {!isWideScreen && (
            <InfoBar 
              pages={pages}
            />
          )}
          
          {/* InfoBox - Desktop only (asynchrone comme dans Gatsby) */}
          {isWideScreen && (
            <React.Suspense fallback={<div>Loading...</div>}>
              <InfoBox 
                pages={pages}
                parts={parts}
              />
            </React.Suspense>
          )}
        </MainContainer>
      </LayoutWrapper>
    </ThemeProvider>
  )
}
