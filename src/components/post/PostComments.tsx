/**
 * PostComments - Composant de commentaires reproduisant le design Gatsby original
 * Basé sur src/components/Post/PostComments.js du starter de Greg Lobinski
 */
'use client'

import { Box } from '@mui/material'
import { useEffect, useRef } from 'react'

interface PostCommentsProps {
  slug: string
  facebookAppId?: string
}

export default function PostComments({ slug, facebookAppId }: PostCommentsProps) {
  const commentsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Charger le SDK Facebook si un App ID est fourni
    if (facebookAppId && typeof window !== 'undefined') {
      // Vérifier si le SDK Facebook est déjà chargé
      if (!(window as any).FB) {
        const script = document.createElement('script')
        script.src = 'https://connect.facebook.net/en_US/sdk.js'
        script.async = true
        script.defer = true
        script.crossOrigin = 'anonymous'
        
        script.onload = () => {
          ;(window as any).FB.init({
            appId: facebookAppId,
            autoLogAppEvents: true,
            xfbml: true,
            version: 'v18.0'
          })
        }
        
        document.head.appendChild(script)
      }
    }
  }, [facebookAppId])

  // Configuration pour les commentaires sans Facebook SDK
  const fallbackComments = (
    <Box
      sx={{
        backgroundColor: '#f8f9fa',
        border: '1px solid #e9ecef',
        borderRadius: '8px',
        color: '#6c757d',
        padding: '2rem',
        textAlign: 'center'
      }}
    >
      Les commentaires sont disponibles via Facebook.
      <br />
      <small>Configuration en cours...</small>
    </Box>
  )

  return (
    <Box
      id="post-comments"
      ref={commentsRef}
      sx={{
        // Reproduction exacte des styles postComments du theme original
        borderTop: '1px solid #ddd',
        margin: '3em 0 0',
        padding: '3em 0 0'
      }}
    >
      {facebookAppId ? (
        <div
          className="fb-comments"
          data-href={`${process.env.NEXT_PUBLIC_SITE_URL || 'https://mandjobore.dev'}${slug}`}
          data-width="100%"
          data-numposts="5"
          data-colorscheme="light"
        />
      ) : (
        fallbackComments
      )}
    </Box>
  )
}
