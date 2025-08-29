import { Button, Box, Typography } from '@mui/material'
import Head from 'next/head'
/**
 * Page de test pour vérifier le fonctionnement du store Zustand
 */
import React from 'react'

import { useGatsbyUIStore } from '@/store/gatsby-ui-store'

export default function TestStore() {
  const { 
    categoryFilter, 
    featureNavigator, 
    fontSizeIncrease,
    moveNavigatorAside,
    navigatorPosition,
    navigatorShape,
    setCategoryFilter,
    setFontSizeIncrease 
  } = useGatsbyUIStore()

  return (
    <>
      <Head>
        <title>Test Store Zustand</title>
      </Head>

      <Box sx={{ maxWidth: '800px', padding: '40px' }}>
        <Typography variant="h1" sx={{ marginBottom: '30px' }}>
          Test Store Zustand
        </Typography>

        <Box sx={{ marginBottom: '20px' }}>
          <Typography variant="h2" sx={{ fontSize: '1.2rem', marginBottom: '10px' }}>
            État actuel :
          </Typography>
          <Typography>Navigator Position: {navigatorPosition}</Typography>
          <Typography>Navigator Shape: {navigatorShape}</Typography>
          <Typography>Font Size Increase: {fontSizeIncrease}</Typography>
          <Typography>Category Filter: {categoryFilter}</Typography>
        </Box>

        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginBottom: '20px' }}>
          <Button 
            variant="contained" 
            onClick={featureNavigator}
            color={navigatorPosition === 'is-featured' ? 'secondary' : 'primary'}
          >
            {navigatorPosition === 'is-featured' ? '✓ Article Mode' : 'Feature Navigator (Article)'}
          </Button>
          
          <Button 
            variant="contained" 
            onClick={moveNavigatorAside}
            color={navigatorPosition === 'is-aside' ? 'secondary' : 'primary'}
          >
            {navigatorPosition === 'is-aside' ? '✓ Home Mode' : 'Move Navigator Aside (Home)'}
          </Button>
          
          <Button 
            variant="outlined" 
            onClick={() => setFontSizeIncrease(fontSizeIncrease + 0.1)}
          >
            Increase Font Size
          </Button>
          
          <Button 
            variant="outlined" 
            onClick={() => setFontSizeIncrease(Math.max(0.8, fontSizeIncrease - 0.1))}
          >
            Decrease Font Size
          </Button>
          
          <Button 
            variant="outlined" 
            onClick={() => setCategoryFilter(categoryFilter === 'all posts' ? 'tech' : 'all posts')}
          >
            Toggle Category Filter
          </Button>
        </Box>

        <Box>
          <Button variant="outlined" href="/">
            Retour à l'accueil
          </Button>
        </Box>
      </Box>
    </>
  )
}
