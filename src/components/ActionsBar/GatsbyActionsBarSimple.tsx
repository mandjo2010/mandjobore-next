/**
 * ActionsBar temporaire pour debug
 */
'use client'

import React from 'react'
import { Box } from '@mui/material'

interface ActionsBarProps {
  categories?: string[]
}

export default function GatsbyActionsBar({ categories = [] }: ActionsBarProps) {
  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        right: 0,
        width: '64px',
        height: '100vh',
        backgroundColor: '#ffffff',
        borderLeft: '1px solid #eeeeee',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 10,
        
        '@media (max-width: 1023px)': {
          display: 'none'
        }
      }}
    >
      <Box
        sx={{
          width: '40px',
          height: '40px',
          backgroundColor: '#f0f0f0',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '12px',
          color: '#666'
        }}
      >
        Actions
      </Box>
    </Box>
  )
}
