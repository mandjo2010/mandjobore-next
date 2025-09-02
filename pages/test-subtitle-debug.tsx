import React from 'react'
import { Typography, Box } from '@mui/material'
import LayoutWrapper from '@/components/LayoutWrapper/LayoutWrapper'

export default function SubtitleDebugPage() {
  return (
    <LayoutWrapper>
      <Box sx={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
        <Typography variant="h1" component="h1" className="blog-title">
          Test Titre Principal (27px, weight 600)
        </Typography>
        
        <Typography variant="h2" component="h2" className="blog-subtitle article-subtitle post-subtitle">
          Test Sous-titre (23px, weight 300)
        </Typography>

        <h2 className="blog-subtitle">
          Test h2 avec classe CSS directe
        </h2>

        <h2 style={{ 
          fontFamily: '"Open Sans"',
          fontSize: '23px',
          fontWeight: '300',
          lineHeight: '27px',
          color: 'rgb(85, 85, 85)'
        }}>
          Test h2 avec styles inline
        </h2>

        <div>
          <h2>Test h2 sans classe (devrait être 23px/300)</h2>
        </div>

        <article>
          <header>
            <h2>Test h2 dans article header</h2>
          </header>
        </article>

        <Typography 
          component="h2" 
          sx={{
            fontFamily: '"Open Sans" !important',
            fontSize: '23px !important',
            fontWeight: '300 !important',
            lineHeight: '27px !important',
            color: 'rgb(85, 85, 85) !important'
          }}
        >
          Test Typography h2 avec sx
        </Typography>
      </Box>
    </LayoutWrapper>
  )
} 