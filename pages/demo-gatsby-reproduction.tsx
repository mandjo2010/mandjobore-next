/**
 * Page de démonstration - Test de la reproduction fidèle de Gatsby
 * Cette page valide que tous les composants fonctionnent ensemble
 */
import { GetStaticProps } from 'next'
import Head from 'next/head'
import React from 'react'
import { Box, Typography, Button } from '@mui/material'

import GatsbyLayoutNew from '@/components/layout/GatsbyLayoutNew'
import { getAll } from '@/lib/content'

// Données de test pour reproduire l'expérience Gatsby
const mockPosts = [
  {
    slug: 'remote-sensing-mt-kenya-wildfire',
    title: 'Remote Sensing of Mt. Kenya Wildfire',
    excerpt: 'How satellite imagery and the science of remote sensing detect wildfires, help manage their spread, and guide ecological restoration',
    category: 'GIS Analysis',
    cover: '/images/test-cover.jpg',
    date: '2024-01-03'
  },
  {
    slug: 'agroforestry-system-benefits',
    title: 'A System for Economic, Sociocultural, and Environmental Benefits',
    excerpt: 'The role of agroforestry in providing a wide range of benefits including economic sustainability and environmental protection',
    category: 'Research',
    cover: '/images/test-cover.jpg',
    date: '2024-01-02'
  },
  {
    slug: 'finding-geographic-data',
    title: 'Finding Geographic Data',
    excerpt: 'Best practices and resources for finding quality geographic datasets for your spatial analysis projects',
    category: 'Data Science',
    cover: '/images/test-cover.jpg',
    date: '2024-01-01'
  }
]

const mockPages = [
  { slug: 'about', title: 'About', menuTitle: 'About' },
  { slug: 'cartography', title: 'My starters', menuTitle: 'Cartography' },
  { slug: 'portfolio', title: 'Portfolio', menuTitle: 'Portfolio' },
  { slug: 'contact', title: 'Contact', menuTitle: 'Contact' }
]

const mockParts = [
  {
    title: 'author',
    html: '<div>Mandjo Béa Boré - Data Analyst & Developer</div>'
  },
  {
    title: 'footnote',
    html: '<div>© 2024 - Built with Next.js reproducing Gatsby starter</div>'
  }
]

interface DemoPageProps {
  posts: typeof mockPosts
  pages: typeof mockPages
  parts: typeof mockParts
}

export default function DemoGatsbyReproduction({ posts, pages, parts }: DemoPageProps) {
  return (
    <>
      <Head>
        <title>Demo - Reproduction Fidèle de Gatsby</title>
        <meta name="description" content="Test de la reproduction pixel-perfect du starter Gatsby" />
      </Head>

      <GatsbyLayoutNew
        posts={posts}
        pages={pages}
        parts={parts}
        seo={{
          title: 'Demo Gatsby Reproduction',
          description: 'Test de reproduction fidèle du starter Gatsby de Greg Lobinski',
          url: 'https://mandjobore.com/demo-gatsby'
        }}
      >
        <Box 
          sx={{ 
            maxWidth: '50em',
            margin: '0 auto',
            padding: '2rem',
            lineHeight: 1.6
          }}
        >
          <Typography 
            variant="h1" 
            sx={{ 
              fontSize: '2rem',
              fontWeight: 600,
              color: '#333',
              letterSpacing: '-0.03em',
              lineHeight: '1.1em',
              marginBottom: '1rem'
            }}
          >
            🎉 Reproduction Fidèle du Starter Gatsby
          </Typography>
          
          <Typography 
            variant="h2" 
            sx={{ 
              fontSize: '1.3rem',
              fontWeight: 300,
              color: '#888',
              lineHeight: '1.3em',
              marginBottom: '2rem'
            }}
          >
            Migration pixel-perfect vers Next.js
          </Typography>

          <Typography paragraph sx={{ fontSize: '1rem', mb: 2 }}>
            Cette page démontre la reproduction <strong>fidèle</strong> du starter Gatsby de Greg Lobinski avec :
          </Typography>

          <Box component="ul" sx={{ pl: 3, mb: 3 }}>
            <li><strong>InfoBox (320px)</strong> - Sidebar gauche avec avatar, bio, menu et stack technique</li>
            <li><strong>Navigator</strong> - Liste d'articles avec vignettes rondes, H1/H2, filtrage</li>
            <li><strong>ActionsBar</strong> - Barre d'actions droite (Home/Filter/Search/Font/Fullscreen/Up)</li>
            <li><strong>SpringScrollbars</strong> - Scroll inertiel avec animation spring</li>
            <li><strong>États Redux → Zustand</strong> - navigatorPosition/Shape, fontSizeIncrease, etc.</li>
          </Box>

          <Typography paragraph sx={{ fontSize: '1rem', mb: 2 }}>
            <strong>Fonctionnalités testables :</strong>
          </Typography>

          <Box component="ol" sx={{ pl: 3, mb: 3 }}>
            <li>Cliquez sur l'avatar → passe en mode "is-featured"</li>
            <li>Bouton "Expand the box" → bascule entre infos auteur et liste compacte</li>
            <li>ActionsBar → Home/Filter/Font/Scroll-to-top</li>
            <li>Responsive → InfoBox disparaît sous 1024px</li>
            <li>Vignettes → hover change borderRadius (65%/75% ↔ 75%/65%)</li>
          </Box>

          <Box sx={{ mt: 4, p: 3, backgroundColor: '#f5f5f5', borderRadius: 1 }}>
            <Typography variant="h3" sx={{ fontSize: '1.1rem', fontWeight: 600, mb: 2 }}>
              🔍 Architecture technique
            </Typography>
            <Typography variant="body2" sx={{ fontSize: '0.9rem', lineHeight: 1.5 }}>
              • <strong>Store :</strong> Zustand reproduisant Redux (gatsby-ui-store.ts)<br/>
              • <strong>Thème :</strong> MUI avec valeurs JSS exactes (gatsby-theme.ts)<br/>
              • <strong>Layout :</strong> Structure 3 colonnes avec transitions CSS<br/>
              • <strong>Scroll :</strong> Framer Motion remplaçant Rebound<br/>
              • <strong>Types :</strong> TypeScript avec interfaces Gatsby
            </Typography>
          </Box>

          <Box sx={{ mt: 4 }}>
            <Button 
              variant="contained" 
              color="primary"
              onClick={() => window.location.href = '/'}
            >
              Retour à l'accueil
            </Button>
          </Box>
        </Box>
      </GatsbyLayoutNew>
    </>
  )
}

export const getStaticProps: GetStaticProps<DemoPageProps> = async () => {
  // En production, récupérer les vraies données
  // const allPosts = getAll('posts')
  // const allPages = getAll('pages')
  
  return {
    props: {
      posts: mockPosts,
      pages: mockPages,
      parts: mockParts
    }
  }
}
