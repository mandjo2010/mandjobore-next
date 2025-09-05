/**
 * CompactArticleList - Liste d'articles en format miniature pour la sidebar
 * Reproduit exactement InfoMenu.js de Gatsby v1
 * Typographie: Open Sans 400, 16px, rgb(85,85,85), line-height 18px
 */
'use client'

import { Box, Typography, styled } from '@mui/material'
import Image from 'next/image'
import React from 'react'

import { useArticleNavigation } from '@/hooks/useArticleNavigation'

interface CompactArticleListProps {
  posts: Array<{
    id: string
    slug: string
    title: string
    excerpt?: string
    category?: string
    cover?: string
  }>
}

// Styles reproduisant exactement InfoMenu de Gatsby v1 avec images rondes
// Sidebar: 320px total, padding: 20px 40px = 240px contenu utile
const CompactMenuContainer = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  margin: 0,
  padding: '1rem 0',
  width: '240px' // Largeur exacte du contenu (320px - 80px padding)
}))

const CompactArticleItem = styled(Box)(({ theme }) => ({
  '&:hover': {
    '& .compact-image': {
      borderRadius: '70% 60%', // Changement forme au hover
      transform: 'scale(1.05)' // Léger zoom au hover
    },
    '& .compact-title': {
      color: theme.palette?.primary?.main || '#709425' // Couleur accent Gatsby
    }
  },
  alignItems: 'center',
  cursor: 'pointer',
  display: 'flex',
  marginBottom: '0.8rem',
  padding: '0.3rem',
  transition: 'all 0.2s ease',
  width: '100%'
}))

const CompactImage = styled(Image)({
  backgroundColor: '#f5f5f5',
  border: '1px solid #ddd',
  borderRadius: '75% 65%', // Forme organique comme Navigator principal
  display: 'block',
  flexShrink: 0,
  height: '35px', // Taille encore plus petite (au lieu de 40px)
  marginRight: '0.6rem', // Marge réduite aussi
  objectFit: 'cover',
  objectPosition: 'center',
  transition: 'all 0.3s ease',
  width: '35px' // Taille encore plus petite
})

const CompactContent = styled(Box)(() => ({
  flex: 1,
  overflow: 'hidden'
}))

const CompactTitle = styled(Typography)(() => ({
  color: 'rgb(85, 85, 85)', // Couleur exacte spécifiée
  display: '-webkit-box',
  fontFamily: '"Open Sans"', // Font family exacte
  fontSize: '12px', // Taille réduite pour sidebar (au lieu de 14px)
  fontStyle: 'normal',
  fontWeight: 400,
  lineHeight: '14px', // Line height ajustée en proportion
  margin: 0,
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  textTransform: 'lowercase', // Minuscules comme Gatsby
  transition: 'color 0.2s ease',
  WebkitBoxOrient: 'vertical',
  WebkitLineClamp: 2 // Maximum 2 lignes
}))

export default function CompactArticleList({ posts }: CompactArticleListProps) {
  const { navigateToArticle } = useArticleNavigation()
  
  const handleClick = (slug: string) => (event: React.MouseEvent) => {
    event.preventDefault()
    navigateToArticle(slug, event)
  }
  
  return (
    <CompactMenuContainer>
      {posts.slice(0, 6).map((post) => ( // Limite à 6 articles pour format très compact
        <CompactArticleItem
          key={post.id}
          onClick={handleClick(post.slug)}
          title={post.title} // Tooltip avec le titre complet
        >
          <CompactImage
            className="compact-image"
            src={post.cover || '/images/default-cover.jpg'}
            alt={post.title}
            width={35}
            height={35}
          />
          
          <CompactContent>
            <CompactTitle className="compact-title">
              {post.title}
            </CompactTitle>
          </CompactContent>
        </CompactArticleItem>
      ))}
    </CompactMenuContainer>
  )
}

// Export des types
export type { CompactArticleListProps }
