/**
 * PageHeader - Reproduit src/components/PageHeader.js
 * Header pour les pages statiques
 */
'use client'

import { Box, Typography } from '@mui/material'
import React from 'react'

interface PageHeaderProps {
  title: string
  algolia?: boolean
}

export default function PageHeader({ algolia, title }: PageHeaderProps) {
  return (
    <Box
      component="header"
      sx={{
        alignContent: 'center',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        margin: '0 0 3em'
      }}
    >
      <Typography
        component="h1"
        sx={{
          '@media (min-width: 768px)': {
            fontSize: '2.8em' // sizeM
          },
          '@media (min-width: 1024px)': {
            fontSize: '3.2em', // sizeL
            letterSpacing: '-0.05em'
          },
          color: '#2a2a2a', // theme.main.colors.title
          fontSize: '2.2em', // theme.main.fonts.title.size
          fontWeight: 700, // theme.main.fonts.title.weight
          letterSpacing: '-0.04em',
          
          lineHeight: 1.1,
          
          margin: '0 0 0.4em'
        }}
      >
        {title}
      </Typography>
      
      {algolia && (
        <Box
          component="a"
          href="https://www.algolia.com"
          target="_blank"
          rel="noopener noreferrer"
          sx={{
            '@media (min-width: 768px)': {
              width: '170px'
            },
            '@media (min-width: 1024px)': {
              width: '190px'
            },
            display: 'block',
            
            margin: '0 0 0 10px',
            
            width: '130px'
          }}
        >
          {/* TODO: Add Algolia Icon */}
          <Typography variant="caption" sx={{ color: '#666666' }}>
            Powered by Algolia
          </Typography>
        </Box>
      )}
    </Box>
  )
}
