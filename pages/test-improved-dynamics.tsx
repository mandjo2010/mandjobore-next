import { Box, Button, Typography, Paper, Stack } from '@mui/material'
/**
 * Page de test pour les nouvelles dynamiques améliorées
 * Tests : InfoBox expansion/collapse, ActionsBar contextuelle, animations
 */
import { useState } from 'react'

import GatsbyLayoutNew from '@/components/layout/GatsbyLayoutNew'
import { useGatsbyUIStore } from '@/store/gatsby-ui-store'

export default function TestImprovedDynamics() {
  const { 
    featureNavigator, 
    isInfoBoxExpanded, 
    isTransitioning,
    moveNavigatorAside,
    navigatorPosition,
    resetToHome,
    setInfoBoxExpanded
  } = useGatsbyUIStore()

  return (
    <GatsbyLayoutNew>
      <Box
        sx={{
          margin: '0 auto',
          maxWidth: '800px',
          padding: '40px'
        }}
      >
        <Typography variant="h4" sx={{ color: '#333', marginBottom: '30px' }}>
          Test des Dynamiques Améliorées
        </Typography>

        {/* État actuel */}
        <Paper sx={{ marginBottom: '30px', padding: '20px' }}>
          <Typography variant="h6" sx={{ marginBottom: '15px' }}>
            État Actuel
          </Typography>
          <Stack spacing={1}>
            <Typography>
              <strong>Navigator Position:</strong> {navigatorPosition}
            </Typography>
            <Typography>
              <strong>InfoBox Expanded:</strong> {isInfoBoxExpanded ? 'Oui' : 'Non'}
            </Typography>
            <Typography>
              <strong>Is Transitioning:</strong> {isTransitioning ? 'Oui' : 'Non'}
            </Typography>
          </Stack>
        </Paper>

        {/* Tests Navigator */}
        <Paper sx={{ marginBottom: '30px', padding: '20px' }}>
          <Typography variant="h6" sx={{ marginBottom: '15px' }}>
            Tests Navigator
          </Typography>
          <Stack direction="row" spacing={2}>
            <Button 
              variant="contained" 
              onClick={featureNavigator}
              disabled={navigatorPosition === 'is-featured'}
            >
              Mode Article (Featured)
            </Button>
            <Button 
              variant="outlined" 
              onClick={moveNavigatorAside}
              disabled={navigatorPosition === 'is-aside'}
            >
              Mode Sidebar (Aside)
            </Button>
            <Button 
              variant="contained" 
              color="secondary"
              onClick={resetToHome}
            >
              Reset Complet
            </Button>
          </Stack>
        </Paper>

        {/* Tests InfoBox */}
        <Paper sx={{ marginBottom: '30px', padding: '20px' }}>
          <Typography variant="h6" sx={{ marginBottom: '15px' }}>
            Tests InfoBox
          </Typography>
          <Stack direction="row" spacing={2}>
            <Button 
              variant="contained" 
              onClick={() => setInfoBoxExpanded(true)}
              disabled={isInfoBoxExpanded}
            >
              Expand InfoBox
            </Button>
            <Button 
              variant="outlined" 
              onClick={() => setInfoBoxExpanded(false)}
              disabled={!isInfoBoxExpanded}
            >
              Collapse InfoBox
            </Button>
          </Stack>
        </Paper>

        {/* Instructions */}
        <Paper sx={{ backgroundColor: '#f8f9fa', padding: '20px' }}>
          <Typography variant="h6" sx={{ marginBottom: '15px' }}>
            Instructions de Test
          </Typography>
          <Stack spacing={1}>
            <Typography>
              1. <strong>Mode Article:</strong> Cliquez sur "Mode Article" pour voir l'InfoBox se réduire et l'ActionsBar afficher le contrôle de police
            </Typography>
            <Typography>
              2. <strong>InfoBox Dynamics:</strong> Utilisez les flèches dans l'InfoBox pour l'expand/collapse
            </Typography>
            <Typography>
              3. <strong>ActionsBar Context:</strong> Observez les différentes icônes selon le mode (Filter en page d'accueil, Font Size en article)
            </Typography>
            <Typography>
              4. <strong>Reset:</strong> Le bouton "Reset Complet" remet tout à zéro avec animations
            </Typography>
            <Typography>
              5. <strong>Responsive:</strong> Réduisez la fenêtre pour voir le comportement mobile
            </Typography>
          </Stack>
        </Paper>

        {/* Simulation de contenu d'article */}
        <Box sx={{ marginTop: '40px' }}>
          <Typography variant="h5" sx={{ marginBottom: '20px' }}>
            Contenu de Test
          </Typography>
          <Typography sx={{ lineHeight: 1.7, marginBottom: '20px' }}>
            Ce contenu simule un article pour tester la dynamique de lecture. 
            Lorsque vous passez en mode article, l'InfoBox se réduit et l'ActionsBar 
            affiche les contrôles spécifiques à la lecture comme la taille de police.
          </Typography>
          <Typography sx={{ lineHeight: 1.7, marginBottom: '20px' }}>
            L'animation entre les états doit être fluide et la navigation intuitive. 
            Le bouton Home dans l'ActionsBar permet de revenir à l'état initial 
            avec un reset complet de l'interface.
          </Typography>
          <Typography sx={{ lineHeight: 1.7 }}>
            Testez également le responsive design en réduisant la largeur de la fenêtre. 
            Les sidebars disparaissent automatiquement sur mobile pour une 
            expérience optimale.
          </Typography>
        </Box>
      </Box>
    </GatsbyLayoutNew>
  )
}
