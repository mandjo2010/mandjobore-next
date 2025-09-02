/**
 * Navigator - Reproduction fidèle de la liste d'articles de Gatsby
 * Correspondance exacte avec src/components/Navigator/Navigator.js
 */
'use client'

import React from 'react'
import { Box, Typography, styled } from '@mui/material'
import Link from 'next/link'
import { useGatsbyUIStore } from '@/store/gatsby-ui-store'

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

interface NavigatorProps {
  posts: Post[]
  categories: string[]
  className?: string
}

// Container principal du Navigator
const NavigatorContainer = styled(Box)({
  position: 'fixed',
  top: 0,
  left: '320px', // Après InfoBox
  right: '64px', // Avant ActionsBar  
  bottom: 0,
  backgroundColor: '#ffffff',
  borderRight: '1px solid #eeeeee',
  overflow: 'hidden',
  
  // Animations de position comme dans Gatsby
  willChange: 'transform, width',
  transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
  
  // États du navigator
  '&.is-featured': {
    left: 0,
    right: '64px'
  },
  
  '&.is-aside': {
    left: '320px',
    right: '64px',
    transform: 'translateX(0)'
  },
  
  // Responsive - pleine largeur sur mobile
  '@media (max-width: 1023px)': {
    left: 0,
    right: 0
  }
})

const NavigatorInner = styled(Box)({
  height: '100%',
  display: 'flex',
  flexDirection: 'column'
})

export default function NavigatorNew({ posts = [], className }: NavigatorProps) {
  const { navigatorPosition, navigatorShape, categoryFilter } = useGatsbyUIStore()
  // const navigatorPosition = 'is-aside'
  // const navigatorShape = 'open'
  // const categoryFilter = 'all posts'
  
  // Filtrer les posts selon la catégorie sélectionnée
  const filteredPosts = React.useMemo(() => {
    if (categoryFilter === 'all posts' || !categoryFilter) {
      return posts
    }
    return posts.filter(post => post.category === categoryFilter)
  }, [posts, categoryFilter])
  
  // Classes CSS dynamiques comme dans Gatsby
  const containerClasses = [
    navigatorPosition,
    navigatorShape,
    className
  ].filter(Boolean).join(' ')
  
  return (
    <NavigatorContainer className={containerClasses}>
      <NavigatorInner>
        {/* Header avec titre */}
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

        {/* Liste des articles */}
        <Box
          sx={{
            height: 'calc(100% - 120px)',
            overflowY: 'auto',
            padding: '0 40px 40px 40px'
          }}
        >
          {filteredPosts.map((post, index) => (
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
                  borderBottom: index < filteredPosts.length - 1 ? '1px solid #eeeeee' : 'none',
                  cursor: 'pointer'
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
                    component="h2"
                    className="blog-subtitle article-subtitle post-subtitle"
                    sx={{
                      fontFamily: '"Open Sans" !important',
                      fontSize: '23px !important',
                      fontWeight: '300 !important',
                      lineHeight: '27px !important',
                      color: 'rgb(85, 85, 85) !important',
                      fontStyle: 'normal !important',
                      marginBottom: '8px',
                      cursor: 'pointer',
                      '&:hover': {
                        color: 'rgb(112, 148, 37) !important'
                      }
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
      </NavigatorInner>
    </NavigatorContainer>
  )
}
