/**
 * InfoBox - Reproduction fidèle de la sidebar gauche de Gatsby
 * Correspondance avec src/components/InfoBox/InfoBox.js
 */
'use client'

import React, { useState } from 'react'
import { Box, IconButton, Avatar, Typography, styled } from '@mui/material'
import { ExpandMore, ExpandLess } from '@mui/icons-material'
import { motion, AnimatePresence } from 'framer-motion'
import { useGatsbyUIStore } from '@/store/gatsby-ui-store'

// Components enfants
import InfoMenu from './InfoMenu'
import SocialIcons from './SocialIcons'
import StackIcons from './StackIcons'

const InfoContainer = styled(Box)(({ theme }) => ({
  position: 'fixed',
  top: 0,
  left: 0,
  width: '320px',
  height: '100vh',
  backgroundColor: '#ffffff',
  borderRight: '1px solid #e0e0e0',
  zIndex: 10,
  display: 'flex',
  flexDirection: 'column',
  
  [theme.breakpoints.down('lg')]: {
    display: 'none'
  }
}))

const AvatarContainer = styled(Box)({
  padding: '2rem 2rem 1rem 2rem',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  textAlign: 'center'
})

const StyledAvatar = styled(Avatar)({
  width: 80,
  height: 80,
  marginBottom: '1rem',
  cursor: 'pointer',
  transition: 'all 0.3s ease',
  borderRadius: '65% 75%',
  
  '&:hover': {
    borderRadius: '75% 65%',
    transform: 'scale(1.05)'
  }
})

const ExpandButton = styled(IconButton)({
  position: 'absolute',
  top: '1rem',
  right: '1rem',
  color: '#555'
})

const ContentContainer = styled(Box)({
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  overflow: 'hidden'
})

const AuthorInfo = styled(motion.div)({
  padding: '0 2rem 1rem 2rem',
  textAlign: 'center'
})

const MenuContainer = styled(Box)({
  padding: '1rem 2rem',
  borderTop: '1px solid #e0e0e0',
  borderBottom: '1px solid #e0e0e0'
})

const StackContainer = styled(Box)({
  position: 'absolute',
  bottom: '1rem',
  left: '2rem',
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
    name: 'Mandjo Béa Boré',
    title: 'Data Analyst & Developer',
    bio: 'Design and build applications to support data including spatial & geospatial ones.',
    avatar: '/images/avatar.jpg'
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
            fontWeight: 600,
            color: '#333',
            fontSize: '1.1rem',
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
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
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
          <InfoMenu pages={pages} />
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
