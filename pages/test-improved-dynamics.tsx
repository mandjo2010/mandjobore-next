/**
 * Page de test pour les dynamiques InfoBox/InfoBar améliorées 
 * Tests : "Expand the box", "Expand the list", mobile InfoBar
 */
import { Box, Button, Typography, Paper, Stack } from '@mui/material'

import GatsbyLayoutNew from '@/components/layout/GatsbyLayoutNew'
import { useGatsbyUIStore } from '@/store/gatsby-ui-store'

export default function TestImprovedDynamics() {
  const { 
    featureNavigator, 
    isTransitioning,
    moveNavigatorAside,
    navigatorPosition,
    navigatorShape,
    resetToHome,
    setNavigatorShape
  } = useGatsbyUIStore()

  // Données de test
  const testPosts = Array.from({ length: 8 }, (_, i) => ({
    category: i % 2 === 0 ? 'tech' : 'design',
    date: `2024-0${Math.floor(i / 2) + 1}-${10 + i}`,
    excerpt: `Ceci est un extrait du ${i + 1}ème article de test pour valider les dynamiques.`,
    slug: `test-post-${i + 1}`,
    title: `Article de Test ${i + 1}`
  }))

  const testPages = [
    { menuTitle: 'À propos', slug: 'about', title: 'About' },
    { menuTitle: 'Projets', slug: 'projects', title: 'Projects' }
  ]

  const testParts = [
    { html: '<p>Information de test</p>', title: 'info' }
  ]

  return (
    <GatsbyLayoutNew 
      posts={testPosts}
      pages={testPages}
      parts={testParts}
      seo={{
        description: 'Page de test pour InfoBox, InfoBar et NavigatorListExpander',
        title: 'Test des Dynamiques Améliorées'
      }}
    >
      <Box
        sx={{
          backgroundColor: '#ffffff',
          margin: '0 auto',
          maxWidth: '800px',
          minHeight: '100vh',
          padding: '40px'
        }}
      >
        <Typography variant="h4" sx={{ color: '#333', marginBottom: '30px' }}>
          Test des Dynamiques InfoBox/InfoBar
        </Typography>

        {/* État actuel détaillé */}
        <Paper sx={{ marginBottom: '30px', padding: '20px' }}>
          <Typography variant="h6" sx={{ marginBottom: '15px' }}>
            État Actuel du Store
          </Typography>
          <Stack spacing={1}>
            <Typography>
              <strong>Navigator Position:</strong> {navigatorPosition}
            </Typography>
            <Typography>
              <strong>Navigator Shape:</strong> {navigatorShape}
            </Typography>
            <Typography>
              <strong>Is Transitioning:</strong> {isTransitioning ? 'Oui' : 'Non'}
            </Typography>
          </Stack>
        </Paper>

        {/* Tests des transitions Navigator */}
        <Paper sx={{ marginBottom: '30px', padding: '20px' }}>
          <Typography variant="h6" sx={{ marginBottom: '15px' }}>
            Tests Navigator Position
          </Typography>
          <Stack direction="row" spacing={2} sx={{ marginBottom: '15px' }}>
            <Button 
              variant="contained" 
              onClick={featureNavigator}
              disabled={navigatorPosition === 'is-featured'}
            >
              Mode Article (is-featured)
            </Button>
            <Button 
              variant="outlined" 
              onClick={moveNavigatorAside}
              disabled={navigatorPosition === 'is-aside'}
            >
              Mode Accueil (is-aside)
            </Button>
            <Button 
              variant="contained" 
              color="secondary"
              onClick={resetToHome}
            >
              Reset Complet
            </Button>
          </Stack>
          <Typography variant="body2" color="textSecondary">
            💡 <strong>is-featured:</strong> Mode article → InfoBox réduite + "Expand the box" visible
          </Typography>
        </Paper>

        {/* Tests des shapes Navigator */}
        <Paper sx={{ marginBottom: '30px', padding: '20px' }}>
          <Typography variant="h6" sx={{ marginBottom: '15px' }}>
            Tests Navigator Shape (List Expansion)
          </Typography>
          <Stack direction="row" spacing={2} sx={{ marginBottom: '15px' }}>
            <Button 
              variant="contained" 
              onClick={() => setNavigatorShape('open')}
              disabled={navigatorShape === 'open'}
            >
              Liste Ouverte (open)
            </Button>
            <Button 
              variant="outlined" 
              onClick={() => setNavigatorShape('closed')}
              disabled={navigatorShape === 'closed'}
            >
              Liste Fermée (closed)
            </Button>
          </Stack>
          <Typography variant="body2" color="textSecondary">
            💡 <strong>closed:</strong> Liste réduite → Content remonte dans InfoBox
          </Typography>
        </Paper>

        {/* Tests spécifiques aux fonctionnalités */}
        <Paper sx={{ marginBottom: '30px', padding: '20px' }}>
          <Typography variant="h6" sx={{ marginBottom: '15px' }}>
            Fonctionnalités Spécifiques à Tester
          </Typography>
          <Stack spacing={2}>
            <Box>
              <Typography variant="subtitle1" sx={{ fontWeight: 600, marginBottom: '8px' }}>
                🖱️ "Expand the box" (Desktop uniquement)
              </Typography>
              <Typography variant="body2">
                1. Passez en mode article → Bouton apparaît à droite de l'avatar
                <br />
                2. Cliquez sur la flèche → Restaure la box complète (shape = closed)
              </Typography>
            </Box>
            
            <Box>
              <Typography variant="subtitle1" sx={{ fontWeight: 600, marginBottom: '8px' }}>
                📱 InfoBar Mobile
              </Typography>
              <Typography variant="body2">
                1. Réduisez la fenêtre (&lt; 1024px) → InfoBar apparaît en haut
                <br />
                2. Menu hamburger → Navigation vers pages
              </Typography>
            </Box>
            
            <Box>
              <Typography variant="subtitle1" sx={{ fontWeight: 600, marginBottom: '8px' }}>
                📋 "List of Blog Posts" (Desktop uniquement)
              </Typography>
              <Typography variant="body2">
                1. Regardez en bas entre InfoBox et ActionsBar
                <br />
                2. Bouton Expand/Collapse → Contrôle de la liste d'articles
              </Typography>
            </Box>
            
            <Box>
              <Typography variant="subtitle1" sx={{ fontWeight: 600, marginBottom: '8px' }}>
                ⚡ ActionsBar Contextuelle
              </Typography>
              <Typography variant="body2">
                1. Page d'accueil → 5 icônes (Home, Filter, Search, Fullscreen, ScrollTop)
                <br />
                2. Mode article → 6 icônes (+ Font Size, - Filter)
              </Typography>
            </Box>
          </Stack>
        </Paper>

        {/* Instructions de test détaillées */}
        <Paper sx={{ backgroundColor: '#f8f9fa', padding: '20px' }}>
          <Typography variant="h6" sx={{ marginBottom: '15px' }}>
            🧪 Scénarios de Test Complets
          </Typography>
          <Stack spacing={2}>
            <Box>
              <Typography variant="subtitle2" sx={{ color: '#709425', fontWeight: 600 }}>
                Scénario 1: Navigation Article
              </Typography>
              <Typography variant="body2">
                Accueil → Mode Article → "Expand the box" → Retour
              </Typography>
            </Box>
            
            <Box>
              <Typography variant="subtitle2" sx={{ color: '#709425', fontWeight: 600 }}>
                Scénario 2: Gestion de Liste
              </Typography>
              <Typography variant="body2">
                Liste ouverte → "Collapse list" → Content remonte → "Expand list"
              </Typography>
            </Box>
            
            <Box>
              <Typography variant="subtitle2" sx={{ color: '#709425', fontWeight: 600 }}>
                Scénario 3: Responsive Mobile
              </Typography>
              <Typography variant="body2">
                Desktop complet → Réduction fenêtre → InfoBar mobile → Menu navigation
              </Typography>
            </Box>
          </Stack>
        </Paper>

        {/* Contenu de test supplémentaire */}
        <Box sx={{ marginTop: '40px' }}>
          <Typography variant="h5" sx={{ marginBottom: '20px' }}>
            Contenu de Test - Mode Article
          </Typography>
          {Array.from({ length: 5 }, (_, i) => (
            <Typography key={i} sx={{ lineHeight: 1.7, marginBottom: '20px' }}>
              Paragraphe {i + 1}: Ce contenu simule un article pour tester le mode lecture. 
              Lorsque vous êtes en mode article (is-featured), l'InfoBox se réduit et affiche 
              uniquement l'avatar avec le bouton "Expand the box" pour restaurer la sidebar 
              complète. L'ActionsBar affiche alors les contrôles de lecture comme la taille 
              de police au lieu du filtre de catégories.
            </Typography>
          ))}
        </Box>
      </Box>
    </GatsbyLayoutNew>
  )
}
