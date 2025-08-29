import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import BaseTemplate from '@/components/layout/BaseTemplate';
import ActionsBar from '@/components/layout/ActionsBar';
import ProfileSidebar from '@/components/layout/ProfileSidebar';

export default function TestZoom200Page() {
  const [zoomLevel, setZoomLevel] = React.useState(100);

  const handleSimulateZoom = (level: number) => {
    setZoomLevel(level);
    // Simuler le zoom en ajustant la taille du viewport
    const viewport = document.querySelector('meta[name="viewport"]');
    if (viewport) {
      const scale = 100 / level;
      viewport.setAttribute('content', `width=device-width, initial-scale=${scale}, user-scalable=yes`);
    }
  };

  return (
    <BaseTemplate
      seo={{
        title: "Test Zoom 200% - Sidebars Horizontal",
        description: "Page de test pour vérifier le comportement des sidebars à 200% de zoom"
      }}
      left={<ProfileSidebar />}
      right={<ActionsBar categories={['tech', 'design', 'gis']} />}
    >
      <Box sx={{ p: 3 }}>
        <Typography variant="h1" gutterBottom>
          Test de Zoom à 200%
        </Typography>
        
        <Typography variant="body1" paragraph>
          Cette page permet de tester le comportement des sidebars lorsque l'utilisateur zoome à 200%.
          À ce niveau de zoom, les sidebars doivent passer en mode horizontal :
        </Typography>

        <Box sx={{ mb: 3 }}>
          <Typography variant="h2" gutterBottom>
            Comportement attendu à 200% de zoom :
          </Typography>
          <ul>
            <li><strong>ProfileSidebar</strong> : Passe en mode horizontal et s'affiche en haut de l'écran</li>
            <li><strong>ActionsBar</strong> : Passe en mode horizontal et s'affiche en bas de l'écran</li>
            <li><strong>Contenu principal</strong> : Prend toute la largeur entre les deux barres horizontales</li>
          </ul>
        </Box>

        <Box sx={{ mb: 3 }}>
          <Typography variant="h2" gutterBottom>
            Instructions de test :
          </Typography>
          <ol>
            <li>Utilisez Ctrl/Cmd + Plus pour zoomer à 200% dans votre navigateur</li>
            <li>Observez le passage automatique en mode horizontal des sidebars</li>
            <li>Vérifiez que tous les éléments restent accessibles et bien disposés</li>
            <li>Testez les interactions avec les boutons et dropdowns</li>
          </ol>
        </Box>

        <Box sx={{ mb: 3 }}>
          <Typography variant="h2" gutterBottom>
            Détails techniques :
          </Typography>
          <Typography variant="body1" paragraph>
            La détection se base sur :
          </Typography>
          <ul>
            <li><code>window.devicePixelRatio</code> ≥ 1.8 (indicateur de zoom élevé)</li>
            <li><code>window.innerWidth</code> ≤ 960px (largeur apparente réduite)</li>
            <li>Ou largeur ≤ 600px (très petits écrans)</li>
          </ul>
        </Box>

        <Box sx={{ mb: 3, p: 2, bgcolor: 'grey.100', borderRadius: 1 }}>
          <Typography variant="h3" gutterBottom>
            Informations actuelles :
          </Typography>
          <Typography variant="body2">
            <strong>window.innerWidth:</strong> {typeof window !== 'undefined' ? window.innerWidth : 'N/A'}px
          </Typography>
          <Typography variant="body2">
            <strong>window.devicePixelRatio:</strong> {typeof window !== 'undefined' ? window.devicePixelRatio : 'N/A'}
          </Typography>
          <Typography variant="body2">
            <strong>Zoom simulé:</strong> {zoomLevel}%
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
          <Button 
            variant="outlined" 
            onClick={() => handleSimulateZoom(100)}
            color={zoomLevel === 100 ? 'primary' : 'inherit'}
          >
            100% (Normal)
          </Button>
          <Button 
            variant="outlined" 
            onClick={() => handleSimulateZoom(150)}
            color={zoomLevel === 150 ? 'primary' : 'inherit'}
          >
            150% (Zoom)
          </Button>
          <Button 
            variant="outlined" 
            onClick={() => handleSimulateZoom(200)}
            color={zoomLevel === 200 ? 'primary' : 'inherit'}
          >
            200% (Horizontal)
          </Button>
          <Button 
            variant="outlined" 
            onClick={() => handleSimulateZoom(250)}
            color={zoomLevel === 250 ? 'primary' : 'inherit'}
          >
            250% (Très zoomé)
          </Button>
        </Box>

        <Box sx={{ mt: 4, p: 2, bgcolor: 'warning.light', borderRadius: 1 }}>
          <Typography variant="body2">
            <strong>Note :</strong> Pour un test réel, utilisez les fonctions de zoom de votre navigateur 
            (Ctrl/Cmd + Plus/Moins) plutôt que les boutons ci-dessus qui ne simulent qu'imparfaitement le comportement.
          </Typography>
        </Box>
      </Box>
    </BaseTemplate>
  );
}
