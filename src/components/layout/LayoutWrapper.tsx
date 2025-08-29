'use client';

import { Box } from '@mui/material';
import React from 'react';

interface LayoutWrapperProps {
  children: React.ReactNode;
}

/**
 * LayoutWrapper - Conteneur principal de l'application
 * Reproduit le comportement du LayoutWrapper de Gatsby
 */
export default function LayoutWrapper({ children }: LayoutWrapperProps) {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {children}
    </Box>
  );
}
