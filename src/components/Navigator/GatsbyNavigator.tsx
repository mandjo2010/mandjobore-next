/**
 * Navigator - Liste d'articles reproduisant le design Gatsby original
 * Simplifié pour correspondre pixel-perfect à l'original
 */
'use client'

import { Box, Typography } from '@mui/material'
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

export default function GatsbyNavigator({ categories: _categories, className, posts }: NavigatorProps) {
  const { categoryFilter, navigatorPosition } = useGatsbyUIStore()

  // Filtrer les posts selon la catégorie sélectionnée
  const filteredPosts = React.useMemo(() => {
    if (categoryFilter === 'all posts' || !categoryFilter) {
      return posts
    }
    return posts.filter(post => post.category === categoryFilter)
  }, [posts, categoryFilter])

  return (
    <Box
      className={`navigator ${className} ${navigatorPosition}`}
      sx={{
        backgroundColor: '#ffffff',
        borderRight: '1px solid #eeeeee',
        bottom: 0,
        left: '320px', // Après InfoBox
        overflow: 'hidden',
        position: 'fixed',
        right: '64px', // Avant ActionsBar
        top: 0,
        
        // Animations de position comme dans Gatsby
        transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
        
        // États du navigator selon le store
        ...(navigatorPosition === 'is-featured' && {
          left: 0,
          right: '64px'
        }),
        
        ...(navigatorPosition === 'is-aside' && {
          left: '320px',
          right: '64px'
        }),
        
        // Responsive - pleine largeur sur mobile
        '@media (max-width: 1023px)': {
          left: 0,
          right: 0
        }
      }}
    >
      {/* Header avec titre */}
      <Box
        sx={{
          backgroundColor: '#ffffff',
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
            fontWeight: 600,
            letterSpacing: '-0.02em'
          }}
        >
          Latest Posts
        </Typography>
        
        {categoryFilter && categoryFilter !== 'all posts' && (
          <Typography
            sx={{
              color: '#888888',
              fontFamily: '"Open Sans", Arial, sans-serif',
              fontSize: '0.9rem',
              marginTop: '8px'
            }}
          >
            Category: {categoryFilter}
          </Typography>
        )}
      </Box>

      {/* Liste des articles */}
      <Box
        sx={{
          // Scrollbar style Gatsby
          '&::-webkit-scrollbar': {
            width: '6px'
          },
          '&::-webkit-scrollbar-thumb': {
            '&:hover': {
              background: '#aaaaaa'
            },
            background: '#cccccc',
            borderRadius: '3px'
          },
          '&::-webkit-scrollbar-track': {
            background: 'transparent'
          },
          
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
                '&:hover': {
                  '& .post-title': {
                    color: '#709425'
                  }
                },
                alignItems: 'flex-start',
                borderBottom: index < filteredPosts.length - 1 ? '1px solid #eeeeee' : 'none',
                cursor: 'pointer',
                display: 'flex',
                padding: '30px 0'
              }}
            >
              {/* Vignette */}
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
                  width: '60px'
                }}
              >
                {post.cover ? (
                  <img
                    src={post.cover}
                    alt={post.title}
                    style={{
                      borderRadius: '50%',
                      height: '100%',
                      objectFit: 'cover',
                      width: '100%'
                    }}
                  />
                ) : (
                  <Typography
                    sx={{
                      color: '#888888',
                      fontSize: '1.2rem',
                      fontWeight: 600
                    }}
                  >
                    {post.title.charAt(0).toUpperCase()}
                  </Typography>
                )}
              </Box>

              {/* Contenu de l'article */}
              <Box sx={{ flexGrow: 1 }}>
                <Typography
                  className="post-title"
                  sx={{
                    color: '#333333',
                    fontFamily: '"Open Sans", Arial, sans-serif',
                    fontSize: '1.1rem',
                    fontWeight: 600,
                    lineHeight: '1.3',
                    marginBottom: '6px',
                    transition: 'color 0.2s ease'
                  }}
                >
                  {post.title}
                </Typography>
                
                {post.subTitle && (
                  <Typography
                    sx={{
                      color: 'rgb(85, 85, 85) !important',
                      fontFamily: '"Open Sans" !important',
                      fontSize: '23px !important',
                      fontWeight: '300 !important',
                      lineHeight: '27px !important',
                      marginBottom: '8px',
                      display: '-webkit-box',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      WebkitBoxOrient: 'vertical',
                      WebkitLineClamp: 2,
                    }}
                  >
                    {post.subTitle}
                  </Typography>
                )}
                
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
                
                <Box
                  sx={{
                    alignItems: 'center',
                    display: 'flex',
                    justifyContent: 'space-between'
                  }}
                >
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
                  
                  {post.category && (
                    <Typography
                      sx={{
                        backgroundColor: '#f0f8e0',
                        borderRadius: '12px',
                        color: '#709425',
                        fontFamily: '"Open Sans", Arial, sans-serif',
                        fontSize: '0.75rem',
                        padding: '2px 8px'
                      }}
                    >
                      {post.category}
                    </Typography>
                  )}
                </Box>
              </Box>
            </Box>
          </Link>
        ))}
        
        {filteredPosts.length === 0 && (
          <Box
            sx={{
              color: '#888888',
              padding: '60px 0',
              textAlign: 'center'
            }}
          >
            <Typography
              sx={{
                fontFamily: '"Open Sans", Arial, sans-serif',
                fontSize: '1rem'
              }}
            >
              No posts found for this category.
            </Typography>
          </Box>
        )}
      </Box>
    </Box>
  )
}

// End of file
