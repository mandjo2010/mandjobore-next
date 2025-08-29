/**
 * InfoBox - Sidebar gauche reproduisant le design Gatsby original
 * Simplifié pour être pixel-perfect avec l'original
 */
'use client'

import { ExpandMore, ExpandLess } from '@mui/icons-material'
import { Box, Typography, IconButton, Avatar } from '@mui/material'
import Link from 'next/link'
import React from 'react'
import { FaGithub, FaLinkedin, FaTwitter, FaEnvelope } from 'react-icons/fa'

import { useGatsbyUIStore } from '@/store/gatsby-ui-store'

// Configuration de l'auteur - comme dans Gatsby
const author = {
  avatar: '/images/jpg/avatar.jpg',
  bio: 'Design and build applications to support data including spatial & geospatial ones.',
  name: 'Mandjo Béa Boré',
  social: {
    email: 'mailto:contact@mandjobore.com',
    github: 'https://github.com/mandjo2010',
    linkedin: 'https://linkedin.com/in/mandjobore',
    twitter: 'https://twitter.com/mandjobore'
  },
  tagline: 'Data Analyst & Developer'
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

export default function InfoBox({ pages, parts: _parts }: InfoBoxProps) {
  // Connection au store pour les états globaux
  const { isInfoBoxExpanded, navigatorPosition, setInfoBoxExpanded } = useGatsbyUIStore()
  
  // Détermine si l'InfoBox doit être réduite (quand un article est ouvert)
  const isInfoBoxCollapsed = navigatorPosition === 'is-featured'

  return (
    <Box
      sx={{
        // Caché sur mobile comme dans Gatsby
        '@media (max-width: 1023px)': {
          display: 'none'
        },
        backgroundColor: '#ffffff',
        borderRight: '1px solid #eeeeee',
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        left: 0,
        position: 'fixed',
        top: 0,
        transition: 'width 0.3s cubic-bezier(0.4, 0, 0.2, 1)', // Animation fluide
        width: isInfoBoxCollapsed ? '80px' : '320px', // Largeur réduite quand collapsée
        
        zIndex: 1
      }}
    >
      {/* Section Avatar avec flèche d'expansion */}
      <Box
        sx={{
          borderBottom: '1px solid #eeeeee',
          padding: '40px 40px 30px 40px',
          position: 'relative',
          textAlign: 'center'
        }}
      >
        {/* Container de l'avatar avec positionnement relatif */}
        <Box sx={{ display: 'inline-block', position: 'relative' }}>
          <Avatar
            src={author.avatar}
            alt={author.name}
            sx={{
              border: '2px solid #eeeeee',
              height: isInfoBoxCollapsed ? 48 : 80,
              margin: isInfoBoxCollapsed ? '0 auto 10px auto' : '0 auto 20px auto',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              width: isInfoBoxCollapsed ? 48 : 80 // Avatar plus petit quand collapsé
            }}
          />
          
          {/* Flèche d'expansion principale - visible uniquement quand pas collapsé */}
          {!isInfoBoxCollapsed && (
            <IconButton            onClick={() => setInfoBoxExpanded(!isInfoBoxExpanded)}
            sx={{
              '&:hover': {
                backgroundColor: '#f5f5f5',
                borderColor: '#999999'
              },
              backgroundColor: '#ffffff',
              border: '1px solid #ddd',
              borderRadius: '50%',
              color: '#666666',
              fontSize: '10px',
              height: '20px',
              padding: 0,
              position: 'absolute',
              right: '-8px',
              top: '-8px',
              width: '20px',
              zIndex: 2
            }}
            title={isInfoBoxExpanded ? "Collapse the box" : "Expand the box"}
          >
            {isInfoBoxExpanded ? <ExpandLess /> : <ExpandMore />}
            </IconButton>
          )}
        </Box>

        {/* Informations de base - cachées quand collapsé */}
        {!isInfoBoxCollapsed && (
          <>
            <Typography
              variant="h6"
              sx={{
                color: '#333333',
                fontFamily: '"Open Sans", Arial, sans-serif',
                fontSize: '1.2rem',
                fontWeight: 600,
                marginBottom: '6px'
              }}
            >
              {author.name}
            </Typography>
            <Typography
              sx={{
                color: '#888888',
                fontFamily: '"Open Sans", Arial, sans-serif',
                fontSize: '0.9rem'
              }}
            >
              {author.tagline}
            </Typography>
          </>
        )}
      </Box>

      {/* Contenu complet - caché quand InfoBox est collapsée */}
      {!isInfoBoxCollapsed && isInfoBoxExpanded && (
        <>
          {/* Section Bio */}
          <Box
            sx={{
              borderBottom: '1px solid #eeeeee',
              padding: '30px 40px'
            }}
          >
            <Typography
              sx={{
                color: '#555555',
                fontFamily: '"Open Sans", Arial, sans-serif',
                fontSize: '0.85rem',
                lineHeight: '1.5'
              }}
            >
              {author.bio}
            </Typography>
          </Box>

      {/* Section Menu */}
      <Box
        sx={{
          borderBottom: '1px solid #eeeeee',
          padding: '30px 40px'
        }}
      >
        <Typography
          variant="h6"
          sx={{
            color: '#333333',
            fontFamily: '"Open Sans", Arial, sans-serif',
            fontSize: '0.9rem',
            fontWeight: 600,
            marginBottom: '15px'
          }}
        >
          Menu
        </Typography>
        
        {/* Navigation Pages */}
        {pages.map((page) => (
          <Link
            key={page.slug}
            href={`/pages/${page.slug}`}
            style={{ textDecoration: 'none' }}
          >
            <Box
              sx={{
                '&:hover': {
                  '& .page-title': {
                    color: '#709425'
                  }
                },
                padding: '8px 0'
              }}
            >
              <Typography
                className="page-title"
                sx={{
                  color: '#555555',
                  fontFamily: '"Open Sans", Arial, sans-serif',
                  fontSize: '0.85rem',
                  transition: 'color 0.2s ease'
                }}
              >
                {page.menuTitle || page.title}
              </Typography>
            </Box>
          </Link>
        ))}
      </Box>

      {/* Section Réseaux Sociaux */}
      <Box
        sx={{
          borderBottom: '1px solid #eeeeee',
          padding: '30px 40px'
        }}
      >
        <Box
          sx={{
            alignItems: 'center',
            display: 'flex',
            justifyContent: 'space-between',
            marginBottom: '15px'
          }}
        >
          <Typography
            variant="h6"
            sx={{
              color: '#333333',
              fontFamily: '"Open Sans", Arial, sans-serif',
              fontSize: '0.9rem',
              fontWeight: 600
            }}
          >
            Connect
          </Typography>
          <IconButton
            size="small"
            onClick={() => setInfoBoxExpanded(!isInfoBoxExpanded)}
            sx={{ color: '#888888' }}
          >
            {isInfoBoxExpanded ? <ExpandLess /> : <ExpandMore />}
          </IconButton>
        </Box>

        {isInfoBoxExpanded && (
          <Box sx={{ display: 'flex', gap: '12px' }}>
            <Link href={author.social.github} target="_blank" rel="noopener noreferrer">
              <IconButton size="small" sx={{ '&:hover': { color: '#709425' }, color: '#555555' }}>
                <FaGithub size={18} />
              </IconButton>
            </Link>
            <Link href={author.social.linkedin} target="_blank" rel="noopener noreferrer">
              <IconButton size="small" sx={{ '&:hover': { color: '#709425' }, color: '#555555' }}>
                <FaLinkedin size={18} />
              </IconButton>
            </Link>
            <Link href={author.social.twitter} target="_blank" rel="noopener noreferrer">
              <IconButton size="small" sx={{ '&:hover': { color: '#709425' }, color: '#555555' }}>
                <FaTwitter size={18} />
              </IconButton>
            </Link>
            <Link href={author.social.email}>
              <IconButton size="small" sx={{ '&:hover': { color: '#709425' }, color: '#555555' }}>
                <FaEnvelope size={18} />
              </IconButton>
            </Link>
          </Box>
        )}
      </Box>

      {/* Section Stack */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          flexGrow: 1,
          padding: '30px 40px'
        }}
      >
        <Typography
          variant="h6"
          sx={{
            color: '#333333',
            fontFamily: '"Open Sans", Arial, sans-serif',
            fontSize: '0.9rem',
            fontWeight: 600,
            marginBottom: '15px'
          }}
        >
          Tech Stack
        </Typography>
        
        <Typography
          sx={{
            color: '#888888',
            fontFamily: '"Open Sans", Arial, sans-serif',
            fontSize: '0.8rem',
            marginBottom: 'auto'
          }}
        >
          React • Next.js • TypeScript • Python • PostGIS • QGIS
        </Typography>

        {/* Bouton de collapse en bas */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            marginTop: '20px'
          }}
        >
          <IconButton
            onClick={() => setInfoBoxExpanded(false)}
            sx={{
              '&:hover': {
                backgroundColor: '#eeeeee',
                borderColor: '#999999'
              },
              backgroundColor: '#f8f8f8',
              border: '1px solid #e0e0e0',
              borderRadius: '50%',
              color: '#666666',
              height: '32px',
              width: '32px'
            }}
            title="Collapse the box"
          >
            <ExpandLess fontSize="small" />
          </IconButton>
        </Box>
      </Box>
        </>
      )}

      {/* Mode collapsé - affichage simplifié */}
      {!isInfoBoxCollapsed && !isInfoBoxExpanded && (
        <Box
          sx={{
            alignItems: 'center',
            display: 'flex',
            flexDirection: 'column',
            flexGrow: 1,
            justifyContent: 'center',
            padding: '20px',
            textAlign: 'center'
          }}
        >
          <Typography
            sx={{
              color: '#999999',
              fontFamily: '"Open Sans", Arial, sans-serif',
              fontSize: '0.75rem',
              marginBottom: '20px'
            }}
          >
            Click to expand
          </Typography>
          
          <IconButton
            onClick={() => setInfoBoxExpanded(true)}
            sx={{
              '&:hover': {
                backgroundColor: '#eeeeee',
                borderColor: '#999999'
              },
              backgroundColor: '#f8f8f8',
              border: '1px solid #e0e0e0',
              borderRadius: '50%',
              color: '#666666',
              height: '32px',
              width: '32px'
            }}
            title="Expand the box"
          >
            <ExpandMore fontSize="small" />
          </IconButton>
        </Box>
      )}
    </Box>
  )
}
