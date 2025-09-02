/**
 * GatsbyLayoutNew - Layout complet reproduisant fidèlement le starter Gatsby
 * Structure exacte: InfoBox (320px) | Navigator (flexible) | ActionsBar (64px)
 */
'use client'

import { ThemeProvider, CssBaseline, GlobalStyles, Box, Typography } from '@mui/material'
import Link from 'next/link'
import React, { ReactNode } from 'react'

import InfoBar from '@/components/InfoBar'
// Import des composants fidèles
import InfoBox from '@/components/InfoBox'
import ActionsBar from '@/components/layout/ActionsBar-fixed'
import LayoutWrapper from '@/components/LayoutWrapper'
import NavigatorBorderScrollbar from '@/components/NavigatorBorderScrollbar-fixed'
import { useGatsbyUIStore } from '@/store/gatsby-ui-store'
import { extendedGatsbyTheme } from '@/theme/gatsby-theme'
import { getArticleAvatar } from '@/utils/articleImages'

// Types pour les données (exactement comme dans Gatsby)
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

interface GatsbyLayoutNewProps {
  children?: ReactNode
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

// Styles globaux reproduisant Gatsby
const globalStyles = (
  <GlobalStyles
    styles={{
      // Reset et base comme dans Gatsby
      '*': {
        boxSizing: 'border-box'
      },
      '.is-aside': {
        '& .navigator': {
          left: 'var(--info-width) !important',
          width: 'calc(100% - var(--info-width) - var(--actions-width)) !important'
        }
      },
      // Classes d'état pour les animations Navigator (reproduction exacte)
      '.is-featured': {
        '& .navigator': {
          left: '0 !important',
          transform: 'translateX(0) !important',
          width: 'calc(100% - var(--actions-width)) !important'
        }
      },
      
      // Nouveau mode 3 colonnes (identique à is-aside pour l'affichage)
      '.is-three-columns': {
        '& .navigator': {
          left: 'var(--info-width) !important',
          width: 'calc(100% - var(--info-width) - var(--actions-width)) !important'
        }
      },
      
      '.moving-aside, .moving-featured': {
        '& .navigator': {
          transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1) !important'
        }
      },
      
      // Variables CSS pour les dimensions Gatsby
      ':root': {
        '--accent-color': '#709425',
        '--actions-width': '64px',
        '--info-width': '320px',
        '--lines-color': '#e0e0e0',
        '--lines-margin': '20px', // Marge pour les barres de séparation
        '--navigator-closed-height': '80px',
        '--text-color': '#333333'
      },
      
      // Medium/Small screens: moins de 1024px = 2 barres horizontales (zoom 175%+)
      '@media (max-width: 1023px)': {
        '.is-aside .navigator, .is-featured .navigator, .is-three-columns .navigator': {
          bottom: '64px !important', // Espace pour ActionsBar en bas (restaurée)
          left: '0 !important',
          right: '0 !important',
          top: '72px !important', // Espace pour InfoBar en haut (hauteur augmentée)
          width: '100% !important'
        },
        // Passage en mode horizontal : InfoBar visible, InfoBox masquée
        ':root': {
          '--actions-width': '0px',
          '--info-width': '0px'
        }
      },
      
      // Responsive comme dans Gatsby - Breakpoints exacts
      // Large screens: 1024px+ = Full 3-column layout (vertical)
      '@media (min-width: 1024px)': {
        '.is-aside .navigator, .is-featured .navigator, .is-three-columns .navigator': {
          left: 'var(--info-width) !important',
          width: 'calc(100% - var(--info-width) - var(--actions-width)) !important'
        }
      },
      
      body: {
        backgroundColor: '#ffffff',
        color: '#333333',
        fontFamily: '"Open Sans", Arial, sans-serif',
        margin: 0,
        overflow: 'hidden', // Important pour la structure fixe
        padding: 0
      },
      
      html: {
        fontSize: '16px',
        lineHeight: 1.6
      }
    }}
  />
)

export default function GatsbyLayoutNew({ 
  children, 
  pages = [], 
  parts = [], 
  posts = [],
  seo 
}: GatsbyLayoutNewProps) {
  const { fontSizeIncrease } = useGatsbyUIStore()
  const navigatorRef = React.useRef<HTMLDivElement>(null)
  
  // Extraire les catégories des posts pour alimenter l'ActionsBar
  const categories = React.useMemo(() => {
    return posts.reduce((list: string[], post) => {
      if (post.category && !list.includes(post.category)) return list.concat(post.category)
      return list
    }, [])
  }, [posts])
   
  return (
    <ThemeProvider theme={extendedGatsbyTheme}>
      <CssBaseline />
      {globalStyles}
      
      {/* SEO Head */}
      {seo && (
        <head>
          <title>{seo.title}</title>
          {seo.description && <meta name="description" content={seo.description} />}
          {seo.image && <meta property="og:image" content={seo.image} />}
          {seo.url && <meta property="og:url" content={seo.url} />}
        </head>
      )}
      
      {/* Layout Wrapper avec gestion des états */}
      <LayoutWrapper>
        {/* InfoBar - Barre mobile (visible sur mobile/tablet uniquement) */}
        <InfoBar pages={pages} />
        
        {/* InfoBox - Sidebar gauche (320px, desktop only) */}
        <InfoBox 
          pages={pages}
          parts={parts}
          posts={posts.map(post => ({
            category: post.category || undefined,
            cover: post.cover || undefined,
            date: post.date,
            excerpt: post.excerpt,
            id: post.slug,
            slug: post.slug,
            subtitle: post.subTitle,
            title: post.title
          }))}
        />
        
        {/* Navigator - Liste d'articles (position flexible selon l'état) */}
        <Box
          ref={navigatorRef}
          className="navigator"
          sx={{
            '&::-webkit-scrollbar': {
              display: 'none'
            },
            // Barre de séparation droite (vers ActionsBar)
            '&::after': {
              borderRight: '1px solid var(--lines-color, #e0e0e0)',
              bottom: '20px',
              content: '""',
              position: 'absolute',
              right: 0,
              top: '20px',
              width: '1px'
            },
            // Medium/Small screens: moins de 1024px = Pleine largeur entre barres horizontales (zoom 175%+)
            '@media (max-width: 1023px)': {
              bottom: '64px !important', // Espace pour ActionsBar en bas (restaurée)
              left: '0 !important',
              right: '0 !important',
              top: '72px !important' // Espace pour InfoBar en haut (hauteur augmentée)
            },
            // Large screens: 1024px+ = Position entre InfoBox et ActionsBar (vertical)
            '@media (min-width: 1024px)': {
              bottom: '0 !important',
              left: '320px !important',
              right: '64px !important',
              top: '0 !important'
            },
            backgroundColor: '#ffffff',
            bottom: 0,
            left: '320px',
            overflowX: 'hidden',
            overflowY: 'auto',
            position: 'fixed',
            right: '64px',
            // Masquer SEULEMENT la scrollbar native du Navigator
            scrollbarWidth: 'none',
            top: 0
          }}
        >
          <Box sx={{ padding: '40px 40px 40px 40px' }}>
              {posts.map((post, index) => (
              <Link
                key={post.slug}
                href={`/posts/${post.slug}`}
                style={{ textDecoration: 'none' }}
              >
                <Box
                  sx={{
                    alignItems: 'flex-start',
                    cursor: 'pointer',
                    display: 'flex',
                    padding: '15px 0'
                  }}
                >
                  <Box
                    sx={{
                      // Hover effects organiques comme NavigatorItem
                      '&:hover': {
                        border: '1px solid #ccc',    // Bordure légèrement plus foncée
                        borderRadius: '65% 75%', // Inversion du borderRadius
                        transform: 'scale(1.05)'   // Scaling subtil
                      },
                      alignItems: 'center',
                      background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
                      border: '1px solid #ddd', // Bordure fine comme NavigatorItem
                      borderRadius: '75% 65%', // Forme organique comme NavigatorItem
                      cursor: 'pointer',
                      display: 'flex',
                      flexShrink: 0,
                      // Tailles responsives exactes comme NavigatorItem
                      height: {
                        lg: '90px',       // Large (1200px+)
                        md: '80px',      // Desktop (900-1200px)
                        sm: '60px',      // Tablet (600-900px)
                        xs: '30px'      // Mobile (moins de 600px)
                      },
                      justifyContent: 'center',
                      marginRight: '20px',
                      overflow: 'hidden',
                      // Animation au hover comme NavigatorItem
                      transition: {
                        sm: '0.5s ease-out',  // Desktop : transition plus lente
                        xs: '0.3s ease-out' // Mobile : transition plus rapide
                      },
                      width: {
                        lg: '90px',       // Large (1200px+)
                        md: '80px',      // Desktop (900-1200px)
                        sm: '60px',      // Tablet (600-900px)
                        xs: '30px'      // Mobile (moins de 600px)
                      }
                    }}
                  >
                    <img 
                      src={getArticleAvatar(post.slug, post.category, post.title, index)}
                      alt={`Illustration pour ${post.title}`}
                      style={{
                        borderRadius: 'inherit', // Hérite du borderRadius du parent
                        height: '100%',
                        objectFit: 'cover',
                        // Même transition que le parent
                        transition: 'inherit',
                        width: '100%'
                      }}
                      onError={(e) => {
                        // Fallback vers un pattern SVG en cas d'erreur de chargement
                        const target = e.target as HTMLImageElement
                        target.src = getArticleAvatar(post.slug, post.category, post.title, index, true)
                      }}
                    />
                  </Box>

                  <Box sx={{ flexGrow: 1 }}>
                    <Typography
                      className="post-list-title"
                      sx={{
                        color: 'rgb(85, 85, 85)',
                        fontFamily: '"Open Sans"',
                        fontSize: '27px',
                        fontWeight: 600,
                        letterSpacing: '-0.04em',
                        lineHeight: '31px',
                        marginBottom: '6px'
                      }}
                    >
                      {post.title}
                    </Typography>
                    
                    <Typography
                      component="h2"
                      className="blog-subtitle article-subtitle post-subtitle"
                      sx={{
                        '&:hover': {
                          color: 'rgb(112, 148, 37) !important'
                        },
                        color: 'rgb(85, 85, 85) !important',
                        cursor: 'pointer',
                        fontFamily: '"Open Sans" !important',
                        fontSize: '23px !important',
                        fontStyle: 'normal !important',
                        fontWeight: '300 !important',
                        lineHeight: '27px !important',
                        marginBottom: '8px'
                      }}
                    >
                      {post.excerpt}
                    </Typography>
                    
                    {/* Date masquée sur la page d'accueil comme demandé */}
                    {/* <Typography
                      sx={{
                        fontSize: '0.75rem',
                        color: '#888888',
                        fontFamily: '"Open Sans", Arial, sans-serif'
                      }}
                    >
                      {new Date(post.date).toLocaleDateString('fr-FR', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </Typography> */}
                  </Box>
                </Box>
              </Link>
            ))}
            
            {/* Contenu de test pour voir la barre de défilement */}
            <Box sx={{ padding: '20px 0' }}>
              <Typography variant="h6" sx={{ color: '#666', marginBottom: '20px' }}>
                📍 Contenu de test pour la barre de défilement
              </Typography>
              {Array.from({ length: 15 }, (_, i) => (
                <Box
                  key={`test-scroll-${i}`}
                  sx={{
                    backgroundColor: '#f9f9f9',
                    border: '1px solid #eee',
                    borderRadius: '4px',
                    marginBottom: '10px',
                    padding: '20px'
                  }}
                >
                  <Typography sx={{ fontSize: '16px', marginBottom: '8px' }}>
                    📝 Article de test #{i + 1}
                  </Typography>
                  <Typography sx={{ color: '#666', fontSize: '14px' }}>
                    Ceci est du contenu de test pour forcer le défilement vertical et voir apparaître la barre de défilement personnalisée. La barre devrait être visible sur le côté droit avec un style gris.
                  </Typography>
                </Box>
              ))}
            </Box>
          </Box>
        </Box>
        
        {/* Barre de défilement auto-hide sur la ligne de démarcation */}
        <NavigatorBorderScrollbar targetElementRef={navigatorRef} />
        
        {/* ActionsBar - Barre d'actions droite (64px, desktop only) */}
        <ActionsBar categories={categories} />
        
        {/* Zone de contenu principal (pour les pages post/page individuelles) */}
        {children && (
          <div 
            className="main-content"
            style={{ 
              backgroundColor: '#ffffff',
              bottom: 0,
              fontSize: `${fontSizeIncrease}rem`,
              left: '320px',
              msOverflowStyle: 'none',
              overflowX: 'hidden',
              overflowY: 'auto',
              padding: '40px',
              position: 'fixed',
              right: '64px',
              // Masquage complet de la barre de défilement comme Gatsby original
              scrollbarWidth: 'none',
              
              top: 0,
              zIndex: 100 // Au-dessus du Navigator
            }}
          >
            {children}
          </div>
        )}
      </LayoutWrapper>
    </ThemeProvider>
  )
}
