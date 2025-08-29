/**
 * InfoBox - Sidebar gauche reproduisant le design Gatsby original
 * Simplifié pour être pixel-perfect avec l'original
 */
'use client'

import React, { useState } from 'react'
import { Box, Typography, IconButton, Avatar } from '@mui/material'
import { ExpandMore, ExpandLess } from '@mui/icons-material'
import { FaGithub, FaLinkedin, FaTwitter, FaEnvelope } from 'react-icons/fa'
import Link from 'next/link'

// Configuration de l'auteur - comme dans Gatsby
const author = {
  name: 'Mandjo Béa Boré',
  tagline: 'Data Analyst & Developer',
  avatar: '/images/jpg/avatar.jpg',
  bio: 'Design and build applications to support data including spatial & geospatial ones.',
  social: {
    github: 'https://github.com/mandjo2010',
    linkedin: 'https://linkedin.com/in/mandjobore',
    twitter: 'https://twitter.com/mandjobore',
    email: 'mailto:contact@mandjobore.com'
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
  parts: Part[] // eslint-disable-line @typescript-eslint/no-unused-vars
}

export default function InfoBox({ pages, parts: _parts }: InfoBoxProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '320px',
        height: '100vh',
        backgroundColor: '#ffffff',
        borderRight: '1px solid #eeeeee',
        zIndex: 1,
        display: 'flex',
        flexDirection: 'column',
        
        // Caché sur mobile comme dans Gatsby
        '@media (max-width: 1023px)': {
          display: 'none'
        }
      }}
    >
      {/* Section Avatar */}
      <Box
        sx={{
          padding: '40px 40px 30px 40px',
          textAlign: 'center',
          borderBottom: '1px solid #eeeeee'
        }}
      >
        <Avatar
          src={author.avatar}
          alt={author.name}
          sx={{
            width: 80,
            height: 80,
            margin: '0 auto 20px auto',
            border: '2px solid #eeeeee'
          }}
        />
        <Typography
          variant="h6"
          sx={{
            fontSize: '1.2rem',
            fontWeight: 600,
            color: '#333333',
            marginBottom: '6px',
            fontFamily: '"Open Sans", Arial, sans-serif'
          }}
        >
          {author.name}
        </Typography>
        <Typography
          sx={{
            fontSize: '0.9rem',
            color: '#888888',
            fontFamily: '"Open Sans", Arial, sans-serif'
          }}
        >
          {author.tagline}
        </Typography>
      </Box>

      {/* Section Bio */}
      <Box
        sx={{
          padding: '30px 40px',
          borderBottom: '1px solid #eeeeee'
        }}
      >
        <Typography
          sx={{
            fontSize: '0.85rem',
            lineHeight: '1.5',
            color: '#555555',
            fontFamily: '"Open Sans", Arial, sans-serif'
          }}
        >
          {author.bio}
        </Typography>
      </Box>

      {/* Section Menu */}
      <Box
        sx={{
          padding: '30px 40px',
          borderBottom: '1px solid #eeeeee'
        }}
      >
        <Typography
          variant="h6"
          sx={{
            fontSize: '0.9rem',
            fontWeight: 600,
            color: '#333333',
            marginBottom: '15px',
            fontFamily: '"Open Sans", Arial, sans-serif'
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
                padding: '8px 0',
                '&:hover': {
                  '& .page-title': {
                    color: '#709425'
                  }
                }
              }}
            >
              <Typography
                className="page-title"
                sx={{
                  fontSize: '0.85rem',
                  color: '#555555',
                  fontFamily: '"Open Sans", Arial, sans-serif',
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
          padding: '30px 40px',
          borderBottom: '1px solid #eeeeee'
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '15px'
          }}
        >
          <Typography
            variant="h6"
            sx={{
              fontSize: '0.9rem',
              fontWeight: 600,
              color: '#333333',
              fontFamily: '"Open Sans", Arial, sans-serif'
            }}
          >
            Connect
          </Typography>
          <IconButton
            size="small"
            onClick={() => setIsExpanded(!isExpanded)}
            sx={{ color: '#888888' }}
          >
            {isExpanded ? <ExpandLess /> : <ExpandMore />}
          </IconButton>
        </Box>

        {isExpanded && (
          <Box sx={{ display: 'flex', gap: '12px' }}>
            <Link href={author.social.github} target="_blank" rel="noopener noreferrer">
              <IconButton size="small" sx={{ color: '#555555', '&:hover': { color: '#709425' } }}>
                <FaGithub size={18} />
              </IconButton>
            </Link>
            <Link href={author.social.linkedin} target="_blank" rel="noopener noreferrer">
              <IconButton size="small" sx={{ color: '#555555', '&:hover': { color: '#709425' } }}>
                <FaLinkedin size={18} />
              </IconButton>
            </Link>
            <Link href={author.social.twitter} target="_blank" rel="noopener noreferrer">
              <IconButton size="small" sx={{ color: '#555555', '&:hover': { color: '#709425' } }}>
                <FaTwitter size={18} />
              </IconButton>
            </Link>
            <Link href={author.social.email}>
              <IconButton size="small" sx={{ color: '#555555', '&:hover': { color: '#709425' } }}>
                <FaEnvelope size={18} />
              </IconButton>
            </Link>
          </Box>
        )}
      </Box>

      {/* Section Stack */}
      <Box
        sx={{
          padding: '30px 40px',
          flexGrow: 1
        }}
      >
        <Typography
          variant="h6"
          sx={{
            fontSize: '0.9rem',
            fontWeight: 600,
            color: '#333333',
            marginBottom: '15px',
            fontFamily: '"Open Sans", Arial, sans-serif'
          }}
        >
          Tech Stack
        </Typography>
        
        <Typography
          sx={{
            fontSize: '0.8rem',
            color: '#888888',
            fontFamily: '"Open Sans", Arial, sans-serif'
          }}
        >
          React • Next.js • TypeScript • Python • PostGIS • QGIS
        </Typography>
      </Box>
    </Box>
  )
}
