/**
 * PostsList - Composant reproduisant la liste des posts dans la sidebar
 * Basé sur src/components/Navigator/List.js du starter Gatsby original
 */
'use client'

import { ExpandMore } from '@mui/icons-material'
import { Box, Typography, List, ListItem, ListItemButton, Avatar, IconButton } from '@mui/material'
import Link from 'next/link'
import React from 'react'

import { useGatsbyUIStore } from '@/store/gatsby-ui-store'

interface Post {
  id: string
  slug: string
  title: string
  subtitle?: string
  excerpt?: string
  cover?: string
  date: string
  category?: string
}

interface PostsListProps {
  posts: Post[]
}

export default function PostsList({ posts }: PostsListProps) {
  const { 
    categoryFilter, 
    moveNavigatorAside, 
    navigatorPosition,
    navigatorShape,
    setNavigatorShape 
  } = useGatsbyUIStore()

  const linkOnClick = () => {
    moveNavigatorAside() // Navigation vers un article
  }

  const expandOnClick = () => {
    setNavigatorShape('open')
  }

  // Filtrage des posts par catégorie (reproduit l'ancien comportement)
  const filteredPosts = categoryFilter === 'all posts' 
    ? posts 
    : posts.filter(post => post.category === categoryFilter)

  return (
    <Box
      sx={{
        '& .moving-featured, & .is-aside': {
          '& .post-image': {
            height: '30px !important',
            width: '30px !important',
          },
          '& .post-subtitle': {
            display: 'none',
          },
          '& .post-title': {
            fontSize: '1em !important',
            fontWeight: 400,
          }
        },
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        p: 2,
        width: '100%'
      }}
      className={`${navigatorPosition} ${navigatorShape}`}
    >
      {/* Header avec bouton expand (reproduit ListHeader.js) */}
      <Box
        sx={{
          alignItems: 'center',
          borderBottom: '1px solid #eeeeee',
          display: 'flex',
          justifyContent: 'space-between',
          mb: 2,
          pb: 1
        }}
      >
        <Typography
          variant="overline"
          sx={{
            fontSize: '0.75em',
            fontWeight: 600,
            letterSpacing: '0.3em',
            textTransform: 'uppercase'
          }}
        >
          Latest Posts
        </Typography>
        
        {navigatorShape === 'closed' && (
          <IconButton
            onClick={expandOnClick}
            aria-label="Expand the list"
            size="small"
            sx={{
              color: 'text.secondary',
              '&:hover': { color: 'primary.main' },
            }}
          >
            <ExpandMore titleAccess="Expand the list" />
          </IconButton>
        )}
      </Box>

      {/* Liste des posts reproduisant ListItem.js */}
      <List
        sx={{
          '& .MuiListItem-root': {
            mb: 1.5,
            p: 0,
          },
          flexGrow: 1,
          overflow: 'auto',
          p: 0
        }}
      >
        {filteredPosts.slice(0, 10).map((post) => (
          <ListItem key={post.id}>
            <Link
              href={post.slug}
              onClick={linkOnClick}
              style={{
                color: 'inherit',
                display: 'block',
                textDecoration: 'none',
                width: '100%'
              }}
            >
              <ListItemButton
                sx={{
                  '&:hover': {
                    backgroundColor: 'rgba(0, 0, 0, 0.04)',
                    // Animation hover exacte Gatsby v1 : inversion borderRadius
                    '& .post-image': {
                      borderRadius: '65% 75% !important'
                    }
                  },
                  alignItems: 'flex-start',
                  borderRadius: 1,
                  flexDirection: 'row',
                  gap: 1.5,
                  p: 1
                }}
              >
                {/* Image de l'article (reproduit listItemPointer) */}
                {post.cover && (
                  <Avatar
                    src={post.cover}
                    alt=""
                    className="post-image"
                    sx={{
                      // Breakpoints exacts Gatsby v1
                      '@media (min-width: 600px)': { // theme.mediaQueryTresholds.M
                        height: 80,
                        width: 80,
                      },
                      '@media (min-width: 1024px)': { // theme.mediaQueryTresholds.L
                        height: 90,
                        transition: 'all 0.3s ease', // Plus rapide sur desktop
                        width: 90,
                      },
                      border: '1px solid #ddd', // Bordure grise fine comme l'original
                      borderRadius: '75% 65%', // Forme par défaut Gatsby v1
                      flexShrink: 0,
                      height: 60, // Base mobile Gatsby v1
                      overflow: 'hidden',
                      position: 'relative',
                      transition: 'all 0.5s ease', // Transition lente comme Gatsby v1
                      width: 60
                    }}
                  />
                )}

                {/* Texte de l'article (reproduit listItemText) */}
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    flexGrow: 1,
                    minWidth: 0
                  }}
                >
                  <Typography
                    className="post-title post-list-title"
                    component="h3"
                    sx={{
                      color: 'rgb(85, 85, 85)',
                      fontFamily: '"Open Sans"',
                      fontSize: '27px',
                      fontWeight: 600,
                      letterSpacing: '-0.04em',
                      lineHeight: '31px',
                      m: 0,
                      display: '-webkit-box',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      WebkitBoxOrient: 'vertical',
                      WebkitLineClamp: 2
                    }}
                  >
                    {post.title}
                  </Typography>
                  
                  {post.subtitle && (
                    <Typography
                      variant="body2"
                      sx={{
                        color: 'rgb(85, 85, 85) !important', // Exact selon styles.txt
                        display: '-webkit-box',
                        fontFamily: '"Open Sans" !important', // Exact selon styles.txt
                        fontSize: '23px !important', // Exact selon styles.txt
                        fontWeight: '300 !important', // Exact selon styles.txt
                        lineHeight: '27px !important', // Exact selon styles.txt
                        mt: 0.3,
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        WebkitBoxOrient: 'vertical',
                        WebkitLineClamp: 1
                      }}
                    >
                      {post.subtitle}
                    </Typography>
                  )}
                </Box>
              </ListItemButton>
            </Link>
          </ListItem>
        ))}
      </List>

      {/* Indication de filtrage par catégorie */}
      {categoryFilter !== 'all posts' && (
        <Box
          sx={{
            borderTop: '1px solid #eeeeee',
            mt: 2,
            pt: 2,
            textAlign: 'center'
          }}
        >
          <Typography variant="caption" color="text.secondary">
            Filtered by: {categoryFilter}
          </Typography>
        </Box>
      )}
    </Box>
  )
}
