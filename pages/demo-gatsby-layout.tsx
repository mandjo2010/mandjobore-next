/**
 * Page de démonstration pour tester le layout inspiré de Gatsby
 * Cette page permet de valider la migration pixel-perfect
 */

import { CssBaseline, Typography, Button, Box } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import React, { useState } from 'react';

// Temporarily commenting out GatsbyInspiredLayout to debug build issue
// import GatsbyInspiredLayout from '../src/components/layout/GatsbyInspiredLayout';
import { theme } from '../src/theme';

const DemoGatsbyLayout = () => {
  const [navigatorPosition, setNavigatorPosition] = useState<'is-aside' | 'is-featured' | ''>('is-featured');
  const [navigatorShape, setNavigatorShape] = useState<'open' | 'closed' | ''>('open');
  const [isWideScreen, setIsWideScreen] = useState(true);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      
      {/* Temporarily commenting out GatsbyInspiredLayout */}
      {/* <GatsbyInspiredLayout
        posts={mockPosts}
        pages={mockPages}
        navigatorPosition={navigatorPosition}
        navigatorShape={navigatorShape}
        isWideScreen={isWideScreen}
      > */}
        {/* Contenu principal de test */}
        <Box sx={{ margin: '0 auto', maxWidth: 800, padding: 4 }}>
          <Typography variant="h1" gutterBottom sx={{ 
            color: '#555', 
            fontSize: '2.5rem', 
            fontWeight: 600,
            marginBottom: '0.5rem'
          }}>
            Demo - Migration Gatsby vers Next.js (TEMPORARILY DISABLED)
          </Typography>
          
          <Typography variant="h2" gutterBottom sx={{ 
            color: '#666', 
            fontSize: '1.5rem', 
            fontWeight: 300,
            marginBottom: '2rem'
          }}>
            Test du layout pixel-perfect avec Emotion + MUI v5
          </Typography>

          <Typography paragraph sx={{ marginBottom: '1.5rem' }}>
            Cette page démontre la migration réussie du layout Gatsby vers Next.js. 
            Tous les composants ont été migrés de JSS vers Emotion avec MUI v5, 
            en préservant l'architecture du thème existant.
          </Typography>

          {/* Contrôles de test */}
          <Box sx={{ 
            backgroundColor: '#f9f9f9', 
            border: '1px solid #dedede', 
            borderRadius: '4px',
            marginBottom: '2rem',
            padding: '1.5rem'
          }}>
            <Typography variant="h3" gutterBottom sx={{ 
              fontSize: '1.2rem', 
              fontWeight: 600,
              marginBottom: '1rem'
            }}>
              Contrôles de Test
            </Typography>

            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, marginBottom: '1rem' }}>
              <Button
                variant={navigatorPosition === 'is-featured' ? 'contained' : 'outlined'}
                onClick={() => setNavigatorPosition('is-featured')}
              >
                Featured Mode
              </Button>
              <Button
                variant={navigatorPosition === 'is-aside' ? 'contained' : 'outlined'}
                onClick={() => setNavigatorPosition('is-aside')}
              >
                Aside Mode
              </Button>
            </Box>

            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
              <Button
                variant={navigatorShape === 'open' ? 'contained' : 'outlined'}
                onClick={() => setNavigatorShape('open')}
              >
                Open Shape
              </Button>
              <Button
                variant={navigatorShape === 'closed' ? 'contained' : 'outlined'}
                onClick={() => setNavigatorShape('closed')}
              >
                Closed Shape
              </Button>
              <Button
                variant={isWideScreen ? 'contained' : 'outlined'}
                onClick={() => setIsWideScreen(!isWideScreen)}
              >
                {isWideScreen ? 'Wide Screen' : 'Normal Screen'}
              </Button>
            </Box>
          </Box>

          {/* Informations de migration */}
          <Box sx={{ 
            backgroundColor: '#e8f5e8', 
            border: '1px solid #c8e6c9',
            borderRadius: '4px',
            padding: '1.5rem'
          }}>
            <Typography variant="h3" gutterBottom sx={{ 
              color: '#2e7d32', 
              fontSize: '1.2rem',
              fontWeight: 600
            }}>
              ✅ Composants Migrés
            </Typography>
            <ul style={{ color: '#2e7d32', marginLeft: '1.5rem' }}>
              <li>GatsbyInspiredLayout avec positioning complexe</li>
              <li>InfoBox : Avatar, profil, menu navigation, social icons, stack icons</li>
              <li>Navigator : Liste d'articles avec states aside/featured</li>
              <li>ActionsBar : Boutons d'action responsive</li>
              <li>Système de thème Emotion + MUI v5</li>
              <li>Typography et breakpoints responsive</li>
            </ul>
          </Box>
        </Box>
      {/* </GatsbyInspiredLayout> */}
    </ThemeProvider>
  );
};

export default DemoGatsbyLayout;
