/**
 * PostAuthor - Informations auteur reproduisant le design Gatsby original
 * Basé sur src/components/Post/PostAuthor.js du starter de Greg Lobinski
 */
'use client'

import { Box, Typography, Avatar } from '@mui/material'

interface PostAuthorProps {
  author?: {
    name: string
    bio: string
    avatar: string
  }
}

export default function PostAuthor({ author }: PostAuthorProps) {
  // Configuration par défaut comme dans l'original
  const defaultAuthor = {
    name: 'Mandjo Béa Boré',
    bio: 'Data Analyst & Developer. design and build geospatial applications with modern web technologies.',
    avatar: '/images/jpg/avatar.jpg'
  }

  const authorInfo = author || defaultAuthor

  return (
    <Box
      sx={{
        // Reproduction exacte des styles author du theme original
        alignItems: 'center',
        borderTop: '1px solid #ddd',
        display: 'flex',
        flexDirection: 'column',
        margin: '3em 0 0',
        padding: '3em 0 0',
        // Responsive: row sur desktop
        '@media (min-width: 768px)': { // theme.mediaQueryTresholds.M
          flexDirection: 'row',
          justifyContent: 'center'
        },
        '& a': {
          color: 'var(--base-link-color)' // theme.base.colors.link
        }
      }}
    >
      {/* Avatar avec style organique comme l'original */}
      <Avatar
        src={authorInfo.avatar}
        alt={authorInfo.name}
        sx={{
          // Reproduction exacte des styles avatar du theme original
          border: '1px solid #ddd',
          borderRadius: '75% 65%', // Style organique caractéristique
          flexShrink: 0,
          height: '60px',
          margin: '0 1em 1em',
          width: '60px',
          '@media (min-width: 768px)': { // theme.mediaQueryTresholds.M
            margin: '0 1em 0'
          }
        }}
      />

      {/* Informations auteur */}
      <Box
        sx={{
          alignItems: 'center',
          display: 'flex',
          flexDirection: 'column',
          minHeight: '50px'
        }}
      >
        {/* Nom auteur - Spécifications exactes: 27px, line-height 31px, weight 300 */}
        <Typography
          component="h3"
          sx={{
            color: 'rgb(85, 85, 85)', // Exact selon styles.txt
            fontFamily: '"Open Sans"', // Exact selon styles.txt
            fontSize: '27px', // Exact selon styles.txt
            fontWeight: 300, // Exact selon styles.txt
            lineHeight: '31px', // Exact selon styles.txt - cohérent avec titre article
            margin: '0 0 0.5em 0'
          }}
        >
          {authorInfo.name}
        </Typography>
        
        {/* Bio auteur - Spécifications exactes: 15px, line-height 23px, weight 300 */}
        <Typography
          className="author-bio"
          sx={{
            color: 'rgb(85, 85, 85)', // Exact selon styles.txt
            fontFamily: '"Open Sans"', // Exact selon styles.txt
            fontSize: '15px', // Exact selon styles.txt
            fontWeight: 300, // Exact selon styles.txt
            lineHeight: '23px', // Exact selon styles.txt
            margin: 0,
            textAlign: 'center',
            '& strong, & b': {
              fontWeight: 300 // Forcer le non-gras même pour les balises strong/b
            }
          }}
          dangerouslySetInnerHTML={{ __html: authorInfo.bio }}
        />
      </Box>
    </Box>
  )
}
