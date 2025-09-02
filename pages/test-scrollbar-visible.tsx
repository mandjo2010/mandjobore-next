import { Box, Typography } from '@mui/material'
import Head from 'next/head'
import * as React from 'react'

/**
 * PAGE DE TEST - BARRE DE DÉFILEMENT NAVIGATOR VISIBLE
 * Cette page teste que la barre de défilement apparaît uniquement dans le Navigator
 * grâce à l'exception créée dans scrollbar-hidden.css
 */

export default function TestScrollbarVisible() {
  return (
    <>
      <Head>
        <title>Test - Barre de défilement Navigator visible</title>
      </Head>
      
      <Box sx={{ fontFamily: 'Arial, sans-serif', padding: '20px' }}>
        <Typography variant="h1" sx={{ fontSize: '2rem', mb: 3 }}>
          🔍 Test - Barre auto-hide Navigator (comme VS Code)
        </Typography>
        
        <Typography variant="body1" sx={{ mb: 3 }}>
          Cette page teste notre solution <strong>auto-hide</strong> pour la barre de défilement.
          Comme dans VS Code, la barre n'apparaît que quand vous survolez la zone avec le curseur !
        </Typography>
        
        {/* Zone normale - PAS de barre de défilement */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h2" sx={{ fontSize: '1.5rem', mb: 2 }}>
            📝 Zone normale (sans barre)
          </Typography>
          <Box 
            sx={{ 
              backgroundColor: '#f9f9f9', 
              border: '1px solid #ccc', 
              height: '150px',
              overflowY: 'auto',
              padding: '10px'
            }}
          >
            {Array.from({ length: 20 }, (_, i) => (
              <div key={i}>Ligne {i + 1} - Cette zone ne devrait PAS avoir de barre de défilement visible</div>
            ))}
          </Box>
        </Box>
        
        {/* Zone Navigator - AVEC barre auto-hide */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h2" sx={{ fontSize: '1.5rem', mb: 2 }}>
            ✨ Zone Navigator (barre auto-hide)
          </Typography>
          <Typography variant="body2" sx={{ color: '#666', fontStyle: 'italic', mb: 2 }}>
            🖱️ Survolez cette zone avec votre curseur pour voir apparaître la barre de défilement !
          </Typography>
          <Box 
            className="navigator"
            sx={{ 
              backgroundColor: '#fff', 
              border: '2px solid #4CAF50', 
              height: '200px',
              overflowY: 'auto',
              padding: '10px'
            }}
          >
            {Array.from({ length: 30 }, (_, i) => (
              <div key={i} style={{ padding: '5px 0' }}>
                📄 Article {i + 1} - Survolez pour voir la barre auto-hide !
              </div>
            ))}
          </Box>
        </Box>
        
        <Typography variant="body2" sx={{ color: '#666', fontStyle: 'italic' }}>
          ✅ Attendu : La zone verte révèle sa barre de défilement SEULEMENT au survol<br/>
          ✅ Attendu : La zone grise n'affiche JAMAIS de barre de défilement<br/>
          ✨ Comportement comme VS Code : Auto-hide avec transition fluide !
        </Typography>
      </Box>
    </>
  )
}
