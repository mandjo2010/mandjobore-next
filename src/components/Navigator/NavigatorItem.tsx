/**
 * NavigatorItem - Item de la liste avec vignette ronde et typographie Gatsby
 * Correspondance avec src/components/Navigator/ListItem.js
 */
'use client'

import React from 'react'
import { Box, Typography, styled } from '@mui/material'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { useGatsbyUIStore } from '@/store/gatsby-ui-store'

const ItemContainer = styled(motion.div)(({ theme }) => ({
  display: 'flex',
  padding: '1.5rem 0',
  borderBottom: '1px solid #f0f0f0',
  cursor: 'pointer',
  textDecoration: 'none',
  color: 'inherit',
  
  '&:hover': {
    '& .item-cover': {
      borderRadius: '75% 65%', // Inverse du borderRadius au hover
      transform: 'scale(1.05)'
    },
    
    '& .item-title': {
      color: '#709425' // Couleur accent Gatsby
    }
  },
  
  '&:last-child': {
    borderBottom: 'none'
  }
}))

const CoverContainer = styled(Box)({
  width: '60px',
  height: '60px',
  marginRight: '1rem',
  flexShrink: 0
})

const CoverImage = styled(Image)({
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  borderRadius: '65% 75%', // Forme organique caractéristique
  transition: 'all 0.3s ease',
  backgroundColor: '#f5f5f5'
})

const ContentContainer = styled(Box)({
  flex: 1,
  overflow: 'hidden'
})

const ItemTitle = styled(Typography)(({ theme }) => ({
  fontSize: '1.2rem',
  fontWeight: 600,
  lineHeight: '1.2em',
  letterSpacing: '-0.03em',
  color: '#333',
  marginBottom: '0.3rem',
  transition: 'color 0.2s ease',
  
  // Ellipsis pour longs titres
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  display: '-webkit-box',
  WebkitLineClamp: 2,
  WebkitBoxOrient: 'vertical'
}))

const ItemSubtitle = styled(Typography)(({ theme }) => ({
  fontSize: '0.9rem',
  fontWeight: 300,
  lineHeight: '1.3em',
  color: '#888',
  
  // Masqué en mode aside
  '.is-aside &': {
    display: 'none'
  },
  
  // Ellipsis
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  display: '-webkit-box',
  WebkitLineClamp: 2,
  WebkitBoxOrient: 'vertical'
}))

const ItemMeta = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: '0.5rem',
  marginTop: '0.5rem',
  fontSize: '0.75rem',
  color: '#aaa'
})

interface NavigatorItemProps {
  post: {
    slug: string
    title: string
    excerpt: string
    category?: string | null
    cover?: string | null
    date: string
  }
}

export default function NavigatorItem({ post }: NavigatorItemProps) {
  const { moveNavigatorAside } = useGatsbyUIStore()
  
  const handleClick = () => {
    // Comme dans Gatsby, cliquer sur un article met le navigator en aside
    moveNavigatorAside()
  }
  
  // Image par défaut si pas de cover
  const coverSrc = post.cover || '/images/default-cover.jpg'
  
  return (
    <Link href={`/posts/${post.slug}`} style={{ textDecoration: 'none', color: 'inherit' }}>
      <ItemContainer
        whileHover={{ x: 2 }}
        whileTap={{ scale: 0.98 }}
        onClick={handleClick}
      >
        <CoverContainer>
          <CoverImage
            className="item-cover"
            src={coverSrc}
            alt={post.title}
            width={60}
            height={60}
          />
        </CoverContainer>
        
        <ContentContainer>
          <ItemTitle className="item-title">
            {post.title}
          </ItemTitle>
          
          <ItemSubtitle className="item-subtitle">
            {post.excerpt}
          </ItemSubtitle>
          
          <ItemMeta>
            {post.category && (
              <span>{post.category}</span>
            )}
            <span>•</span>
            <span>{post.date}</span>
          </ItemMeta>
        </ContentContainer>
      </ItemContainer>
    </Link>
  )
}
