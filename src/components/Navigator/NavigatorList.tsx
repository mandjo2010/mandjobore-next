/**
 * NavigatorList - Liste des articles avec vignettes rondes
 * Correspondance avec src/components/Navigator/List.js
 */
'use client'

import React from 'react'
import { Box, styled } from '@mui/material'
import { motion } from 'framer-motion'

// Components
import NavigatorItem from './NavigatorItem'
import SpringScrollbars from '@/components/SpringScrollbars/SpringScrollbars'

const ListContainer = styled(Box)({
  flex: 1,
  overflow: 'hidden',
  position: 'relative'
})

const ListInner = styled(Box)(({ theme }) => ({
  padding: '0 1rem',
  
  // Spacing selon le breakpoint
  [theme.breakpoints.up('lg')]: {
    padding: '0 1.5rem'
  }
}))

interface NavigatorListProps {
  posts: Array<{
    slug: string
    title: string
    excerpt: string
    category?: string | null
    cover?: string | null
    date: string
  }>
}

export default function NavigatorList({ posts }: NavigatorListProps) {
  return (
    <ListContainer className="navigator-list">
      <SpringScrollbars isNavigator={true}>
        <ListInner>
          {posts.map((post, index) => (
            <motion.div
              key={post.slug}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 0.3, 
                delay: index * 0.1,
                ease: 'easeOut'
              }}
            >
              <NavigatorItem post={post} />
            </motion.div>
          ))}
          
          {/* Espacement en bas pour scroll */}
          <Box sx={{ height: '2rem' }} />
        </ListInner>
      </SpringScrollbars>
    </ListContainer>
  )
}
