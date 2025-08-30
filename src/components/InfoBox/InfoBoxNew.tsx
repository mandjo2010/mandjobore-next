/**
 * InfoBox - Reproduction fidèle de la sidebar gauche de Gatsby
 * Correspondance avec src/components/InfoBox/InfoBox.js
 */
'use client'

import { ExpandMore, ExpandLess } from '@mui/icons-material'
import { Box, IconButton, Avatar, Typography, styled } from '@mui/material'
import { motion, AnimatePresence } from 'framer-motion'
import React, { useState } from 'react'

import { useGatsbyUIStore } from '@/store/gatsby-ui-store'

// Components enfants
import InfoMenu from './InfoMenu'
import SocialIcons from './SocialIcons'
import StackIcons from './StackIcons'

const InfoContainer = styled(Box)(({ theme }) => ({
  backgroundColor: '#ffffff',
  borderRight: '1px solid #e0e0e0',
  display: 'flex',
  flexDirection: 'column',
  height: '100vh',
  left: 0,
  position: 'fixed',
  [theme.breakpoints.down('lg')]: {
    display: 'none'
  },
  top: 0,
  width: '320px',
  
  zIndex: 10
}))

const AvatarContainer = styled(Box)({
  alignItems: 'center',
  display: 'flex',
  flexDirection: 'column',
  padding: '2rem 2rem 1rem 2rem',
  textAlign: 'center'
})

const StyledAvatar = styled(Avatar)({
  '&:hover': {
    borderRadius: '75% 65%',
    transform: 'scale(1.05)'
  },
  borderRadius: '65% 75%',
  cursor: 'pointer',
  height: 80,
  marginBottom: '1rem',
  transition: 'all 0.3s ease',
  
  width: 80
})

const ExpandButton = styled(IconButton)({
  color: '#555',
  position: 'absolute',
  right: '1rem',
  top: '1rem'
})

const ContentContainer = styled(Box)({
  display: 'flex',
  flex: 1,
  flexDirection: 'column',
  overflow: 'hidden'
})

const AuthorInfo = styled(motion.div)({
  padding: '0 2rem 1rem 2rem',
  textAlign: 'center'
})

const MenuContainer = styled(Box)({
  borderBottom: '1px solid #e0e0e0',
  borderTop: '1px solid #e0e0e0',
  padding: '1rem 2rem'
})

const StackContainer = styled(Box)({
  bottom: '1rem',
  left: '2rem',
  position: 'absolute',
  right: '2rem'
})

interface InfoBoxProps {
  pages?: Array<{
    slug: string
    title: string
    menuTitle?: string
  }>
  parts?: Array<{
    title: string
    html: string
  }>
}

export default function InfoBox({ pages = [] }: InfoBoxProps) {
  const { featureNavigator } = useGatsbyUIStore()
  const [isExpanded, setIsExpanded] = useState(true)
  
  // Configuration de l'auteur
  const authorConfig = {
    avatar: '/images/avatar.jpg',
    bio: 'Design and build applications to support data including spatial & geospatial ones.',
    name: 'Mandjo Béa Boré',
    title: 'Data Analyst & Developer'
  }
  
  const handleAvatarClick = () => {
    featureNavigator()
  }
  
  const handleExpandToggle = () => {
    setIsExpanded(!isExpanded)
  }
  
  return (
    <InfoContainer>
      <ExpandButton onClick={handleExpandToggle}>
        {isExpanded ? <ExpandLess /> : <ExpandMore />}
      </ExpandButton>
      
      <AvatarContainer>
        <StyledAvatar
          src={authorConfig.avatar}
          alt={authorConfig.name}
          onClick={handleAvatarClick}
        >
          MB
        </StyledAvatar>
        
        <Typography 
          variant="h6" 
          sx={{ 
            color: '#333',
            fontSize: '1.1rem',
            fontWeight: 600,
            mb: 0.5
          }}
        >
          {authorConfig.name}
        </Typography>
        
        <Typography 
          variant="body2" 
          sx={{ 
            color: '#888',
            fontSize: '0.9rem',
            lineHeight: 1.3
          }}
        >
          {authorConfig.title}
        </Typography>
      </AvatarContainer>
      
      <ContentContainer>
        <AnimatePresence>
          {isExpanded && (
            <AuthorInfo
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Typography 
                variant="body2" 
                sx={{ 
                  color: '#666',
                  fontSize: '0.85rem',
                  lineHeight: 1.4,
                  px: 1
                }}
              >
                {authorConfig.bio}
              </Typography>
              
              <Box sx={{ mt: 2 }}>
                <SocialIcons />
              </Box>
            </AuthorInfo>
          )}
        </AnimatePresence>
        
        <MenuContainer>
          <InfoMenu pages={pages} onLinkClick={() => {}} />
        </MenuContainer>
        
        {/* Zone flexible pour le Navigator en mode compact */}
        <Box sx={{ flex: 1, overflow: 'hidden' }}>
          {/* Ici sera injecté le Navigator en mode compact */}
        </Box>
      </ContentContainer>
      
      <StackContainer>
        <StackIcons />
      </StackContainer>
    </InfoContainer>
  )
}
