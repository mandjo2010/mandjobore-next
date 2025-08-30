/**
 * FontSetter - Composant reproduisant le FontSetter de l'ancien ActionsBar
 * Basé sur src/components/ActionsBar/FontSetter.js du starter Gatsby original
 */
'use client'

import { Add, Remove } from '@mui/icons-material'
import { Box, IconButton, Typography } from '@mui/material'
import React from 'react'

import { useGatsbyUIStore } from '@/store/gatsby-ui-store'

export default function FontSetter() {
  const { fontSizeIncrease, setFontSizeIncrease } = useGatsbyUIStore()

  const increaseFontSize = () => {
    const newSize = Math.min(fontSizeIncrease + 0.1, 1.5) // Max 1.5x
    setFontSizeIncrease(Number(newSize.toFixed(1)))
    
    // Sauvegarde dans localStorage comme dans l'original
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('font-size-increase', newSize.toString())
    }
  }

  const decreaseFontSize = () => {
    const newSize = Math.max(fontSizeIncrease - 0.1, 0.8) // Min 0.8x
    setFontSizeIncrease(Number(newSize.toFixed(1)))
    
    // Sauvegarde dans localStorage comme dans l'original
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('font-size-increase', newSize.toString())
    }
  }

  // Récupération depuis localStorage au montage
  React.useEffect(() => {
    if (typeof localStorage !== 'undefined') {
      const savedSize = localStorage.getItem('font-size-increase')
      if (savedSize) {
        setFontSizeIncrease(Number(savedSize))
      }
    }
  }, [setFontSizeIncrease])

  return (
    <Box
      sx={{
        '@media (min-width: 1024px)': {
          flexDirection: 'column',
        },
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'row',
        gap: 0.5
      }}
    >
      {/* Bouton diminuer la taille */}
      <IconButton
        onClick={decreaseFontSize}
        disabled={fontSizeIncrease <= 0.8}
        sx={{
          '&.Mui-disabled': { color: 'text.disabled' },
          '&:hover': { color: 'primary.main' },
          color: 'text.secondary'
        }}
        title="Decrease font size"
        size="small"
      >
        <Remove fontSize="small" />
      </IconButton>

      {/* Indicateur de taille actuelle */}
      <Typography
        variant="caption"
        sx={{
          color: 'text.secondary',
          fontSize: '0.7em',
          fontWeight: 500,
          minWidth: '32px',
          textAlign: 'center'
        }}
      >
        {Math.round(fontSizeIncrease * 100)}%
      </Typography>

      {/* Bouton augmenter la taille */}
      <IconButton
        onClick={increaseFontSize}
        disabled={fontSizeIncrease >= 1.5}
        sx={{
          '&.Mui-disabled': { color: 'text.disabled' },
          '&:hover': { color: 'primary.main' },
          color: 'text.secondary'
        }}
        title="Increase font size"
        size="small"
      >
        <Add fontSize="small" />
      </IconButton>
    </Box>
  )
}
