/**
 * PostsList - Composant reproduisant la liste des posts dans la sidebar
 * Basé sur src/components/Navigator/List.js du starter Gatsby original
 */
'use client'

import { ExpandMore } from '@mui/icons-material'
import { Box, Typography, List, ListItem, ListItemButton, Avatar, IconButton } from '@mui/material'
import React from 'react'

import { useArticleNavigation } from '@/hooks/useArticleNavigation'
import { useGatsbyUIStore } from '@/store/gatsby-ui-store'
import { getArticleAvatar } from '@/utils/articleImages'

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
  hideHeader?: boolean // Nouveau: permet de masquer l'en-tête
}

export default function PostsList({ hideHeader = false, posts }: PostsListProps) {
  const { navigateToArticle } = useArticleNavigation()
  const { 
    categoryFilter, 
    navigatorPosition,
    navigatorShape,
    setNavigatorShape 
  } = useGatsbyUIStore()

  // Debug : vérifier que les posts arrivent bien
  console.log('PostsList - posts reçus:', posts.length, posts)

  const linkOnClick = (slug: string) => {
    navigateToArticle(slug) // Utilise la navigation avec animations
  }

  const expandOnClick = () => {
    setNavigatorShape('open')
  }

  // Filtrage des posts par catégorie (reproduit l'ancien comportement)
  const filteredPosts = categoryFilter === 'all posts' 
    ? posts 
    : posts.filter(post => post.category === categoryFilter)

  console.log('PostsList - posts filtrés:', filteredPosts.length, filteredPosts)

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
            color: 'rgb(85, 85, 85) !important',
            fontFamily: '"Open Sans" !important',
            fontSize: '16px !important',
            fontStyle: 'normal !important',
            fontWeight: '400 !important',
            lineHeight: '18px !important'
          }
        },
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        p: 0, // Supprime le padding pour utiliser toute la largeur
        width: '100%'
      }}
      className={`${navigatorPosition} ${navigatorShape}`}
    >
      {/* Header avec bouton expand (reproduit ListHeader.js) */}
      {!hideHeader && (
        <Box
          sx={{
            alignItems: 'center',
            borderBottom: '1px solid #eeeeee',
            display: 'flex',
            justifyContent: 'space-between',
            mb: 2,
            mx: 1.5, // Marges horizontales pour aligner avec le contenu
            pb: 1
          }}
        >
          <Box>
            {categoryFilter === 'all posts' ? (
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
            ) : (
              <Box>
                <Typography
                  variant="overline"
                  sx={{
                    color: 'primary.main',
                    fontSize: '0.65em',
                    fontWeight: 600,
                    letterSpacing: '0.3em',
                    textTransform: 'uppercase'
                  }}
                >
                  Active category filter
                </Typography>
                <Typography
                  variant="h6"
                  sx={{
                    fontSize: '0.85em',
                    fontWeight: 600,
                    letterSpacing: '0.1em',
                    mt: 0.2,
                    textTransform: 'capitalize'
                  }}
                >
                  {categoryFilter}
                </Typography>
                <Typography
                  variant="caption"
                  sx={{
                    color: 'text.secondary',
                    display: 'block',
                    fontSize: '0.7em'
                  }}
                >
                  {filteredPosts.length} article{filteredPosts.length > 1 ? 's' : ''}
                </Typography>
              </Box>
            )}
          </Box>
          
          {navigatorShape === 'closed' && (
            <IconButton
              onClick={expandOnClick}
              aria-label="Expand the list"
              size="small"
              sx={{
                '&:hover': { color: 'primary.main' },
                color: 'text.secondary',
              }}
            >
              <ExpandMore titleAccess="Expand the list" />
            </IconButton>
          )}
        </Box>
      )}

      {/* Liste des posts reproduisant ListItem.js */}
      <List
        sx={{
          '& .MuiListItem-root': {
            mb: 0,
            p: 0,
          },
          '& .MuiListItem-root:not(:last-child)': {
            mb: '0.4em',
          },
          flexGrow: 1,
          overflow: 'auto',
          p: 0
        }}
      >
        {filteredPosts.map((post) => (
          <ListItem key={post.id}>
            <div
              onClick={() => linkOnClick(post.slug)}
              style={{
                color: 'inherit',
                cursor: 'pointer',
                display: 'block',
                textDecoration: 'none',
                width: '100%'
              }}
            >
              <ListItemButton
                sx={{
                  '&:hover': {
                    // Animation hover améliorée pour les vignettes rondes
                    '& .post-image': {
                      boxShadow: '0 4px 16px rgba(244, 67, 54, 0.3)',
                      transform: 'scale(1.05)'
                    },
                    backgroundColor: 'rgba(244, 67, 54, 0.05)'
                  },
                  alignItems: 'flex-start',
                  borderRadius: 1,
                  flexDirection: 'row',
                  gap: '1em',
                  p: '0.5em 0.8em', // Réduit le padding pour optimiser l'espace
                  transition: 'all 0.2s ease',
                  width: '100%' // Assure que le bouton utilise toute la largeur
                }}
              >
                {/* Image de l'article (reproduit listItemPointer) avec getArticleAvatar */}
                <Avatar
                  src={getArticleAvatar(post.category || '', post.cover || '')}
                  alt={post.title}
                  className="post-image"
                  sx={{
                    // Breakpoints exacts Gatsby v1 - tailles réduites de moitié
                    '@media (min-width: 600px)': { // theme.mediaQueryTresholds.M
                      height: 32.5, // 65/2
                      width: 32.5,
                    },
                    '@media (min-width: 1024px)': { // theme.mediaQueryTresholds.L
                      height: 37.5, // 75/2
                      transition: 'all 0.3s ease', // Plus rapide sur desktop
                      width: 37.5,
                    },
                    border: '2px solid #ffffff', // Bordure blanche pour ressortir
                    borderRadius: '50%', // Forme ronde comme demandé
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)', // Ombre pour profondeur
                    flexShrink: 0,
                    height: 25, // Base mobile Gatsby v1 - 50/2
                    objectFit: 'cover',
                    objectPosition: 'center',
                    overflow: 'hidden',
                    position: 'relative',
                    transition: 'all 0.3s ease', // Transition plus rapide
                    width: 50
                  }}
                >
                  {/* Fallback avec première lettre du titre */}
                  {post.title.charAt(0).toUpperCase()}
                </Avatar>

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
                      color: 'rgb(85, 85, 85) !important',
                      display: '-webkit-box',
                      fontFamily: '"Open Sans" !important',
                      fontSize: '16px !important', // Nouvelle taille selon spécifications
                      fontStyle: 'normal !important', // Style normal
                      fontWeight: '400 !important', // Poids 400 selon spécifications
                      letterSpacing: '-0.02em',
                      lineHeight: '18px !important', // Hauteur de ligne selon spécifications
                      m: 0,
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      WebkitBoxOrient: 'vertical',
                      WebkitLineClamp: 2 // Max 2 lignes
                    }}
                  >
                    {post.title}
                  </Typography>
                </Box>
              </ListItemButton>
            </div>
          </ListItem>
        ))}
      </List>

      {/* Indication de filtrage par catégorie */}
      {categoryFilter !== 'all posts' && (
        <Box
          sx={{
            borderTop: '1px solid #eeeeee',
            mt: 2,
            mx: 1.5, // Marges horizontales pour aligner avec le contenu
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
