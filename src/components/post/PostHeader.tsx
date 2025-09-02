/**
 * PostHeader - En-tête des articles reproduisant le design Gatsby original
 * Basé sur src/components/Post/PostHeader.js du starter de Greg Lobinski
 */
'use client'

import { Box, Typography } from '@mui/material'

interface PostHeaderProps {
  title: string
  subTitle?: string
  date: string
}

export default function PostHeader({ title, subTitle, date }: PostHeaderProps) {
  const formatDate = (dateString: string) => {
    try {
      const dateObj = new Date(dateString)
      return dateObj.toUTCString().split(' ').slice(0, 4).join(' ')
    } catch {
      return dateString
    }
  }

  return (
    <Box
      component="header"
      sx={{
        margin: '0 0 3em'
      }}
    >
      {/* Titre principal - Spécifications exactes: 27px, line-height 31px */}
      <Typography
        component="h1"
        className="post-title"
        sx={{
          letterSpacing: '-0.04em',
          margin: '0 0 0.4em'
        }}
      >
        {title}
      </Typography>

      {/* Sous-titre - Spécifications exactes: 23px, line-height 27px */}
      {subTitle && (
        <Typography
          component="h2"
          className="blog-subtitle article-subtitle post-subtitle"
          sx={{
            color: 'rgb(85, 85, 85) !important', // Force la couleur
            fontFamily: '"Open Sans" !important', // Force la police
            fontSize: '23px !important', // Force la taille exacte
            fontStyle: 'normal !important', // Style normal
            fontWeight: '300 !important', // Force le poids
            lineHeight: '27px !important', // Force la hauteur de ligne exacte
            margin: '0 0 1em !important',
            // Override MUI Typography default styles
            '&.MuiTypography-root': {
              fontSize: '23px !important',
              fontWeight: '300 !important',
              lineHeight: '27px !important'
            }
          }}
        >
          {subTitle}
        </Typography>
      )}

      {/* Date - Basé sur les specs meta du thème */}
      <Typography
        component="div"
        sx={{
          color: 'rgb(85, 85, 85)',
          fontFamily: '"Open Sans"',
          fontSize: '14px', // Taille cohérente avec le système
          fontWeight: 400 // Normal pour les métadonnées
        }}
      >
        {formatDate(date)}
      </Typography>
    </Box>
  )
}
