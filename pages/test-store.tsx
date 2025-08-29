/**
 * Page de test pour vérifier le fonctionnement du store Zustand
 */
import React from 'react'
import Head from 'next/head'
import { Button, Box, Typography } from '@mui/material'
import { useGatsbyUIStore } from '@/store/gatsby-ui-store'

export default function TestStore() {
  const { 
    navigatorPosition, 
    navigatorShape, 
    fontSizeIncrease,
    categoryFilter,
    featureNavigator,
    moveNavigatorAside,
    setFontSizeIncrease,
    setCategoryFilter 
  } = useGatsbyUIStore()

  return (
    <>
      <Head>
        <title>Test Store Zustand</title>
      </Head>

      <Box sx={{ padding: '40px', maxWidth: '800px' }}>
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

        <Box sx={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '20px' }}>
          <Button 
            variant="contained" 
            onClick={featureNavigator}
          >
            Feature Navigator
          </Button>
          
          <Button 
            variant="contained" 
            onClick={moveNavigatorAside}
          >
            Move Navigator Aside
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
