import * as React from 'react'
import { Box, Typography, IconButton, Avatar, Link } from '@mui/material'
import { ExpandMore as ExpandMoreIcon } from '@mui/icons-material'
import { useNavigatorActions, useNavigatorState } from '@/store/ui'

/**
 * InfoBox - Sidebar gauche reproduisant exactement la structure Gatsby
 * Largeur: 320px, contient: Avatar, Bio, Menu, Stack, Bouton expand
 */
export default function InfoBox() {
  const { toggleNavigatorShape } = useNavigatorActions()
  const { isOpen } = useNavigatorState()

  const authorInfo = {
    name: 'Mandjo Boré',
    role: 'Développeur Full-Stack & Data Analyst',
    avatar: '/images/avatar.svg',
    bio: `Passionné par le développement web moderne et l'analyse de données. 
          Spécialisé en React, Next.js, Python et technologies géospatiales.`,
    social: [
      { name: 'GitHub', url: 'https://github.com/mandjo2010', icon: 'github' },
      { name: 'LinkedIn', url: 'https://linkedin.com/in/mandjo-bore', icon: 'linkedin' },
      { name: 'Twitter', url: 'https://twitter.com/mandjo2010', icon: 'twitter' },
    ],
    stack: [
      'JavaScript', 'TypeScript', 'React', 'Next.js', 
      'Python', 'Django', 'PostgreSQL', 'PostGIS',
      'QGIS', 'Leaflet', 'D3.js'
    ]
  }

  const menuItems = [
    { label: 'About', href: '/about' },
    { label: 'Cartography', href: '/cartography' },
    { label: 'Portfolio', href: '/portfolio' },
    { label: 'Contact', href: '/contact' },
  ]

  return (
    <Box
      sx={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        bgcolor: '#ffffff',
        overflow: 'hidden',
      }}
    >
      {/* Header avec avatar et infos auteur */}
      <Box
        sx={{
          p: 3,
          textAlign: 'center',
          borderBottom: '1px solid #dedede',
        }}
      >
        <Avatar
          src={authorInfo.avatar}
          alt={authorInfo.name}
          sx={{
            width: 80,
            height: 80,
            mx: 'auto',
            mb: 2,
            border: '2px solid #709425',
          }}
        />
        
        <Typography className="authorName" component="h1">
          {authorInfo.name}
        </Typography>
        
        <Typography className="authorRole" component="h2">
          {authorInfo.role}
        </Typography>
      </Box>

      {/* Bio */}
      <Box sx={{ p: 3, borderBottom: '1px solid #dedede' }}>
        <Typography className="bioText">
          {authorInfo.bio}
        </Typography>
      </Box>

      {/* Icônes sociales */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          gap: 2,
          p: 2,
          borderBottom: '1px solid #dedede',
        }}
      >
        {authorInfo.social.map((social) => (
          <Link
            key={social.name}
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 40,
              height: 40,
              borderRadius: '50%',
              bgcolor: '#f5f5f5',
              color: '#333',
              transition: 'all 0.3s ease',
              '&:hover': {
                bgcolor: '#709425',
                color: '#fff',
                transform: 'translateY(-2px)',
              },
            }}
          >
            {/* TODO: Remplacer par les vraies icônes SVG */}
            <Typography variant="caption" sx={{ fontWeight: 600 }}>
              {social.icon.charAt(0).toUpperCase()}
            </Typography>
          </Link>
        ))}
      </Box>

      {/* Menu de navigation */}
      <Box sx={{ p: 2, borderBottom: '1px solid #dedede' }}>
        <Typography
          variant="overline"
          sx={{
            fontWeight: 600,
            color: '#666',
            fontSize: '0.7rem',
            letterSpacing: '1px',
            mb: 1,
            display: 'block',
          }}
        >
          NAVIGATION
        </Typography>
        
        {menuItems.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            sx={{
              display: 'block',
              py: 0.75,
              px: 1,
              color: '#333',
              textDecoration: 'none',
              fontSize: '0.9rem',
              fontWeight: 400,
              borderRadius: 1,
              transition: 'all 0.2s ease',
              '&:hover': {
                bgcolor: '#f5f5f5',
                color: '#709425',
                transform: 'translateX(4px)',
              },
            }}
          >
            {item.label}
          </Link>
        ))}
      </Box>

      {/* Stack technique */}
      <Box sx={{ p: 2, flex: 1 }}>
        <Typography
          variant="overline"
          sx={{
            fontWeight: 600,
            color: '#666',
            fontSize: '0.7rem',
            letterSpacing: '1px',
            mb: 1,
            display: 'block',
          }}
        >
          STACK TECHNIQUE
        </Typography>
        
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 0.5,
          }}
        >
          {authorInfo.stack.map((tech) => (
            <Typography
              key={tech}
              component="span"
              sx={{
                fontSize: '0.75rem',
                px: 1,
                py: 0.25,
                bgcolor: '#f0f0f0',
                color: '#555',
                borderRadius: '12px',
                fontWeight: 500,
              }}
            >
              {tech}
            </Typography>
          ))}
        </Box>
      </Box>

      {/* Bouton "Expand the box" */}
      <Box
        sx={{
          p: 2,
          textAlign: 'center',
          borderTop: '1px solid #dedede',
        }}
      >
        <IconButton
          onClick={toggleNavigatorShape}
          sx={{
            color: '#666',
            transition: 'all 0.3s ease',
            transform: isOpen ? 'rotate(0deg)' : 'rotate(180deg)',
            '&:hover': {
              color: '#709425',
              bgcolor: 'rgba(112, 148, 37, 0.1)',
            },
          }}
        >
          <ExpandMoreIcon />
        </IconButton>
        
        <Typography
          variant="caption"
          sx={{
            display: 'block',
            mt: 0.5,
            color: '#888',
            fontSize: '0.7rem',
            textTransform: 'uppercase',
            letterSpacing: '0.5px',
          }}
        >
          {isOpen ? 'Collapse' : 'Expand'} the box
        </Typography>
      </Box>
    </Box>
  )
}
