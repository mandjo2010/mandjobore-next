/**
 * Article - Reproduit src/components/Main/Article.js
 * Container pour le contenu des articles et pages
 */
'use client'

import { Box } from '@mui/material'
import React from 'react'

interface ArticleProps {
  children: React.ReactNode
}

export default function Article({ children }: ArticleProps) {
  return (
    <Box
      component="article"
      sx={{
        '& a': {
          '&:hover': {
            color: '#709425' // linkHover color
          },
          fontWeight: 'bold',
          letterSpacing: '-0.02em',
          textDecoration: 'underline',
          transition: '0.3s ease'
        },
        // Styles pour le contenu
        '& strong, & b': {
          letterSpacing: '-0.02em'
        },
        // Responsive padding
        '@media (min-width: 768px)': {
          padding: 'calc(2.5rem + 60px) 3.5rem 2.5rem'
        },
        '@media (min-width: 1024px)': {
          padding: '3.5rem'
        },
        
        backgroundColor: '#ffffff',
        margin: '0 auto',
        
        maxWidth: '800px', // articleMaxWidth du theme
        
        padding: 'calc(60px + 1.5rem) 1.5rem 1.5rem 1.5rem' // infoBar height + padding
      }}
    >
      {children}
    </Box>
  )
}
