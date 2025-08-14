import * as React from 'react'
import { Typography, Box } from '@mui/material'
import RootLayout from '@/components/layout/RootLayout'

/**
 * Page de test pour la nouvelle architecture Gatsby → Next.js
 */
export default function TestLayoutPage() {
  return (
    <RootLayout>
      <Box
        sx={{
          p: 4,
          maxWidth: '50em',
          mx: 'auto',
          overflow: 'auto',
          height: '100vh',
        }}
      >
        <Typography variant="h1" className="blog-title" sx={{ mb: 2 }}>
          🎉 Test de la nouvelle architecture
        </Typography>
        
        <Typography variant="h2" className="blog-subtitle" sx={{ mb: 4 }}>
          Migration réussie de Gatsby vers Next.js
        </Typography>

        <Typography paragraph>
          Cette page teste la nouvelle architecture qui reproduit fidèlement 
          le système Gatsby avec :
        </Typography>

        <ul>
          <li><strong>InfoBox (320px)</strong> - Sidebar gauche avec avatar, bio, menu et stack technique</li>
          <li><strong>Navigator</strong> - Liste d'articles avec filtrage et animations</li>
          <li><strong>ActionsBar (60px)</strong> - Barre d'actions droite avec tous les boutons fonctionnels</li>
          <li><strong>Store Zustand</strong> - Gestion d'état global avec persistance</li>
          <li><strong>Animations</strong> - Transitions fluides de 300ms comme dans Gatsby</li>
        </ul>

        <Typography paragraph>
          <strong>Fonctionnalités implémentées :</strong>
        </Typography>

        <ul>
          <li>✅ Bouton "Expand the box" dans InfoBox</li>
          <li>✅ Bouton "Retour à la liste" dans ActionsBar</li>
          <li>✅ Filtrage par catégories avec menu déroulant</li>
          <li>✅ Recherche globale</li>
          <li>✅ Ajusteur de taille de police (100%/125%/150%)</li>
          <li>✅ Mode plein écran</li>
          <li>✅ Scroll to top</li>
          <li>✅ Persistence des préférences utilisateur</li>
        </ul>

        <Typography paragraph>
          <strong>États du Navigator :</strong>
        </Typography>

        <ul>
          <li><code>is-aside</code> - Liste réduite à 400px (défaut)</li>
          <li><code>is-featured</code> - Liste en plein écran</li>
          <li><code>moving-aside</code> - Animation de transition (300ms)</li>
        </ul>

        <Typography paragraph>
          Testez les boutons dans la barre d'actions à droite pour voir 
          les transitions et fonctionnalités en action !
        </Typography>

        <Box sx={{ mt: 4, p: 3, bgcolor: '#f5f5f5', borderRadius: 2 }}>
          <Typography variant="h6" sx={{ mb: 2, color: '#709425' }}>
            🎯 Prochaines étapes
          </Typography>
          
          <ol>
            <li>Intégrer les vrais articles depuis le système de contenu</li>
            <li>Ajouter les icônes SVG personnalisées</li>
            <li>Implémenter la recherche avancée</li>
            <li>Ajouter les pages About, Cartography, Portfolio, Contact</li>
            <li>Optimiser les images avec next/image</li>
            <li>Ajouter les métadonnées SEO</li>
          </ol>
        </Box>
      </Box>
    </RootLayout>
  )
}
