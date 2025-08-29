/**
 * NavigatorHeader - En-tête avec titre et boutons de contrôle
 * Correspondance avec src/components/Navigator/ListHeader.js
 */
'use client'

import React from 'react'
import { Box, Typography, IconButton, styled } from '@mui/material'
import { Close, ExpandLess } from '@mui/icons-material'
import { useGatsbyUIStore } from '@/store/gatsby-ui-store'

const HeaderContainer = styled(Box)({
  padding: '1rem 1.5rem',
  borderBottom: '1px solid #e0e0e0',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  minHeight: '60px'
})

const HeaderTitle = styled(Typography)({
  fontSize: '0.8rem',
  fontWeight: 600,
  textTransform: 'uppercase',
  letterSpacing: '0.1em',
  color: '#555'
})

const HeaderActions = styled(Box)({
  display: 'flex',
  gap: '0.5rem'
})

const ActionButton = styled(IconButton)({
  width: '32px',
  height: '32px',
  color: '#555',
  
  '&:hover': {
    backgroundColor: 'rgba(0,0,0,0.05)'
  }
})

export default function NavigatorHeader() {
  const { 
    navigatorPosition, 
    navigatorShape,
    moveNavigatorAside,
    featureNavigator,
    setNavigatorShape,
    categoryFilter 
  } = useGatsbyUIStore()
  
  const handleClose = () => {
    moveNavigatorAside()
  }
  
  const handleExpand = () => {
    if (navigatorPosition === 'is-aside') {
      featureNavigator()
    } else {
      setNavigatorShape(navigatorShape === 'open' ? 'closed' : 'open')
    }
  }
  
  // Titre selon le contexte
  const getTitle = () => {
    if (categoryFilter && categoryFilter !== 'all posts') {
      return `Posts: ${categoryFilter}`
    }
    return 'List of posts'
  }
  
  return (
    <HeaderContainer>
      <HeaderTitle>
        {getTitle()}
      </HeaderTitle>
      
      <HeaderActions>
        {navigatorPosition === 'is-featured' && (
          <ActionButton 
            onClick={handleExpand}
            title="Collapse list"
          >
            <ExpandLess />
          </ActionButton>
        )}
        
        <ActionButton 
          onClick={handleClose}
          title="Close navigator"
        >
          <Close />
        </ActionButton>
      </HeaderActions>
    </HeaderContainer>
  )
}
