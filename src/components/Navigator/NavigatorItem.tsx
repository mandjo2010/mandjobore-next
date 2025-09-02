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
      borderRadius: '65% 75%', // Inversion exacte du borderRadius au hover (Gatsby v1)
      transform: 'scale(1.02)' // Scaling plus subtil
    },
    
    '& .item-title': {
      color: '#709425' // Couleur accent Gatsby
    },
    
    '& .item-subtitle': {
      color: '#709425 !important' // Couleur accent pour le sous-titre aussi
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
  // Responsive selon breakpoints Gatsby v1 exacts
  '@media (min-width: 600px)': { // theme.mediaQueryTresholds.M
    height: '80px',
    marginRight: '0.5em',
    width: '80px'
  },
  '@media (min-width: 1024px)': { // theme.mediaQueryTresholds.L  
    height: '90px',
    marginRight: '0.8em',
    width: '90px'
  },
  // Mode aside/featured (navigation compacte)
  '.moving-featured &, .is-aside &': {
    height: '30px !important',
    marginRight: '0.5em !important',
    width: '30px !important'
  },
  flexShrink: 0,
  height: '60px', // Base mobile selon Gatsby v1
  marginRight: '1rem',
  position: 'relative',
  width: '60px'
})

const CoverImage = styled(Image)({
  '@media (min-width: 1024px)': { // theme.mediaQueryTresholds.L
    transition: 'all 0.3s ease' // Plus rapide sur desktop comme Gatsby v1
  },
  backgroundColor: '#f5f5f5',
  border: '1px solid #ddd', // Bordure grise très fine comme dans votre description
  borderRadius: '75% 65%', // Forme organique par défaut (Gatsby v1)
  height: '100%',
  objectFit: 'cover',
  overflow: 'hidden',
  position: 'relative',
  transition: 'all 0.5s ease', // Transition lente comme Gatsby v1 original
  width: '100%'
})

const ContentContainer = styled(Box)({
  flex: 1,
  overflow: 'hidden'
})

const ItemTitle = styled(Typography)(({ theme: _theme }) => ({
  color: 'rgb(85, 85, 85)',
  display: '-webkit-box',
  fontFamily: '"Open Sans"',
  fontSize: '27px',
  fontWeight: 600,
  letterSpacing: '-0.04em',
  lineHeight: '31px',
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
  // S'appuie sur les styles globaux .post-subtitle pour taille/couleur/line-height exacts
  fontFamily: '"Open Sans" !important',
  fontSize: '23px !important',
  fontWeight: '300 !important',
  lineHeight: '27px !important',
  color: 'rgb(85, 85, 85) !important',
  display: '-webkit-box',
  margin: 0,
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
          <ItemTitle className="item-title post-list-title">
            {post.title}
          </ItemTitle>
          
          <ItemSubtitle 
            className="item-subtitle post-subtitle blog-subtitle"
            sx={{
              color: 'rgb(85, 85, 85) !important',
              fontFamily: '"Open Sans" !important',
              fontSize: '23px !important',
              fontWeight: '300 !important',
              lineHeight: '27px !important',
              transition: 'color 0.2s ease',
            }}
          >
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
