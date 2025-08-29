import { useState } from 'react'
import Head from 'next/head'
import { Box, Typography, Button, Container } from '@mui/material'
import { ZoomIn, ZoomOut } from '@mui/icons-material'

import BaseTemplate from '@/components/layout/BaseTemplate'
import OrganicProfileBar from '@/components/layout/OrganicProfileBar'
import OrganicActionsBar from '@/components/layout/OrganicActionsBar'

export default function DemoOrganicZoomPage() {
  const [forceOrganicMode, setForceOrganicMode] = useState(false)

  const toggleOrganicMode = () => {
    setForceOrganicMode(!forceOrganicMode)
  }

  return (
    <>
      <Head>
        <title>Démonstration des formes organiques à 200% zoom - Mandjo Béa Boré</title>
        <meta 
          name="description" 
          content="Démonstration des barres latérales avec formes organiques rouges activées à 200% de zoom" 
        />
      </Head>

      <BaseTemplate
        seo={{
          title: "Démonstration Zoom 200% - Formes Organiques",
          description: "Test des barres latérales horizontales avec formes organiques rouges"
        }}
      >
        <Container maxWidth="md" sx={{ py: 4 }}>
          <Typography variant="h1" component="h1" gutterBottom>
            Démonstration des Formes Organiques
          </Typography>
          
          <Typography variant="h2" component="h2" gutterBottom sx={{ mt: 4 }}>
            Test du mode Zoom 200%
          </Typography>
          
          <Typography paragraph>
            Cette page démontre le comportement des barres latérales quand elles passent en mode horizontal 
            à 200% de zoom ou sur mobile.
          </Typography>

          <Box sx={{ my: 4, p: 3, bgcolor: 'background.paper', borderRadius: 2, border: 1, borderColor: 'divider' }}>
            <Typography variant="h3" gutterBottom>
              Instructions pour tester :
            </Typography>
            <ol>
              <li>
                <strong>Zoom navigateur :</strong> Utilisez Ctrl/Cmd + pour zoomer à 200% 
                (ou utilisez le bouton ci-dessous pour forcer le mode)
              </li>
              <li>
                <strong>Observer le changement :</strong> Les sidebars verticales deviennent des barres horizontales
              </li>
              <li>
                <strong>Formes organiques :</strong> 
                <ul>
                  <li>Barre supérieure : Profil dans une bulle rouge organique (gauche) + Navigation (droite)</li>
                  <li>Barre inférieure : Actions de navigation (gauche) + Outils (droite)</li>
                </ul>
              </li>
            </ol>
          </Box>

          <Box sx={{ my: 4, display: 'flex', gap: 2, flexWrap: 'wrap' }}>
            <Button
              variant={forceOrganicMode ? "contained" : "outlined"}
              startIcon={forceOrganicMode ? <ZoomOut /> : <ZoomIn />}
              onClick={toggleOrganicMode}
              color="primary"
            >
              {forceOrganicMode ? 'Désactiver' : 'Activer'} le mode organique
            </Button>
          </Box>

          <Typography variant="h3" component="h3" gutterBottom sx={{ mt: 4 }}>
            Caractéristiques des formes organiques :
          </Typography>
          
          <ul>
            <li><strong>Couleur :</strong> Rouge (#dc2626) pour les contenants</li>
            <li><strong>Formes :</strong> Contours irréguliers et fluides (non rectangulaires)</li>
            <li><strong>Position :</strong> Fixées en haut et en bas de l'écran</li>
            <li><strong>Contenu :</strong> Texte et icônes en blanc pour le contraste</li>
            <li><strong>Interactivité :</strong> Boutons avec effets de survol</li>
            <li><strong>Accessibilité :</strong> Support des modes réduits d'animation et haut contraste</li>
          </ul>

          <Box sx={{ my: 4, p: 3, bgcolor: 'info.main', color: 'info.contrastText', borderRadius: 2 }}>
            <Typography variant="h4" gutterBottom>
              💡 Astuce
            </Typography>
            <Typography>
              Pour voir l'effet complet, zoomez votre navigateur à 200% ou activez le mode de démonstration 
              avec le bouton ci-dessus. Les formes organiques remplacent automatiquement les barres 
              latérales classiques pour une expérience utilisateur optimisée.
            </Typography>
          </Box>

          <Typography paragraph sx={{ mt: 4 }}>
            Ce design combine fonctionnalité et esthétique moderne avec des formes organiques qui 
            s'adaptent intelligemment selon le niveau de zoom de l'utilisateur.
          </Typography>
        </Container>
      </BaseTemplate>

      {/* Affichage forcé des composants organiques pour démonstration */}
      {forceOrganicMode && (
        <>
          <OrganicProfileBar isVisible={true} />
          <OrganicActionsBar isVisible={true} categories={['tech', 'design', 'data']} />
        </>
      )}
    </>
  )
}
