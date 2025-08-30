import { Box, Typography } from '@mui/material';
import React from 'react';

/**
 * Page de test pour vérifier le masquage complet des barres de défilement
 * Cette page contient du contenu défilable pour tester la visibilité des scrollbars
 */
const TestScrollbarHidden = () => {
  // Générer du contenu long pour forcer l'apparition du scroll
  const generateLongContent = () => {
    const items = [];
    for (let i = 1; i <= 100; i++) {
      items.push(
        <Typography key={i} variant="body1" sx={{ border: '1px solid #eee', mb: 2, p: 2 }}>
          Ligne de test #{i} - Cette ligne sert à tester le masquage complet des barres de défilement. 
          Le contenu doit être défilable mais aucune barre de défilement ne doit être visible, 
          pas même les petites extrémités ou coins. Ceci reproduit fidèlement le comportement 
          de l'ancien blog Gatsby où les scrollbars étaient complètement invisibles.
        </Typography>
      );
    }
    return items;
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      {/* En-tête fixe */}
      <Box sx={{ 
        backgroundColor: '#f5f5f5', 
        borderBottom: '1px solid #ddd', 
        p: 2,
        position: 'sticky',
        top: 0,
        zIndex: 100
      }}>
        <Typography variant="h4" component="h1">
          Test de Masquage des Barres de Défilement
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          Cette page teste que les scrollbars sont complètement invisibles
        </Typography>
      </Box>

      {/* Zone défilable principale */}
      <Box sx={{ 
        flex: 1,
        height: 'calc(100vh - 100px)', // Force l'overflow
        overflow: 'auto',
        p: 2
      }}>
        <Typography variant="h5" sx={{ color: '#27ae60', mb: 3 }}>
          Contenu défilable - Zone 1
        </Typography>
        {generateLongContent()}
      </Box>

      {/* Zone défilable avec classe spécifique */}
      <Box 
        className="main-content"
        sx={{ 
          backgroundColor: '#fafafa',
          border: '1px solid #ddd',
          height: '300px',
          m: 2,
          overflow: 'auto',
          p: 2
        }}
      >
        <Typography variant="h6" sx={{ color: '#709425', mb: 2 }}>
          Zone de test avec classe .main-content
        </Typography>
        {generateLongContent().slice(0, 20)}
      </Box>

      {/* Zone défilable avec classe navigator */}
      <Box 
        className="navigator"
        sx={{ 
          backgroundColor: '#f0f0f0',
          border: '1px solid #ccc',
          height: '200px',
          m: 2,
          overflow: 'auto',
          p: 2
        }}
      >
        <Typography variant="h6" sx={{ color: '#966588', mb: 2 }}>
          Zone de test avec classe .navigator
        </Typography>
        {generateLongContent().slice(0, 15)}
      </Box>

      {/* Zone défilable horizontale */}
      <Box sx={{ 
        backgroundColor: '#fff',
        border: '1px solid #eee',
        height: '150px',
        m: 2,
        overflowX: 'auto',
        overflowY: 'hidden',
        p: 2,
        whiteSpace: 'nowrap'
      }}>
        <Typography variant="h6" sx={{ color: '#333', mb: 2 }}>
          Test de défilement horizontal
        </Typography>
        <Box sx={{ backgroundColor: '#e0e0e0', display: 'inline-block', height: '50px', p: 2, width: '2000px' }}>
          Cette zone très large teste le masquage de la scrollbar horizontale. 
          Elle doit être défilable horizontalement mais sans barre visible.
        </Box>
      </Box>

      {/* Instructions */}
      <Box sx={{ 
        backgroundColor: '#e8f5e8', 
        border: '2px solid #27ae60',
        m: 2,
        p: 3
      }}>
        <Typography variant="h6" sx={{ color: '#27ae60', mb: 2 }}>
          Instructions de test :
        </Typography>
        <Typography variant="body2" component="div">
          <ul>
            <li><strong>Vérifier</strong> que toutes les zones ci-dessus sont défilables avec la molette ou le touch</li>
            <li><strong>Confirmer</strong> qu'aucune barre de défilement n'est visible (ni verticale ni horizontale)</li>
            <li><strong>Tester</strong> sur différents navigateurs : Chrome, Firefox, Safari, Edge</li>
            <li><strong>Vérifier</strong> qu'aucune "extrémité" ou "coin" de scrollbar n'apparaît</li>
            <li><strong>Valider</strong> que le scroll fonctionne normalement malgré l'invisibilité</li>
          </ul>
        </Typography>
      </Box>
    </div>
  );
};

export default TestScrollbarHidden;
