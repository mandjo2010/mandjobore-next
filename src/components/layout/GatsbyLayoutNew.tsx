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
import ActionsBar from '@/components/layout/ActionsBar'
import LayoutWrapper from '@/components/LayoutWrapper'
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
        '--navigator-closed-height': '80px',
        '--text-color': '#333333'
      },
      
      // Responsive comme dans Gatsby
      '@media (max-width: 1023px)': {
        '.is-aside .navigator, .is-featured .navigator': {
          left: '0 !important',
          width: '100% !important'
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
  // const fontSizeIncrease = 1 // Valeur fixe temporaire
  
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
          className="navigator"
          sx={{
            '@media (max-width: 1023px)': {
              left: 0,
              right: 0
            },
            backgroundColor: '#ffffff',
            bottom: 0,
            left: '320px',
            // Pas de borderRight pour laisser la ligne de l'ActionsBar être visible
            overflow: 'hidden',
            position: 'fixed',
            right: '64px',
            top: 0
          }}
        >
          <Box
            sx={{
              '&::-webkit-scrollbar': {
                background: 'transparent',
                display: 'none',
                height: 0,
                width: 0
              },
              height: '100%',
              msOverflowStyle: 'none',
              overflowX: 'hidden',
              
              overflowY: 'auto',
              padding: '40px 40px 40px 40px',
              // Masquage complet de la barre de défilement comme Gatsby original
              scrollbarWidth: 'none'
            }}
          >
            {posts.map((post, index) => (
              <Link
                key={post.slug}
                href={`/posts/${post.slug}`}
                style={{ textDecoration: 'none' }}
              >
                <Box
                  sx={{
                    '&:hover': {
                      backgroundColor: '#fafafa'
                    },
                    alignItems: 'flex-start',
                    borderBottom: index < posts.length - 1 ? '1px solid #e0e0e0' : 'none',
                    cursor: 'pointer',
                    display: 'flex',
                    padding: '30px 0'
                  }}
                >
                  <Box
                    sx={{
                      alignItems: 'center',
                      background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
                      border: '2px solid #e0e0e0',
                      borderRadius: '50%',
                      display: 'flex',
                      flexShrink: 0,
                      height: '60px',
                      justifyContent: 'center',
                      marginRight: '20px',
                      overflow: 'hidden',
                      width: '60px'
                    }}
                  >
                    <img 
                      src={getArticleAvatar(post.slug, post.category, post.title, index)}
                      alt={`Illustration pour ${post.title}`}
                      style={{
                        borderRadius: '50%',
                        height: '100%',
                        objectFit: 'cover',
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
                      sx={{
                        color: '#333333',
                        fontFamily: '"Open Sans", Arial, sans-serif',
                        fontSize: '1.1rem',
                        fontWeight: 600,
                        lineHeight: '1.3',
                        marginBottom: '6px'
                      }}
                    >
                      {post.title}
                    </Typography>
                    
                    <Typography
                      sx={{
                        color: '#555555',
                        fontFamily: '"Open Sans", Arial, sans-serif',
                        fontSize: '0.85rem',
                        lineHeight: '1.5',
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
          </Box>
        </Box>
        
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
