/**
 * Page de démonstration pour tester le layout inspiré de Gatsby
 * Cette page permet de valider la migration pixel-perfect
 */

import React, { useState } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline, Typography, Button, Box } from '@mui/material';

import { theme } from '../src/theme';
import GatsbyInspiredLayout from '../src/components/layout/GatsbyInspiredLayout';

// Données mockées pour les tests
const mockPosts = [
  {
    id: '1',
    title: 'Remote Sensing of Mt. Kenya Wildfire',
    excerpt: 'How satellite imagery and the science of remote sensing detect wildfires, help manage their spread, and guide ecological restoration',
    category: 'GIS Analysis',
    date: 'Fri, 03 Jan 2020',
    cover: '/images/test-cover.svg',
  },
  {
    id: '2',
    title: 'A System for Economic, Sociocultural, and Environmental Benefits',
    excerpt: 'The role of agroforestry in providing a wide range of benefits',
    category: 'Research',
    date: 'Thu, 02 Jan 2020',
    cover: '/images/test-cover.svg',
  },
  {
    id: '3',
    title: 'Finding Geographic Data',
    excerpt: 'Best practices and resources for finding quality geographic datasets for your projects',
    category: 'Data Science',
    date: 'Wed, 01 Jan 2020',
    cover: '/images/test-cover.svg',
  },
];

const mockPages = [
  {
    node: {
      fields: { slug: '/about' },
      frontmatter: { title: 'About', menuTitle: 'About' },
    },
  },
  {
    node: {
      fields: { slug: '/cartography' },
      frontmatter: { title: 'Cartography', menuTitle: 'Cartography' },
    },
  },
  {
    node: {
      fields: { slug: '/portfolio' },
      frontmatter: { title: 'Portfolio', menuTitle: 'Portfolio' },
    },
  },
];

const DemoGatsbyLayout = () => {
  const [navigatorPosition, setNavigatorPosition] = useState<'is-aside' | 'is-featured' | ''>('is-featured');
  const [navigatorShape, setNavigatorShape] = useState<'open' | 'closed' | ''>('open');
  const [isWideScreen, setIsWideScreen] = useState(true);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      
      <GatsbyInspiredLayout
        posts={mockPosts}
        pages={mockPages}
        navigatorPosition={navigatorPosition}
        navigatorShape={navigatorShape}
        isWideScreen={isWideScreen}
      >
        {/* Contenu principal de test */}
        <Box sx={{ padding: 4, maxWidth: 800, margin: '0 auto' }}>
          <Typography variant="h1" gutterBottom sx={{ 
            fontSize: '2.5rem', 
            fontWeight: 600, 
            color: '#555',
            marginBottom: '0.5rem'
          }}>
            Demo - Migration Gatsby vers Next.js
          </Typography>
          
          <Typography variant="h2" gutterBottom sx={{ 
            fontSize: '1.5rem', 
            fontWeight: 300, 
            color: '#666',
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
            marginBottom: '2rem', 
            padding: '1.5rem', 
            border: '1px solid #dedede',
            borderRadius: '4px',
            backgroundColor: '#f9f9f9'
          }}>
            <Typography variant="h3" gutterBottom sx={{ 
              fontSize: '1.2rem', 
              fontWeight: 600,
              marginBottom: '1rem'
            }}>
              Contrôles de Test
            </Typography>

            <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', marginBottom: '1rem' }}>
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

            <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
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
            </Box>
          </Box>

          {/* Informations de migration */}
          <Box sx={{ 
            padding: '1.5rem', 
            backgroundColor: '#e8f5e8',
            borderRadius: '4px',
            border: '1px solid #c8e6c9'
          }}>
            <Typography variant="h3" gutterBottom sx={{ 
              fontSize: '1.2rem', 
              fontWeight: 600,
              color: '#2e7d32'
            }}>
              ✅ Composants Migrés
            </Typography>
            <ul style={{ marginLeft: '1.5rem', color: '#2e7d32' }}>
              <li>GatsbyInspiredLayout avec positioning complexe</li>
              <li>InfoBox : Avatar, profil, menu navigation, social icons, stack icons</li>
              <li>Navigator : Liste d'articles avec states aside/featured</li>
              <li>ActionsBar : Boutons d'action responsive</li>
              <li>Système de thème Emotion + MUI v5</li>
              <li>Typography et breakpoints responsive</li>
            </ul>
          </Box>
        </Box>
      </GatsbyInspiredLayout>
    </ThemeProvider>
  );
};

export default DemoGatsbyLayout;
