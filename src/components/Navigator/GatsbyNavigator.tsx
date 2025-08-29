/**
 * Navigator - Liste d'articles reproduisant le design Gatsby original
 * Simplifié pour correspondre pixel-perfect à l'original
 */
'use client'

import React from 'react'
import { Box, Typography } from '@mui/material'
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

export default function GatsbyNavigator({ posts, categories, className }: NavigatorProps) {
  const { navigatorPosition, categoryFilter } = useGatsbyUIStore()

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
        position: 'fixed',
        top: 0,
        left: '320px', // Après InfoBox
        right: '64px', // Avant ActionsBar
        bottom: 0,
        backgroundColor: '#ffffff',
        borderRight: '1px solid #eeeeee',
        overflow: 'hidden',
        
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
          padding: '40px 40px 20px 40px',
          borderBottom: '1px solid #eeeeee',
          backgroundColor: '#ffffff'
        }}
      >
        <Typography
          variant="h1"
          sx={{
            fontSize: '1.8rem',
            fontWeight: 600,
            color: '#333333',
            fontFamily: '"Open Sans", Arial, sans-serif',
            letterSpacing: '-0.02em'
          }}
        >
          Latest Posts
        </Typography>
        
        {categoryFilter && categoryFilter !== 'all posts' && (
          <Typography
            sx={{
              fontSize: '0.9rem',
              color: '#888888',
              marginTop: '8px',
              fontFamily: '"Open Sans", Arial, sans-serif'
            }}
          >
            Category: {categoryFilter}
          </Typography>
        )}
      </Box>

      {/* Liste des articles */}
      <Box
        sx={{
          height: 'calc(100% - 120px)',
          overflowY: 'auto',
          padding: '0 40px 40px 40px',
          
          // Scrollbar style Gatsby
          '&::-webkit-scrollbar': {
            width: '6px'
          },
          '&::-webkit-scrollbar-track': {
            background: 'transparent'
          },
          '&::-webkit-scrollbar-thumb': {
            background: '#cccccc',
            borderRadius: '3px',
            '&:hover': {
              background: '#aaaaaa'
            }
          }
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
                cursor: 'pointer',
                '&:hover': {
                  backgroundColor: '#fafafa',
                  '& .post-title': {
                    color: '#709425'
                  }
                }
              }}
            >
              {/* Vignette */}
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
                {post.cover ? (
                  <img
                    src={post.cover}
                    alt={post.title}
                    style={{
                      width: '100%',
                      height: '100%',
                      borderRadius: '50%',
                      objectFit: 'cover'
                    }}
                  />
                ) : (
                  <Typography
                    sx={{
                      fontSize: '1.2rem',
                      fontWeight: 600,
                      color: '#888888'
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
                    fontSize: '1.1rem',
                    fontWeight: 600,
                    color: '#333333',
                    fontFamily: '"Open Sans", Arial, sans-serif',
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
                      fontSize: '0.9rem',
                      color: '#888888',
                      fontFamily: '"Open Sans", Arial, sans-serif',
                      lineHeight: '1.4',
                      marginBottom: '8px'
                    }}
                  >
                    {post.subTitle}
                  </Typography>
                )}
                
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
                
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }}
                >
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
                  
                  {post.category && (
                    <Typography
                      sx={{
                        fontSize: '0.75rem',
                        color: '#709425',
                        fontFamily: '"Open Sans", Arial, sans-serif',
                        backgroundColor: '#f0f8e0',
                        padding: '2px 8px',
                        borderRadius: '12px'
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
              textAlign: 'center',
              padding: '60px 0',
              color: '#888888'
            }}
          >
            <Typography
              sx={{
                fontSize: '1rem',
                fontFamily: '"Open Sans", Arial, sans-serif'
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

// Container d'un article
const PostCard = styled(Box)({
  display: 'flex',
  alignItems: 'flex-start',
  marginBottom: '40px',
  padding: '20px 0',
  borderBottom: '1px solid #f5f5f5',
  cursor: 'pointer',
  transition: 'all 0.3s ease',
  
  '&:hover': {
    backgroundColor: '#fafafa',
    transform: 'translateY(-2px)',
    boxShadow: '0 4px 12px rgba(0,0,0,0.05)'
  },
  
  '&:last-child': {
    borderBottom: 'none'
  }
})

// Container de la vignette (forme organique caractéristique)
const ThumbnailContainer = styled(Box)({
  width: '90px',
  height: '90px',
  marginRight: '25px',
  borderRadius: '75% 65%', // Forme organique signature
  overflow: 'hidden',
  backgroundColor: '#f0f0f0',
  transition: 'border-radius 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  flexShrink: 0,
  
  '&:hover': {
    borderRadius: '65% 75%' // Animation au hover
  }
})

// Zone de contenu de l'article
const PostContent = styled(Box)({
  flex: 1,
  minWidth: 0 // Pour éviter l'overflow du texte
})

// Titre principal (H1) - style exact de Gatsby
const PostTitle = styled(Typography)({
  fontFamily: '"Open Sans", Arial, sans-serif',
  fontSize: '27px',
  fontWeight: 600,
  lineHeight: '31px',
  letterSpacing: '-0.03em',
  color: '#333333',
  marginBottom: '8px',
  
  // Effet hover
  transition: 'color 0.3s ease',
  '&:hover': {
    color: '#709425' // Vert accent de Gatsby
  }
})

// Sous-titre (H2) - style exact de Gatsby
const PostSubtitle = styled(Typography)({
  fontFamily: '"Open Sans", Arial, sans-serif',
  fontSize: '18px',
  fontWeight: 300,
  lineHeight: '24px',
  color: '#888888',
  marginBottom: '12px'
})

// Extrait du post
const PostExcerpt = styled(Typography)({
  fontFamily: '"Open Sans", Arial, sans-serif',
  fontSize: '14px',
  lineHeight: '20px',
  color: '#666666',
  marginBottom: '12px'
})

// Métadonnées (date, catégorie)
const PostMeta = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: '15px'
})

const PostDate = styled(Typography)({
  fontFamily: '"Open Sans", Arial, sans-serif',
  fontSize: '12px',
  fontWeight: 300,
  color: '#999999',
  textTransform: 'uppercase',
  letterSpacing: '1px'
})

const PostCategory = styled(Typography)({
  fontFamily: '"Open Sans", Arial, sans-serif',
  fontSize: '12px',
  fontWeight: 400,
  color: '#709425',
  backgroundColor: '#f0f8e0',
  padding: '4px 8px',
  borderRadius: '12px',
  textTransform: 'uppercase',
  letterSpacing: '0.5px'
})

export default function Navigator({ posts, categories, className }: NavigatorProps) {
  const { navigatorPosition, navigatorShape, categoryFilter } = useGatsbyUIStore()
  
  // Filtrage des posts selon la catégorie
  const filteredPosts = categoryFilter === 'all posts' 
    ? posts 
    : posts.filter(post => post.category === categoryFilter)
  
  // Classes CSS pour les animations
  const containerClasses = [
    navigatorPosition,
    navigatorShape,
    className
  ].filter(Boolean).join(' ')
  
  // Formatage de la date comme dans Gatsby
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      day: '2-digit',
      month: 'short', 
      year: 'numeric'
    })
  }
  
  return (
    <NavigatorContainer className={containerClasses}>
      <ScrollableList>
        {filteredPosts.map((post) => (
          <Link key={post.slug} href={`/posts/${post.slug}`} style={{ textDecoration: 'none' }}>
            <PostCard>
              {/* Vignette organique */}
              <ThumbnailContainer>
                {post.cover ? (
                  <Image
                    src={post.cover}
                    alt={post.title}
                    width={90}
                    height={90}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover'
                    }}
                  />
                ) : (
                  <Box
                    sx={{
                      width: '100%',
                      height: '100%',
                      background: 'linear-gradient(135deg, #709425, #8ab33f)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'white',
                      fontSize: '24px',
                      fontWeight: 600
                    }}
                  >
                    {post.title.charAt(0).toUpperCase()}
                  </Box>
                )}
              </ThumbnailContainer>
              
              {/* Contenu de l'article */}
              <PostContent>
                {/* Titre principal */}
                <PostTitle component="h1">
                  {post.title}
                </PostTitle>
                
                {/* Sous-titre si présent */}
                {post.subTitle && (
                  <PostSubtitle component="h2">
                    {post.subTitle}
                  </PostSubtitle>
                )}
                
                {/* Extrait */}
                <PostExcerpt>
                  {post.excerpt}
                </PostExcerpt>
                
                {/* Métadonnées */}
                <PostMeta>
                  <PostDate>
                    {formatDate(post.date)}
                  </PostDate>
                  
                  {post.category && (
                    <PostCategory>
                      {post.category}
                    </PostCategory>
                  )}
                </PostMeta>
              </PostContent>
            </PostCard>
          </Link>
        ))}
        
        {/* Message si aucun post */}
        {filteredPosts.length === 0 && (
          <Box sx={{ textAlign: 'center', py: 8 }}>
            <Typography variant="h6" color="text.secondary">
              No posts found for "{categoryFilter}"
            </Typography>
          </Box>
        )}
      </ScrollableList>
    </NavigatorContainer>
  )
}
