/**
 * Page de test finale pour valider la correction InfoBox/InfoBar
 * Reproduit exactement les comportements du starter Gatsby
 */
'use client'

import { Box, Typography, Button, Container } from '@mui/material'
import React from 'react'

import InfoBar from '@/components/InfoBar/InfoBar'
import InfoBox from '@/components/InfoBox/InfoBox'
import { useGatsbyUIStore } from '@/store/gatsby-ui-store'

// Pages de test
const testPages = [
  { menuTitle: 'About me', slug: 'about', title: 'About' },
  { slug: 'portfolio', title: 'Portfolio' },
  { slug: 'blog', title: 'Blog' }
]

const testParts = [
  { html: '<p>Bio de test pour InfoBox</p>', title: 'info' }
]

export default function TestFinalInfoBoxInfoBar() {
  const { 
    featureNavigator, 
    moveNavigatorAside, 
    navigatorPosition, 
    navigatorShape,
    setNavigatorPosition,
    setNavigatorShape 
  } = useGatsbyUIStore()

  return (
    <Box sx={{ minHeight: '100vh', position: 'relative' }}>
      {/* InfoBox - Sidebar desktop */}
      <InfoBox pages={testPages} parts={testParts} />
      
      {/* InfoBar - Barre mobile */}
      <InfoBar pages={testPages} />
      
      {/* Contenu principal */}
      <Container
        maxWidth="lg"
        sx={{
          marginLeft: { lg: '320px', xs: 0 },
          minHeight: '100vh',
          padding: { lg: '40px', xs: '80px 20px 20px' }
        }}
      >
        <Typography variant="h3" gutterBottom>
          Test Final InfoBox/InfoBar
        </Typography>
        
        <Typography variant="h5" color="text.secondary" gutterBottom>
          Validation de la logique "Expand the box"
        </Typography>

        <Box sx={{ marginBottom: 4 }}>
          <Typography variant="h6" gutterBottom>
            État actuel :
          </Typography>
          <Typography>
            <strong>navigatorPosition:</strong> {navigatorPosition}
          </Typography>
          <Typography>
            <strong>navigatorShape:</strong> {navigatorShape}
          </Typography>
          <Typography sx={{ backgroundColor: '#f5f5f5', borderRadius: 1, marginTop: 2, padding: 2 }}>
            <strong>Logique "Expand the box" :</strong><br />
            • Le bouton "Expand the box" apparaît UNIQUEMENT quand navigatorPosition = "is-aside" ET navigatorShape = "open"<br />
            • Cela correspond au mode "article ouvert" dans Gatsby<br />
            • À la page d'accueil (is-featured), le bouton n'est PAS visible<br />
            • Cliquer sur "Expand the box" exécute setNavigatorShape("closed")
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, marginBottom: 4 }}>
          <Button
            variant="contained"
            onClick={() => {
              setNavigatorPosition('is-featured')
              setNavigatorShape('open')
            }}
          >
            Mode Accueil (is-featured + open)
          </Button>
          
          <Button
            variant="outlined"
            onClick={() => {
              setNavigatorPosition('is-aside')
              setNavigatorShape('open')
            }}
          >
            Mode Article (is-aside + open)
          </Button>
          
          <Button
            variant="outlined"
            onClick={() => {
              setNavigatorPosition('is-aside')
              setNavigatorShape('closed')
            }}
          >
            Mode Article Fermé (is-aside + closed)
          </Button>
        </Box>

        <Box sx={{ marginBottom: 4 }}>
          <Typography variant="h6" gutterBottom>
            Actions Gatsby :
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
            <Button onClick={featureNavigator}>
              featureNavigator() - Retour accueil
            </Button>
            <Button onClick={moveNavigatorAside}>
              moveNavigatorAside() - Vue article
            </Button>
          </Box>
        </Box>

        <Box sx={{ marginBottom: 4 }}>
          <Typography variant="h6" gutterBottom>
            Tests à effectuer :
          </Typography>
          <ol>
            <li>À l'accueil (is-featured + open) : Le bouton "Expand the box" ne doit PAS être visible</li>
            <li>En mode article (is-aside + open) : Le bouton "Expand the box" doit être visible à côté de l'avatar</li>
            <li>Cliquer sur "Expand the box" doit restaurer la box complète (navigatorShape = "closed")</li>
            <li>L'avatar et le titre doivent changer de position selon l'état</li>
            <li>InfoBar doit être visible sur mobile seulement</li>
            <li>InfoBox doit être visible sur desktop seulement</li>
          </ol>
        </Box>

        <Box sx={{ 
          backgroundColor: navigatorPosition === 'is-aside' && navigatorShape === 'open' ? '#e3f2fd' : '#f5f5f5', 
          border: navigatorPosition === 'is-aside' && navigatorShape === 'open' ? '2px solid #2196f3' : '1px solid #e0e0e0',
          borderRadius: 1,
          padding: 3
        }}>
          <Typography variant="h6" gutterBottom>
            Bouton "Expand the box" doit être visible :
          </Typography>
          <Typography variant="h4" sx={{ 
            color: navigatorPosition === 'is-aside' && navigatorShape === 'open' ? '#2196f3' : '#f44336',
            fontWeight: 'bold'
          }}>
            {navigatorPosition === 'is-aside' && navigatorShape === 'open' ? '✅ OUI' : '❌ NON'}
          </Typography>
          <Typography sx={{ marginTop: 1 }}>
            État requis : navigatorPosition = "is-aside" AND navigatorShape = "open"
          </Typography>
        </Box>
      </Container>
    </Box>
  )
}
