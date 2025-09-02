/**
 * PostFooter - Pied d'article reproduisant le design Gatsby original
 * Basé sur src/components/Post/PostFooter.js du starter de Greg Lobinski
 */
'use client'

import { Box } from '@mui/material'
import PostShare from './PostShare'
import PostAuthor from './PostAuthor'
import PostComments from './PostComments'

interface PostFooterProps {
  post: {
    title: string
    excerpt?: string
    slug: string
  }
  author?: {
    name: string
    bio: string
    avatar: string
  }
  facebookAppId?: string
}

export default function PostFooter({ 
  post, 
  author,
  facebookAppId
}: PostFooterProps) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://mandjobore.dev'
  const fullUrl = `${siteUrl}${post.slug}`

  return (
    <Box
      component="footer"
      sx={{
        // Reproduction exacte des styles footer du theme original
        color: 'var(--main-footer-color)', // theme.main.colors.footer
        fontSize: '1em', // theme.main.fonts.footer.size
        lineHeight: 1.4, // theme.main.fonts.footer.lineHeight
        '& p': {
          margin: 0
        }
      }}
    >
      {/* Partage social */}
      <PostShare 
        url={fullUrl}
        title={post.title}
        excerpt={post.excerpt}
      />
      
      {/* Informations auteur */}
      <PostAuthor author={author} />
      
      {/* Commentaires */}
      <PostComments 
        slug={post.slug}
        facebookAppId={facebookAppId}
      />
    </Box>
  )
}
