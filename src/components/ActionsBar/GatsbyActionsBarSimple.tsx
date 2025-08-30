/**
 * ActionsBar temporaire pour debug
 */
'use client'

import { Box } from '@mui/material'
import React from 'react'

interface ActionsBarProps {
  categories?: string[]
}

export default function GatsbyActionsBar({ categories: _categories = [] }: ActionsBarProps) {
  return (
    <Box
      sx={{
        '@media (max-width: 1023px)': {
          display: 'none'
        },
        alignItems: 'center',
        backgroundColor: '#ffffff',
        borderLeft: '1px solid #eeeeee',
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        justifyContent: 'center',
        position: 'fixed',
        right: 0,
        top: 0,
        width: '64px',
        
        zIndex: 10
      }}
    >
      <Box
        sx={{
          alignItems: 'center',
          backgroundColor: '#f0f0f0',
          borderRadius: '50%',
          color: '#666',
          display: 'flex',
          fontSize: '12px',
          height: '40px',
          justifyContent: 'center',
          width: '40px'
        }}
      >
        Actions
      </Box>
    </Box>
  )
}
