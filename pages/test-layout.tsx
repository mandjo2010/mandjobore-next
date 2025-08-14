import { Typography, Box } from '@mui/material'
import * as React from 'react'

import RootLayout from '@/components/layout/RootLayout'

/**
 * Page de test pour la nouvelle architecture Gatsby → Next.js
 */
export default function TestLayoutPage() {
  return (
    <RootLayout>
      <Box
        sx={{
          height: '100vh',
          maxWidth: '50em',
          mx: 'auto',
          overflow: 'auto',
          p: 4,
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
          <li>✅ Barres de séparation Gatsby-style avec responsive</li>
        </ul>

        <Typography paragraph>
          <strong>Barres de séparation reproduites :</strong>
        </Typography>

        <ul>
          <li><strong>InfoBox</strong> : Barre verticale droite (20px top/bottom)</li>
          <li><strong>ActionsBar</strong> : Barre verticale gauche (desktop) / horizontale haut (mobile)</li>
          <li><strong>Navigator</strong> : Barres horizontales dans header/footer</li>
          <li><strong>Couleur</strong> : #dedede (variable --color-lines)</li>
          <li><strong>Marge</strong> : 20px (variable --lines-margin)</li>
          <li><strong>Responsive</strong> : Adaptation automatique mobile/desktop</li>
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

        <Box sx={{ bgcolor: '#f5f5f5', borderRadius: 2, mt: 4, p: 3 }}>
          <Typography variant="h6" sx={{ color: '#709425', mb: 2 }}>
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

        <Box sx={{ bgcolor: '#f8f9fa', borderRadius: 2, mt: 4, p: 3 }}>
          <Typography variant="h6" sx={{ color: '#709425', mb: 2 }}>
            📏 Séparateurs avec Marges (Gatsby Style)
          </Typography>
          
          <Typography paragraph>
            <strong>Séparateurs verticaux :</strong>
          </Typography>
          
          <ul>
            <li>✅ <strong>InfoBox :</strong> ligne verticale droite de 20px du haut à 20px du bas</li>
            <li>✅ <strong>Navigator :</strong> ligne verticale droite quand is-aside (20px marges)</li>
            <li>✅ <strong>ActionsBar :</strong> ligne verticale gauche de 20px du haut à 20px du bas</li>
          </ul>

          <Typography paragraph>
            <strong>Comportement responsive :</strong>
          </Typography>
          
          <ul>
            <li>📱 <strong>Mobile (&lt;600px) :</strong> séparateurs horizontaux uniquement</li>
            <li>💻 <strong>Desktop (&gt;1024px) :</strong> séparateurs verticaux avec marges exactes</li>
            <li>🎯 <strong>Couleur :</strong> #dedede (--color-lines)</li>
            <li>📐 <strong>Marges :</strong> 20px (--lines-margin)</li>
          </ul>

          <Box 
            sx={{ 
              bgcolor: '#fff', 
              border: '1px solid #dedede', 
              borderRadius: 1,
              mt: 2,
              p: 2,
              position: 'relative'
            }}
          >
            <Typography variant="body2" sx={{ fontWeight: 600, mb: 1 }}>
              Exemple de séparateur avec marges :
            </Typography>
            <Box
              sx={{
                '&::after': {
                  borderRight: '1px solid #709425',
                  bottom: '20px',
                  content: '""',
                  position: 'absolute',
                  right: 0, 
                  top: '20px',
                  width: '1px',
                },
                bgcolor: '#f5f5f5',
                height: 60,
                position: 'relative'
              }}
            >
              <Typography variant="caption" sx={{ color: '#666', p: 1 }}>
                Zone avec séparateur vertical droit (20px du haut et du bas)
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </RootLayout>
  )
}
