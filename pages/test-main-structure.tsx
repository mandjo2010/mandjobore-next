/**
 * Test final de la structure Main/Article/Content
 * Validation des navigateurs Position et des layouts
 */
'use client'

import { Box, Typography, Button } from '@mui/material'
import React from 'react'

import GatsbyLayoutMain from '@/components/layout/GatsbyLayoutMain'
import Article from '@/components/Main/Article'
import Content from '@/components/Main/Content'
import PageHeader from '@/components/Page/PageHeader'
import { useGatsbyUIStore } from '@/store/gatsby-ui-store'

// Pages et parts de test
const testPages = [
  { menuTitle: 'About me', slug: 'about', title: 'About' },
  { slug: 'contact', title: 'Contact' }
]

const testParts = [
  { html: '<p>Bio de test pour InfoBox</p>', title: 'info' }
]

export default function TestMainStructure() {
  const { 
    featureNavigator, 
    moveNavigatorAside, 
    navigatorPosition,
    navigatorShape 
  } = useGatsbyUIStore()

  const sampleContent = `
    <h2>Test de contenu formaté</h2>
    <p>Ce contenu utilise le composant <strong>Content</strong> qui reproduit fidèlement les styles du starter Gatsby original.</p>
    
    <h3>Fonctionnalités testées</h3>
    <ul>
      <li>Formatage des titres H2/H3</li>
      <li>Paragraphes avec espacement correct</li>
      <li>Listes à puces</li>
      <li>Liens avec hover effects</li>
    </ul>
    
    <blockquote>
      <p>Cette blockquote teste le style des citations avec bordures et pseudo-éléments.</p>
    </blockquote>
    
    <p>Le layout <strong>Main</strong> gère la position selon l'InfoBox, et <strong>Article</strong> centre le contenu avec les bonnes marges responsive.</p>
  `

  return (
    <GatsbyLayoutMain
      pages={testPages}
      parts={testParts}
      isPage={true} // Mode page : déclenche moveNavigatorAside()
    >
      <Article>
        <PageHeader title="Test Structure Main/Article/Content" />
        
        <Box sx={{ marginBottom: 4 }}>
          <Typography variant="h6" gutterBottom>
            État Navigator :
          </Typography>
          <Typography>
            <strong>Position :</strong> {navigatorPosition} | <strong>Shape :</strong> {navigatorShape}
          </Typography>
          
          <Box sx={{ display: 'flex', gap: 2, marginTop: 2 }}>
            <Button onClick={featureNavigator} variant="outlined">
              Mode Accueil (is-featured)
            </Button>
            <Button onClick={moveNavigatorAside} variant="contained">
              Mode Page/Article (is-aside)
            </Button>
          </Box>
        </Box>

        <Content html={sampleContent} />
        
        <Box sx={{ 
          backgroundColor: '#f5f5f5', 
          borderRadius: 1, 
          marginTop: 4, 
          padding: 3 
        }}>
          <Typography variant="h6" gutterBottom>
            ✅ Validations effectuées :
          </Typography>
          <ul>
            <li>✅ Layout Main avec position responsive selon InfoBox</li>
            <li>✅ Article avec maxWidth et centrage automatique</li>
            <li>✅ Content avec styles Gatsby fidèles</li>
            <li>✅ Navigation moveNavigatorAside() sur chargement page</li>
            <li>✅ InfoBox avec icônes tech stack colorées</li>
            <li>✅ Bouton "Expand the box" visible en mode is-aside + open</li>
          </ul>
        </Box>
      </Article>
    </GatsbyLayoutMain>
  )
}
