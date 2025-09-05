/**
 * Navigator - Reproduction fidèle de la liste d'articles de Gatsby
 * Correspondance exacte avec src/components/Navigator/Navigator.js
 */
'use client'

import { Box, Typography, styled } from '@mui/material'
import Link from 'next/link'
import React from 'react'

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
  '&.is-aside': {
    left: '320px',
    right: '64px',
    transform: 'translateX(0)'
  },
  // États du navigator
  '&.is-featured': {
    left: 0,
    right: '64px'
  },
  // Responsive - pleine largeur sur mobile
  '@media (max-width: 1023px)': {
    left: 0,
    right: 0
  },
  backgroundColor: '#ffffff',
  borderRight: '1px solid #eeeeee',
  bottom: 0,
  left: '320px', // Après InfoBox
  overflow: 'hidden',
  
  position: 'fixed',
  right: '64px', // Avant ActionsBar  
  
  top: 0,
  
  transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
  
  // Animations de position comme dans Gatsby
  willChange: 'transform, width'
})

const NavigatorInner = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  height: '100%'
})

export default function NavigatorNew({ className, posts = [] }: NavigatorProps) {
  const { categoryFilter, navigatorPosition, navigatorShape } = useGatsbyUIStore()
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
            borderBottom: '1px solid #eeeeee',
            padding: '40px 40px 20px 40px'
          }}
        >
          <Typography
            variant="h1"
            sx={{
              color: '#333333',
              fontFamily: '"Open Sans", Arial, sans-serif',
              fontSize: '1.8rem',
              fontWeight: 600
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
                  alignItems: 'flex-start',
                  borderBottom: index < filteredPosts.length - 1 ? '1px solid #eeeeee' : 'none',
                  cursor: 'pointer',
                  display: 'flex',
                  marginBottom: index < filteredPosts.length - 1 ? '24px' : '0',
                  padding: '30px 0'
                }}
              >
                <Box
                  sx={{
                    alignItems: 'center',
                    backgroundColor: '#f5f5f5',
                    border: '2px solid #eeeeee',
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
                  <Typography
                    sx={{
                      color: '#888888',
                      fontSize: '1.2rem',
                      fontWeight: 600
                    }}
                  >
                    {post.title.charAt(0).toUpperCase()}
                  </Typography>
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
                  
                  <Typography
                    sx={{
                      color: '#888888',
                      fontFamily: '"Open Sans", Arial, sans-serif',
                      fontSize: '0.75rem'
                    }}
                  >
                    {new Date(post.date).toLocaleDateString('fr-FR', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric'
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
