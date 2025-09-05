/**
 * PostShare - Partage social reproduisant le design Gatsby original
 * Basé sur src/components/Post/PostShare.js du starter de Greg Lobinski
 */
'use client'

import { Box, Typography } from '@mui/material'
import {
  FacebookShareButton,
  LinkedinShareButton,
  TwitterShareButton,
  FacebookIcon,
  LinkedinIcon,
  TwitterIcon,
} from 'react-share'

export default function PostShare({
  excerpt,
  title,
  url,
}: {
  url: string
  title: string
  excerpt?: string
}) {
  const size = 36
  
  return (
    <Box
      sx={{
        // Reproduction exacte des styles postShare du theme original
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'row',
        gap: '1rem',
        justifyContent: 'center',
        margin: '3em 0 0',
        padding: '3em 0 0'
      }}
    >
      {/* Titre SHARE - Style Gatsby original */}
      <Typography
        variant="overline"
        sx={{
          color: '#666666',
          fontSize: '0.75em',
          fontWeight: 600,
          letterSpacing: '0.3em',
          textTransform: 'uppercase'
        }}
      >
        SHARE
      </Typography>
      
      {/* Boutons de partage */}
      <Box
        sx={{
          alignItems: 'center',
          display: 'flex',
          gap: '12px',
          justifyContent: 'center'
        }}
      >
        <TwitterShareButton url={url} title={title}>
          <TwitterIcon round size={size} />
        </TwitterShareButton>
        <FacebookShareButton url={url} hashtag={`${title} - ${excerpt ?? ''}`}>
          <FacebookIcon round size={size} />
        </FacebookShareButton>
        <LinkedinShareButton url={url} title={title} summary={excerpt}>
          <LinkedinIcon round size={size} />
        </LinkedinShareButton>
      </Box>
    </Box>
  )
}
