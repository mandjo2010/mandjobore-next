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
  authorContent?: string // Contenu markdown depuis content/parts/author.md
}

export default function PostAuthor({ author, authorContent }: PostAuthorProps) {
  // Configuration par défaut comme dans l'original
  const defaultAuthor = {
    avatar: '/images/jpg/avatar.jpg',
    bio: authorContent || '**Hello**, I am Mandjo and I am an aficionado of data science and programming. I enjoy coding and the challenge of learning something new every day.',
    name: 'Mandjo Béa Boré'
  }

  const authorInfo = author || defaultAuthor

  return (
    <Box
      sx={{
        '& a': {
          color: 'var(--base-link-color)' // theme.base.colors.link
        },
        // Responsive: row sur desktop
        '@media (min-width: 768px)': { // theme.mediaQueryTresholds.M
          flexDirection: 'row',
          justifyContent: 'center'
        },
        // Reproduction exacte des styles author du theme original
        alignItems: 'center',
        borderTop: '1px solid #ddd',
        display: 'flex',
        flexDirection: 'column',
        margin: '3em 0 0',
        padding: '3em 0 0'
      }}
    >
      {/* Avatar avec style organique comme l'original */}
      <Avatar
        src={authorInfo.avatar}
        alt={authorInfo.name}
        sx={{
          '@media (min-width: 768px)': { // theme.mediaQueryTresholds.M
            margin: '0 1em 0'
          },
          // Reproduction exacte des styles avatar du theme original
          border: '1px solid #ddd',
          borderRadius: '75% 65%', // Style organique caractéristique
          flexShrink: 0,
          height: '60px',
          margin: '0 1em 1em',
          width: '60px'
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
        {/* Bio auteur - Spécifications exactes: 15px, line-height 23px, weight 300 */}
        <Typography
          className="author-bio"
          sx={{
            '& strong, & b': {
              fontWeight: 300 // Forcer le non-gras même pour les balises strong/b
            },
            color: 'rgb(85, 85, 85)', // Exact selon styles.txt
            fontFamily: '"Open Sans"', // Exact selon styles.txt
            fontSize: '15px', // Exact selon styles.txt
            fontWeight: 300, // Exact selon styles.txt
            lineHeight: '23px', // Exact selon styles.txt
            margin: 0,
            textAlign: 'justify' // Justification du texte
          }}
          dangerouslySetInnerHTML={{ __html: authorInfo.bio }}
        />
      </Box>
    </Box>
  )
}
