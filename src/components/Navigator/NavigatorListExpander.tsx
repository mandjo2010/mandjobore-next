/**
 * NavigatorListExpander - Gère l'expansion de la liste d'articles
 * Reproduit le comportement "LIST OF BLOG" + "Expand the List"
 */
'use client'

import { ExpandMore, ExpandLess } from '@mui/icons-material'
import { Box, Typography, IconButton } from '@mui/material'
import React from 'react'

import { useGatsbyUIStore } from '@/store/gatsby-ui-store'

interface NavigatorListExpanderProps {
  postsCount: number
}

export default function NavigatorListExpander({ postsCount }: NavigatorListExpanderProps) {
  const { navigatorShape, setNavigatorShape } = useGatsbyUIStore()
  
  const isExpanded = navigatorShape === 'open'
  
  const toggleList = () => {
    setNavigatorShape(isExpanded ? 'closed' : 'open')
  }

  return (
    <Box
      sx={{
        // Caché sur mobile
        '@media (max-width: 1023px)': {
          display: 'none'
        },
        alignItems: 'center',
        backgroundColor: '#ffffff',
        borderTop: '1px solid #eeeeee',
        bottom: 0,
        display: 'flex',
        height: '60px',
        justifyContent: 'space-between',
        left: '320px', // Après l'InfoBox
        padding: '0 20px',
        position: 'fixed',
        right: '64px', // Avant l'ActionsBar
        
        zIndex: 10
      }}
    >
      {/* Titre de la liste */}
      <Typography
        sx={{
          color: '#333333',
          fontSize: '0.85em',
          fontWeight: 600,
          letterSpacing: '0.1em',
          textTransform: 'uppercase'
        }}
      >
        List of Blog Posts ({postsCount})
      </Typography>
      
      {/* Bouton Expand/Collapse */}
      <IconButton
        onClick={toggleList}
        sx={{
          '&:hover': {
            backgroundColor: 'rgba(112, 148, 37, 0.1)',
            color: '#709425'
          },
          color: '#666666'
        }}
        title={isExpanded ? "Collapse the list" : "Expand the list"}
      >
        {isExpanded ? <ExpandLess /> : <ExpandMore />}
      </IconButton>
    </Box>
  )
}
