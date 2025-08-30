/**
 * NavigatorItem - Item de la liste avec vignette ronde et typographie Gatsby
 * Correspondance avec src/components/Navigator/ListItem.js
 */
'use client'

import { Box, Typography, styled } from '@mui/material'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

import { useGatsbyUIStore } from '@/store/gatsby-ui-store'

const ItemContainer = styled(motion.div)(({ theme: _theme }) => ({
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
  },
  borderBottom: '1px solid #f0f0f0',
  color: 'inherit',
  cursor: 'pointer',
  display: 'flex',
  
  padding: '1.5rem 0',
  
  textDecoration: 'none'
}))

const CoverContainer = styled(Box)({
  flexShrink: 0,
  height: '60px',
  marginRight: '1rem',
  width: '60px'
})

const CoverImage = styled(Image)({
  backgroundColor: '#f5f5f5',
  borderRadius: '65% 75%', // Forme organique caractéristique
  height: '100%',
  objectFit: 'cover',
  transition: 'all 0.3s ease',
  width: '100%'
})

const ContentContainer = styled(Box)({
  flex: 1,
  overflow: 'hidden'
})

const ItemTitle = styled(Typography)(({ theme: _theme }) => ({
  color: '#333',
  display: '-webkit-box',
  fontSize: '1.2rem',
  fontWeight: 600,
  letterSpacing: '-0.03em',
  lineHeight: '1.2em',
  marginBottom: '0.3rem',
  
  // Ellipsis pour longs titres
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  transition: 'color 0.2s ease',
  WebkitBoxOrient: 'vertical',
  WebkitLineClamp: 2
}))

const ItemSubtitle = styled(Typography)(({ theme: _theme }) => ({
  // Masqué en mode aside
  '.is-aside &': {
    display: 'none'
  },
  color: '#888',
  display: '-webkit-box',
  fontSize: '0.9rem',
  
  fontWeight: 300,
  
  lineHeight: '1.3em',
  // Ellipsis
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  WebkitBoxOrient: 'vertical',
  WebkitLineClamp: 2
}))

const ItemMeta = styled(Box)({
  alignItems: 'center',
  color: '#aaa',
  display: 'flex',
  fontSize: '0.75rem',
  gap: '0.5rem',
  marginTop: '0.5rem'
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
    <Link href={`/posts/${post.slug}`} style={{ color: 'inherit', textDecoration: 'none' }}>
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
