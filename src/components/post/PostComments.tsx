/**
 * PostComments - Composant de commentaires reproductible du design Gatsby original
 * Support pour multiple fournisseurs : Facebook, Disqus, Giscus
 */
'use client'

import { Box, Typography } from '@mui/material'
import { useEffect, useRef } from 'react'

import DisqusComments from './DisqusComments'
import GiscusComments from './GiscusComments'

interface PostCommentsProps {
  slug: string
  title: string
  facebookAppId?: string
}

export default function PostComments({ facebookAppId, slug, title }: PostCommentsProps) {
  const commentsRef = useRef<HTMLDivElement>(null)
  const provider = process.env.NEXT_PUBLIC_COMMENTS_PROVIDER || 'none'

  useEffect(() => {
    // Charger le SDK Facebook si nécessaire
    if (provider === 'facebook' && facebookAppId && typeof window !== 'undefined') {
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
            version: 'v18.0',
            xfbml: true
          })
        }
        
        document.head.appendChild(script)
      }
    }
  }, [provider, facebookAppId])

  // Rendu conditionnel selon le fournisseur choisi
  const renderComments = () => {
    switch (provider) {
      case 'facebook':
        if (!facebookAppId) {
          return (
            <Box sx={{ py: 3, textAlign: 'center' }}>
              <Typography color="text.secondary">
                Configuration Facebook requise pour les commentaires.
              </Typography>
            </Box>
          )
        }
        return (
          <div
            className="fb-comments"
            data-href={`${process.env.NEXT_PUBLIC_SITE_URL || 'https://mandjobore.com'}/posts/${slug}`}
            data-width="100%"
            data-numposts="5"
            data-colorscheme="light"
          />
        )

      case 'disqus':
        return <DisqusComments slug={slug} title={title} />

      case 'giscus':
        return <GiscusComments slug={slug} />

      case 'none':
      default:
        return (
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
            <Typography variant="body1" gutterBottom>
              💬 Espace de discussion
            </Typography>
            <Typography variant="body2">
              Les commentaires seront bientôt disponibles.
              <br />
              <small>En attendant, n'hésitez pas à me contacter par email ou sur les réseaux sociaux !</small>
            </Typography>
          </Box>
        )
    }
  }
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
      {/* Titre de la section commentaires */}
      <Typography
        variant="h5"
        component="h3"
        sx={{
          color: '#555555',
          fontFamily: '"Open Sans"',
          fontSize: '20px',
          fontWeight: 600,
          letterSpacing: '-0.02em',
          lineHeight: '24px',
          marginBottom: '1.5em',
          textAlign: 'center'
        }}
      >
        Commentaires
      </Typography>
      
      {/* Composant de commentaires selon le fournisseur choisi */}
      {renderComments()}
    </Box>
  )
}
