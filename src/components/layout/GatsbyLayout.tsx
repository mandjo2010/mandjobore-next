/**
 * GatsbyLayout - Reproduction fidèle du layout principal de Gatsby
 * Correspondance avec src/layouts/index.js
 */
'use client'

import React, { ReactNode, useEffect } from 'react'
import { ThemeProvider, CssBaseline } from '@mui/material'
import { styled } from '@mui/material/styles'
import { extendedGatsbyTheme, gatsbyVariables } from '@/theme/gatsby-theme'
import { useGatsbyUIStore, useResponsive, useUIPreferences } from '@/store/gatsby-ui-store'
import LayoutWrapper from '@/components/LayoutWrapper/LayoutWrapper'

// Import des composants principaux (à créer)
import Navigator from '@/components/Navigator/Navigator'
import ActionsBar from '@/components/ActionsBar/ActionsBar'
import InfoBar from '@/components/InfoBar/InfoBar'
import InfoBox from '@/components/InfoBox/InfoBox'

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
  position: 'relative',
  height: '100vh',
  overflow: 'hidden',
  
  // Variables CSS Gatsby
  ...gatsbyVariables,
  
  // Styles pour le contenu principal
  '& .main-content': {
    position: 'absolute',
    top: 0,
    left: 'var(--info-width)',
    right: 'var(--actions-width)',
    bottom: 0,
    overflow: 'hidden',
    transition: 'left 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
    
    '@media (max-width: 1023px)': {
      left: 0,
      right: 0
    }
  },
  
  // Navigation states reproduisant les classes Gatsby
  '&.is-featured .main-content': {
    left: 0,
    right: 'var(--actions-width)'
  },
  
  '&.is-aside .main-content': {
    left: 'var(--info-width)',
    right: 'var(--actions-width)'
  }
}))

export default function GatsbyLayout({ 
  children, 
  posts = [], 
  pages = [], 
  parts = [],
  seo 
}: GatsbyLayoutProps) {
  const { navigatorPosition, navigatorShape, isWideScreen } = useGatsbyUIStore()
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
  }, [setIsWideScreen])
  
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
          <Navigator 
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
            className="actions-bar"
          />
          
          {/* InfoBar - Mobile only */}
          {!isWideScreen && (
            <InfoBar 
              pages={pages}
              parts={parts}
              className="info-bar"
            />
          )}
          
          {/* InfoBox - Desktop only (asynchrone comme dans Gatsby) */}
          {isWideScreen && (
            <React.Suspense fallback={<div>Loading...</div>}>
              <InfoBox 
                pages={pages}
                parts={parts}
                className="info-box"
              />
            </React.Suspense>
          )}
        </MainContainer>
      </LayoutWrapper>
    </ThemeProvider>
  )
}
