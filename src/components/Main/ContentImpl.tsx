/**
 * ContentImpl - Actual implementation extracted to avoid circular re-export issues
 */
'use client'

import { Box } from '@mui/material'
import React from 'react'

import { useGatsbyUIStore } from '@/store/gatsby-ui-store'

interface ContentProps {
  html?: string
  children?: React.ReactNode
}

export default function Content({ children, html }: ContentProps) {
  const { fontSizeIncrease } = useGatsbyUIStore()

  const contentStyles = {
    // Code blocks
    '& .gatsby-highlight': {
      margin: '2em 0'
    },
    // iframes
    '& .gatsby-resp-iframe-wrapper': {
      margin: '2em 0'
    },
    // Images
    '& .gatsby-resp-image-link': {
      '@media (min-width: 768px)': {
        margin: '2.5em -3.5rem'
      },
      border: 'none',
      margin: '2em -1.5rem'
    },
    
    '& a': {
      color: '#709425' // theme.base.colors.link
    },
    
    // Blockquotes
    '& blockquote': {
      '&::after': {
        bottom: '-5px',
        top: 'auto'
      },
      '&::before, &::after': {
        backgroundColor: '#ffffff',
        content: '""',
        height: '5px',
        left: '50%',
        marginLeft: '-47%',
        position: 'absolute',
        top: '-5px',
        width: '94%'
      },
      '& p': {
        margin: 0
      },
      border: '5px solid #e0e0e0', // blockquoteFrame
      fontStyle: 'italic',
      
      margin: '2.5em 0',
      
      padding: '1em 1.1em 1em 1.3em',
      
      position: 'relative'
    },
    
    // Headings
    '& h2, & h3': {
      color: '#2a2a2a', // contentHeading color
      fontSize: '1.6em', // h2Size
      fontWeight: 600,
      letterSpacing: '-0.02em',
      lineHeight: 1.3,
      margin: '2em 0 1em'
    },
    
    '& h3': {
      fontSize: '1.3em' // h3Size
    },
    
    '& li': {
      margin: '0 0 0.5em 0'
    },
    
    // Paragraphs
    '& p': {
      fontWeight: 400,
      margin: '0 0 1.5em 0'
    },
    
    // Lists
    '& ul': {
      '@media (min-width: 768px)': {
        padding: '0 0 0 2em'
      },
      listStyle: 'circle',
      padding: '0 0 0 1.3em'
    },
    
    // Responsive font sizes
    '@media (min-width: 768px)': {
      fontSize: '1.1em'
    },
    
    '@media (min-width: 1024px)': {
      fontSize: '1.2em'
    },
    
    color: '#333333', // theme.main.colors.content
    
    fontSize: `calc(1em * ${fontSizeIncrease})`, // Font size avec increase
    
    lineHeight: 1.6
  }

  if (html) {
    return (
      <Box
        sx={contentStyles}
        dangerouslySetInnerHTML={{ __html: html }}
      />
    )
  }

  return (
    <Box sx={contentStyles}>
      {children}
    </Box>
  )
}
