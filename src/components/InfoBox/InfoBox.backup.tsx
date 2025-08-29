/**
 * InfoBox - Reproduction pixel-perfect de la sidebar gauche de Gatsby
 * Correspondance exacte avec le design original de Greg Lobinski
 */
'use client'

import React, { useState } from 'react'
import { Box, IconButton, Avatar, Typography, styled } from '@mui/material'
import { ExpandMore, ExpandLess } from '@mui/icons-material'
import Link from 'next/link'
import { useGatsbyUIStore } from '@/store/gatsby-ui-store'

// Configuration exacte de l'auteur (reproduisant content/meta/config)
const authorConfig = {
  name: 'Mandjo Béa Boré',
  tagline: 'Data Analyst & Developer',
  avatar: '/images/avatar.jpg',
  bio: 'Design and build applications to support data including spatial & geospatial ones.',
  social: {
    github: 'https://github.com/mandjo2010',
    linkedin: 'https://linkedin.com/in/mandjobore', 
    twitter: 'https://twitter.com/mandjobore',
    email: 'contact@mandjobore.com'
  }
}

interface Page {
  slug: string
  title: string
  menuTitle?: string
}

interface Part {
  title: string
  html: string
}

interface InfoBoxProps {
  pages: Page[]
  parts: Part[]
}

// Container principal - dimensions exactes de Gatsby (320px)
const InfoBoxContainer = styled(Box)({
  position: 'fixed',
  top: 0,
  left: 0,
  width: '320px',
  height: '100vh',
  backgroundColor: '#ffffff',
  borderRight: '1px solid #eeeeee',
  zIndex: 1,
  padding: '40px 0 0 0',
  
  // Animations exactes de Gatsby
  willChange: 'left',
  transition: 'left 0.5s ease',
  
  // Caché sur mobile (< 1024px comme dans Gatsby)
  '@media (max-width: 1023px)': {
    display: 'none'
  }
})

// Zone scrollable du contenu
const ScrollableContent = styled(Box)({
  position: 'absolute',
  top: '160px', // Après l'avatar
  bottom: 0,
  left: 0,
  right: 0,
  padding: '0 40px',
  overflowY: 'auto',
  
  // Style de scrollbar comme dans Gatsby
  '&::-webkit-scrollbar': {
    width: '6px'
  },
  '&::-webkit-scrollbar-track': {
    background: 'transparent'
  },
  '&::-webkit-scrollbar-thumb': {
    background: '#cccccc',
    borderRadius: '3px'
  }
})

// Header avec avatar (position fixe comme dans Gatsby)
const InfoHeader = styled(Box)({
  position: 'absolute',
  top: '40px',
  left: '40px',
  right: '40px',
  height: '80px',
  display: 'flex',
  alignItems: 'center',
  cursor: 'pointer'
})

// Avatar avec forme organique caractéristique
const OrganicAvatar = styled(Avatar)({
  width: '60px',
  height: '60px',
  marginRight: '15px',
  borderRadius: '75% 65%', // Forme organique signature
  transition: 'border-radius 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  
  '&:hover': {
    borderRadius: '65% 75%' // Animation au hover
  }
})

// Infos auteur
const AuthorInfo = styled(Box)({
  flex: 1
})

const AuthorName = styled(Typography)({
  fontFamily: '"Open Sans", Arial, sans-serif',
  fontSize: '18px',
  fontWeight: 600,
  color: '#333333',
  lineHeight: '22px',
  marginBottom: '4px'
})

const AuthorTagline = styled(Typography)({
  fontFamily: '"Open Sans", Arial, sans-serif',
  fontSize: '14px',
  fontWeight: 300,
  color: '#888888',
  lineHeight: '18px'
})

// Bouton Expand (position exacte de Gatsby)
const ExpandButton = styled(IconButton)({
  position: 'absolute',
  top: '50px',
  right: '15px',
  width: '30px',
  height: '30px',
  backgroundColor: 'rgba(255, 255, 255, 0.9)',
  boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  
  '&:hover': {
    backgroundColor: '#ffffff',
    boxShadow: '0 4px 8px rgba(0,0,0,0.15)'
  }
})

// Bio de l'auteur
const AuthorBio = styled(Typography)({
  fontFamily: '"Open Sans", Arial, sans-serif',
  fontSize: '14px',
  lineHeight: '20px',
  color: '#555555',
  marginBottom: '30px'
})

// Menu de navigation (style exact de Gatsby)
const NavigationMenu = styled(Box)({
  marginBottom: '30px'
})

const MenuLink = styled(Link)({
  display: 'block',
  fontFamily: '"Open Sans", Arial, sans-serif',
  fontSize: '16px',
  fontWeight: 300,
  color: '#666666',
  textDecoration: 'none',
  textTransform: 'lowercase',
  lineHeight: '30px',
  padding: '5px 0',
  transition: 'color 0.3s ease',
  
  '&:hover': {
    color: '#709425' // Vert accent de Gatsby
  }
})

// Icônes sociales (disposition exacte)
const SocialIcons = styled(Box)({
  display: 'flex',
  gap: '15px',
  marginBottom: '40px'
})

const SocialIcon = styled('a')({
  width: '24px',
  height: '24px',
  display: 'block',
  opacity: 0.7,
  transition: 'opacity 0.3s ease',
  
  '&:hover': {
    opacity: 1
  }
})

// Stack technique en bas (comme dans Gatsby)
const StackSection = styled(Box)({
  position: 'absolute',
  bottom: '30px',
  left: '40px',
  right: '40px'
})

const StackTitle = styled(Typography)({
  fontFamily: '"Open Sans", Arial, sans-serif',
  fontSize: '11px',
  fontWeight: 300,
  color: '#999999',
  textTransform: 'uppercase',
  letterSpacing: '1px',
  marginBottom: '15px'
})

const StackIcons = styled(Box)({
  display: 'flex',
  flexWrap: 'wrap',
  gap: '10px'
})

const StackIcon = styled('a')({
  width: '22px',
  height: '22px',
  display: 'block',
  opacity: 0.6,
  transition: 'opacity 0.3s ease',
  
  '&:hover': {
    opacity: 1
  }
})

export default function InfoBox({ pages, parts }: InfoBoxProps) {
  const [isExpanded, setIsExpanded] = useState(true)
  const { featureNavigator } = useGatsbyUIStore()
  
  // Gestion du clic avatar (featureNavigator comme dans Gatsby)
  const handleAvatarClick = () => {
    featureNavigator()
  }
  
  // Toggle expand
  const handleExpandToggle = () => {
    setIsExpanded(!isExpanded)
  }
  
  // Bio depuis les parts ou fallback
  const authorPart = parts.find(part => part.title === 'author')
  const bioContent = authorPart?.html || authorConfig.bio
  
  return (
    <InfoBoxContainer>
      {/* Header fixe avec avatar */}
      <InfoHeader onClick={handleAvatarClick}>
        <OrganicAvatar 
          src={authorConfig.avatar}
          alt={authorConfig.name}
        />
        <AuthorInfo>
          <AuthorName>{authorConfig.name}</AuthorName>
          <AuthorTagline>{authorConfig.tagline}</AuthorTagline>
        </AuthorInfo>
      </InfoHeader>
      
      {/* Bouton Expand the box */}
      <ExpandButton
        onClick={handleExpandToggle}
        aria-label={isExpanded ? "Collapse info" : "Expand info"}
      >
        {isExpanded ? <ExpandLess fontSize="small" /> : <ExpandMore fontSize="small" />}
      </ExpandButton>
      
      {/* Contenu scrollable */}
      <ScrollableContent>
        {isExpanded && (
          <>
            {/* Bio */}
            {authorPart ? (
              <div dangerouslySetInnerHTML={{ __html: bioContent }} />
            ) : (
              <AuthorBio>{bioContent}</AuthorBio>
            )}
            
            {/* Icônes sociales */}
            <SocialIcons>
              <SocialIcon href={authorConfig.social.github} target="_blank">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="#333">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
              </SocialIcon>
              
              <SocialIcon href={authorConfig.social.linkedin} target="_blank">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="#0077b5">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </SocialIcon>
              
              <SocialIcon href={authorConfig.social.twitter} target="_blank">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="#1da1f2">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                </svg>
              </SocialIcon>
              
              <SocialIcon href={`mailto:${authorConfig.social.email}`}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="#666">
                  <path d="M12 12.713l-11.985-9.713h23.97l-11.985 9.713zm0 2.574l-12-9.725v15.438h24v-15.438l-12 9.725z"/>
                </svg>
              </SocialIcon>
            </SocialIcons>
            
            {/* Menu de navigation */}
            <NavigationMenu>
              {pages.map(page => (
                <MenuLink 
                  key={page.slug} 
                  href={`/pages/${page.slug}`}
                >
                  {page.menuTitle || page.title}
                </MenuLink>
              ))}
            </NavigationMenu>
          </>
        )}
        
        {/* Stack technique (toujours visible en bas) */}
        <StackSection>
          <StackTitle>Built with:</StackTitle>
          <StackIcons>
            <StackIcon href="https://nextjs.org" target="_blank">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="#000">
                <path d="M11.5725 0c-.1763 0-.3098.0013-.3584.0067-.0516.0053-.2159.021-.3636.0328-3.4088.3073-6.6017 2.1463-8.624 4.9728C1.1004 6.584.3802 8.3666.1082 10.255c-.0962.659-.108.8537-.108 1.7474s.012 1.0884.108 1.7476c.652 4.506 3.8591 8.2919 8.2087 9.6945.7789.2511 1.6.4223 2.5337.5255.3636.04 1.9354.04 2.299 0 1.6117-.1783 2.9772-.577 4.3237-1.2643.2065-.1056.2464-.1337.2183-.1573-.0188-.0139-.8987-1.1938-1.9543-2.62l-1.919-2.592-2.4047-3.5583c-1.3231-1.9564-2.4117-3.556-2.4211-3.556-.0094-.0026-.0187 1.5787-.0235 3.509-.0067 3.3802-.0093 3.5162-.0516 3.596-.061.115-.108.1618-.2064.2134-.075.0374-.1408.0445-.5429.0445h-.4570.-.0939-.0516l.0001.0001-1.9173-2.8866-.0018-.0009-2.4035-3.5534c-1.3231-1.9564-2.4111-3.556-2.4211-3.556-.0094-.0026-.0187 1.5787-.0235 3.509-.0067 3.3802-.0093 3.5162-.0516 3.596-.061.115-.108.1618-.2064.2134-.075.0374-.1408.0445-.5429.0445h-.4568l-.0939-.0001-.0516.0001zm5.1538 8.1778l3.3746-5.0154h.5429c.4117 0 .5429-.0334.5997-.1522.0281-.0588.0328-.7775.0235-3.5091l-.0141-3.4322-.0516-.1149c-.0516-.1243-.1147-.1712-.2698-.1978-.0751-.0133-.3021-.0187-.5055-.0133l-.3636.0093-.8511 1.2643c-.4684.6947-1.1738 1.7407-1.5651 2.3274l-.7122 1.0672-2.4047-3.5583z"/>
              </svg>
            </StackIcon>
            
            <StackIcon href="https://reactjs.org" target="_blank">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="#61dafb">
                <path d="M14.23 12.004a2.236 2.236 0 0 1-2.235 2.236 2.236 2.236 0 0 1-2.236-2.236 2.236 2.236 0 0 1 2.235-2.236 2.236 2.236 0 0 1 2.236 2.236zm2.648-10.69c-1.346 0-3.107.96-4.888 2.622-1.78-1.653-3.542-2.602-4.887-2.602-.41 0-.783.093-1.106.278-1.375.793-1.683 3.264-.973 6.365C1.98 8.917 0 10.42 0 12.004c0 1.59 1.99 3.097 5.043 4.03-.704 3.113-.39 5.588.988 6.38.32.187.69.275 1.102.275 1.345 0 3.107-.96 4.888-2.624 1.78 1.654 3.542 2.603 4.887 2.603.41 0 .783-.09 1.106-.275 1.374-.792 1.683-3.263.973-6.365C22.02 15.096 24 13.59 24 12.004c0-1.59-1.99-3.097-5.043-4.032.704-3.11.39-5.587-.988-6.38-.318-.184-.688-.277-1.092-.278zm-.005 1.09v.006c.225 0 .406.044.558.127.666.382.955 1.835.73 3.704-.054.46-.142.945-.25 1.44-.96-.236-2.006-.417-3.107-.534-.66-.905-1.345-1.727-2.035-2.447 1.592-1.48 3.087-2.292 4.105-2.295zm-9.77.02c1.012 0 2.514.808 4.11 2.28-.686.72-1.37 1.537-2.02 2.442-1.107.117-2.154.298-3.113.538-.112-.49-.195-.964-.254-1.42-.23-1.868.054-3.32.714-3.702.19-.09.4-.127.563-.138zm4.882 3.05c.455.468.91.992 1.36 1.564-.44-.02-.89-.034-1.36-.034-.47 0-.92.014-1.36.034.44-.572.895-1.096 1.36-1.564zM12 8.1c.74 0 1.477.034 2.202.093.406.582.802 1.203 1.183 1.86.372.64.71 1.29 1.018 1.946-.308.655-.646 1.31-1.013 1.95-.38.66-.773 1.288-1.18 1.87-.728.063-1.466.098-2.21.098-.74 0-1.477-.035-2.202-.093-.406-.582-.802-1.204-1.183-1.86-.372-.64-.71-1.29-1.018-1.946.303-.657.646-1.313 1.013-1.954.38-.66.773-1.286 1.18-1.866.728-.064 1.466-.099 2.21-.099zm-3.635.254c-.24.377-.48.763-.704 1.16-.225.39-.435.788-.635 1.174-.265-.656-.42-1.278-.52-1.844.692-.134 1.378-.24 2.09-.313.24-.363.51-.735.78-1.1zm7.14 0c.28.363.52.735.78 1.1.695.075 1.362.18 2.09.313-.1.566-.25 1.188-.52 1.844-.20-.386-.41-.784-.635-1.174-.224-.397-.464-.783-.705-1.16zm3.063.675c.484.15.944.317 1.375.498 1.732.74 2.852 1.708 2.852 2.476-.005 1.847-2.71 2.943-4.937 3.93-.466-.91-.988-1.85-1.556-2.8.568-.95 1.09-1.89 1.556-2.8-.21-.4-.433-.788-.668-1.165.668-.2 1.31-.426 1.938-.676zm-14.126 0c.628.25 1.27.476 1.938.676-.235.377-.458.765-.668 1.165-.568.91-1.09 1.85-1.556 2.8-.566-.95-1.088-1.89-1.556-2.8.226-.425.472-.83.735-1.226.484-.181.944-.348 1.375-.498-.21-.405-.43-.793-.668-1.182zm4.882 3.05c.455.468.91.992 1.36 1.564-.44-.02-.89-.034-1.36-.034-.47 0-.92.014-1.36.034.44-.572.895-1.096 1.36-1.564z"/>
              </svg>
            </StackIcon>
            
            <StackIcon href="https://mui.com" target="_blank">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="#0081cb">
                <path d="M0 2.475v10.39l3 1.733V7.67l6 3.465 6-3.465v3.465l3-1.733V2.475L12 8.944z"/>
                <path d="m12 15.61 3-1.732V9.414L12 7.67 9 9.414v4.464z"/>
                <path d="M6 14.77v-4.46L3 8.577v4.464z"/>
              </svg>
            </StackIcon>
          </StackIcons>
        </StackSection>
      </ScrollableContent>
    </InfoBoxContainer>
  )
}
