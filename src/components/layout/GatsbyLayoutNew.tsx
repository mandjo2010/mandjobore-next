/**
 * GatsbyLayoutNew - Layout complet reproduisant fidèlement le starter Gatsby
 * Structure exacte: InfoBox (320px) | Navigator (flexible) | ActionsBar (64px)
 */
'use client'

import React, { ReactNode } from 'react'
import { ThemeProvider, CssBaseline, GlobalStyles, Box, Typography } from '@mui/material'
import Link from 'next/link'
import { extendedGatsbyTheme } from '@/theme/gatsby-theme'
import { useGatsbyUIStore } from '@/store/gatsby-ui-store'
import LayoutWrapper from '@/components/LayoutWrapper/LayoutWrapper'

// Import des composants fidèles
import InfoBox from '@/components/InfoBox/InfoBox'
import GatsbyActionsBar from '@/components/ActionsBar/GatsbyActionsBar'

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
      html: {
        fontSize: '16px',
        lineHeight: 1.6
      },
      body: {
        fontFamily: '"Open Sans", Arial, sans-serif',
        margin: 0,
        padding: 0,
        backgroundColor: '#ffffff',
        color: '#333333',
        overflow: 'hidden' // Important pour la structure fixe
      },
      
      // Variables CSS pour les dimensions Gatsby
      ':root': {
        '--info-width': '320px',
        '--actions-width': '64px',
        '--navigator-closed-height': '80px',
        '--accent-color': '#709425',
        '--text-color': '#333333',
        '--lines-color': '#e0e0e0'
      },
      
      // Classes d'état pour les animations Navigator (reproduction exacte)
      '.is-featured': {
        '& .navigator': {
          transform: 'translateX(0) !important',
          left: '0 !important',
          width: 'calc(100% - var(--actions-width)) !important'
        }
      },
      
      '.is-aside': {
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
      
      // Responsive comme dans Gatsby
      '@media (max-width: 1023px)': {
        '.is-aside .navigator, .is-featured .navigator': {
          left: '0 !important',
          width: '100% !important'
        }
      }
    }}
  />
)

export default function GatsbyLayoutNew({ 
  children, 
  posts = [], 
  pages = [], 
  parts = [],
  seo 
}: GatsbyLayoutNewProps) {
  const { fontSizeIncrease } = useGatsbyUIStore()
  // const fontSizeIncrease = 1 // Valeur fixe temporaire
  
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
        {/* InfoBox - Sidebar gauche (320px, desktop only) */}
        <InfoBox 
          pages={pages}
          parts={parts}
        />
        
        {/* Navigator - Liste d'articles (position flexible selon l'état) */}
        <Box
          className="navigator"
          sx={{
            position: 'fixed',
            top: 0,
            left: '320px',
            right: '64px',
            bottom: 0,
            backgroundColor: '#ffffff',
            borderRight: '1px solid #eeeeee',
            overflow: 'hidden',
            '@media (max-width: 1023px)': {
              left: 0,
              right: 0
            }
          }}
        >
          <Box
            sx={{
              padding: '40px 40px 20px 40px',
              borderBottom: '1px solid #eeeeee'
            }}
          >
            <Typography
              variant="h1"
              sx={{
                fontSize: '1.8rem',
                fontWeight: 600,
                color: '#333333',
                fontFamily: '"Open Sans", Arial, sans-serif'
              }}
            >
              Latest Posts
            </Typography>
          </Box>

          <Box
            sx={{
              height: 'calc(100% - 120px)',
              overflowY: 'auto',
              padding: '0 40px 40px 40px'
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
                    display: 'flex',
                    alignItems: 'flex-start',
                    padding: '30px 0',
                    borderBottom: index < posts.length - 1 ? '1px solid #eeeeee' : 'none',
                    cursor: 'pointer',
                    '&:hover': {
                      backgroundColor: '#fafafa'
                    }
                  }}
                >
                  <Box
                    sx={{
                      width: '60px',
                      height: '60px',
                      borderRadius: '50%',
                      backgroundColor: '#f5f5f5',
                      marginRight: '20px',
                      flexShrink: 0,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      border: '2px solid #eeeeee'
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: '1.2rem',
                        fontWeight: 600,
                        color: '#888888'
                      }}
                    >
                      {post.title.charAt(0).toUpperCase()}
                    </Typography>
                  </Box>

                  <Box sx={{ flexGrow: 1 }}>
                    <Typography
                      sx={{
                        fontSize: '1.1rem',
                        fontWeight: 600,
                        color: '#333333',
                        fontFamily: '"Open Sans", Arial, sans-serif',
                        lineHeight: '1.3',
                        marginBottom: '6px'
                      }}
                    >
                      {post.title}
                    </Typography>
                    
                    <Typography
                      sx={{
                        fontSize: '0.85rem',
                        color: '#555555',
                        fontFamily: '"Open Sans", Arial, sans-serif',
                        lineHeight: '1.5',
                        marginBottom: '8px'
                      }}
                    >
                      {post.excerpt}
                    </Typography>
                    
                    <Typography
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
                    </Typography>
                  </Box>
                </Box>
              </Link>
            ))}
          </Box>
        </Box>
        
        {/* ActionsBar - Barre d'actions droite (64px, desktop only) */}
        <GatsbyActionsBar />
        
        {/* Zone de contenu principal (pour les pages post/page individuelles) */}
        {children && (
          <div 
            style={{ 
              position: 'fixed',
              top: 0,
              left: '320px',
              right: '64px',
              bottom: 0,
              backgroundColor: '#ffffff',
              padding: '40px',
              overflowY: 'auto',
              fontSize: `${fontSizeIncrease}rem`,
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
