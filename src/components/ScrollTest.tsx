/**
 * Test de la barre de défilement - Composant simple pour tester
 */
'use client'

import { Box } from '@mui/material'
import React from 'react'

export default function ScrollTest() {
  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        right: 0,
        width: '300px',
        height: '100vh',
        backgroundColor: '#ffffff',
        border: '2px solid #ff0000', // Bordure rouge pour voir le composant
        
        // Test de défilement avec barre TRÈS visible
        overflowY: 'auto',
        overflowX: 'hidden',
        
        // Barre de défilement TRÈS visible pour test
        '&::-webkit-scrollbar': {
          width: '20px' // Très large
        },
        
        '&::-webkit-scrollbar-track': {
          background: '#ff0000', // Rouge pour test
        },
        
        '&::-webkit-scrollbar-thumb': {
          background: '#0000ff', // Bleu pour test
          borderRadius: '10px',
          
          '&:hover': {
            background: '#000000' // Noir au hover
          }
        },
        
        // Pour Firefox
        scrollbarWidth: 'auto',
        scrollbarColor: '#0000ff #ff0000'
      }}
    >
      <div style={{ padding: '20px' }}>
        <h2>🔍 Test Barre de Défilement</h2>
        <p>Cette zone devrait avoir une barre de défilement TRÈS visible :</p>
        <ul>
          <li>Track ROUGE</li>
          <li>Thumb BLEU</li>
          <li>Largeur 20px</li>
        </ul>
        
        {/* Contenu long pour forcer le défilement */}
        {Array.from({ length: 100 }, (_, i) => (
          <div 
            key={i} 
            style={{ 
              padding: '10px', 
              margin: '5px 0',
              backgroundColor: i % 2 === 0 ? '#f0f0f0' : '#e0e0e0',
              borderRadius: '4px'
            }}
          >
            📝 Ligne de test #{i + 1} - Contenu pour forcer le défilement vertical
          </div>
        ))}
      </div>
    </Box>
  )
}
