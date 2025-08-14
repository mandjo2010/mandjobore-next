import { ExpandMore as ExpandMoreIcon } from '@mui/icons-material'
import { Box, Typography, IconButton, Avatar, Link } from '@mui/material'
import * as React from 'react'

import { useSeparatorStyles } from '@/components/ui/SeparatorLine'
import { useNavigatorActions, useNavigatorState } from '@/store/ui'

/**
 * InfoBox - Sidebar gauche reproduisant exactement la structure Gatsby
 * Largeur: 320px, contient: Avatar, Bio, Menu, Stack, Bouton expand
 */
export default function InfoBox() {
  const { toggleNavigatorShape } = useNavigatorActions()
  const { isOpen } = useNavigatorState()
  const separatorStyles = useSeparatorStyles()

  const authorInfo = {
    avatar: '/images/avatar.svg',
    bio: `Passionné par le développement web moderne et l'analyse de données. 
          Spécialisé en React, Next.js, Python et technologies géospatiales.`,
    name: 'Mandjo Boré',
    role: 'Développeur Full-Stack & Data Analyst',
    social: [
      { icon: 'github', name: 'GitHub', url: 'https://github.com/mandjo2010' },
      { icon: 'linkedin', name: 'LinkedIn', url: 'https://linkedin.com/in/mandjo-bore' },
      { icon: 'twitter', name: 'Twitter', url: 'https://twitter.com/mandjo2010' },
    ],
    stack: [
      'JavaScript', 'TypeScript', 'React', 'Next.js', 
      'Python', 'Django', 'PostgreSQL', 'PostGIS',
      'QGIS', 'Leaflet', 'D3.js'
    ]
  }

  const menuItems = [
    { href: '/about', label: 'About' },
    { href: '/cartography', label: 'Cartography' },
    { href: '/portfolio', label: 'Portfolio' },
    { href: '/contact', label: 'Contact' },
  ]

  return (
    <Box
      sx={{
        bgcolor: '#ffffff',
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        overflow: 'hidden',
        position: 'relative',
        // Ajouter le séparateur vertical droit avec marges 20px
        ...separatorStyles.verticalRightSeparator,
      }}
    >
      {/* Header avec avatar et infos auteur */}
      <Box
        sx={{
          borderBottom: '1px solid #dedede',
          p: 3,
          textAlign: 'center',
        }}
      >
        <Avatar
          src={authorInfo.avatar}
          alt={authorInfo.name}
          sx={{
            border: '2px solid #709425',
            height: 80,
            mb: 2,
            mx: 'auto',
            width: 80,
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
      <Box sx={{ borderBottom: '1px solid #dedede', p: 3 }}>
        <Typography className="bioText">
          {authorInfo.bio}
        </Typography>
      </Box>

      {/* Icônes sociales */}
      <Box
        sx={{
          borderBottom: '1px solid #dedede',
          display: 'flex',
          gap: 2,
          justifyContent: 'center',
          p: 2,
        }}
      >
        {authorInfo.social.map((social) => (
          <Link
            key={social.name}
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
            sx={{
              '&:hover': {
                bgcolor: '#709425',
                color: '#fff',
                transform: 'translateY(-2px)',
              },
              alignItems: 'center',
              bgcolor: '#f5f5f5',
              borderRadius: '50%',
              color: '#333',
              display: 'flex',
              height: 40,
              justifyContent: 'center',
              transition: 'all 0.3s ease',
              width: 40,
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
      <Box sx={{ borderBottom: '1px solid #dedede', p: 2 }}>
        <Typography
          variant="overline"
          sx={{
            color: '#666',
            display: 'block',
            fontSize: '0.7rem',
            fontWeight: 600,
            letterSpacing: '1px',
            mb: 1,
          }}
        >
          NAVIGATION
        </Typography>
        
        {menuItems.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            sx={{
              '&:hover': {
                bgcolor: '#f5f5f5',
                color: '#709425',
                transform: 'translateX(4px)',
              },
              borderRadius: 1,
              color: '#333',
              display: 'block',
              fontSize: '0.9rem',
              fontWeight: 400,
              px: 1,
              py: 0.75,
              textDecoration: 'none',
              transition: 'all 0.2s ease',
            }}
          >
            {item.label}
          </Link>
        ))}
      </Box>

      {/* Stack technique */}
      <Box sx={{ flex: 1, p: 2 }}>
        <Typography
          variant="overline"
          sx={{
            color: '#666',
            display: 'block',
            fontSize: '0.7rem',
            fontWeight: 600,
            letterSpacing: '1px',
            mb: 1,
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
                bgcolor: '#f0f0f0',
                borderRadius: '12px',
                color: '#555',
                fontSize: '0.75rem',
                fontWeight: 500,
                px: 1,
                py: 0.25,
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
          borderTop: '1px solid #dedede',
          p: 2,
          textAlign: 'center',
        }}
      >
        <IconButton
          onClick={toggleNavigatorShape}
          sx={{
            '&:hover': {
              bgcolor: 'rgba(112, 148, 37, 0.1)',
              color: '#709425',
            },
            color: '#666',
            transform: isOpen ? 'rotate(0deg)' : 'rotate(180deg)',
            transition: 'all 0.3s ease',
          }}
        >
          <ExpandMoreIcon />
        </IconButton>
        
        <Typography
          variant="caption"
          sx={{
            color: '#888',
            display: 'block',
            fontSize: '0.7rem',
            letterSpacing: '0.5px',
            mt: 0.5,
            textTransform: 'uppercase',
          }}
        >
          {isOpen ? 'Collapse' : 'Expand'} the box
        </Typography>
      </Box>
    </Box>
  )
}
