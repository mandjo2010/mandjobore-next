/* eslint-disable @typescript-eslint/no-unused-vars */
/**
 * TODO/MIGRATION BLOCK - GatsbyInspiredLayout.tsx
 * - Component: GatsbyInspiredLayout 
 * - Migration target: Gatsby layout structure to Next.js + Emotion/MUI
 * - Date: 2024-01-XX
 * - Removed: JSS injectSheet, Gatsby Link dependencies
 * - Refactor: styled(Box) approach with MUI theme integration
 * - Responsive: MUI theme.breakpoints for L (1024px), M (600px), mobile
 * - Theme access: Secured with fallbacks for all theme properties
 * - Dynamic props: navigatorPosition, navigatorShape states
 * - Pattern: Three-column layout with absolute positioning
 * - Last migration commit: feat(migration): migrate GatsbyInspiredLayout.tsx to Emotion/MUI
 * - Dev referent: Next.js migration team
 */

'use client';

import React, { ReactNode } from 'react';
import { styled, useTheme } from '@mui/material/styles';
import { Box, useMediaQuery } from '@mui/material';

// Import des composants à créer
import InfoBox from '../InfoBox/InfoBox';
import ActionsBar from '../ActionsBar/ActionsBar';
import Navigator from '../Navigator/Navigator';

// Types pour les states (à déplacer vers un store Zustand plus tard)
interface GatsbyLayoutProps {
  children: ReactNode;
  posts?: any[]; // À typer correctement avec les posts
  pages?: any[]; // À typer correctement avec les pages
  navigatorPosition?: 'is-aside' | 'is-featured' | '';
  navigatorShape?: 'open' | 'closed' | '';
  isWideScreen?: boolean;
}

// Styled components avec le thème existant
const LayoutContainer = styled(Box)(({ theme }) => ({
  position: 'relative',
  height: '100vh',
  overflow: 'hidden',
  background: theme.base?.colors?.background || '#ffffff',
  
  // Classes dynamiques pour les états du Navigator (à migrer de l'ancien CSS)
  '&.is-aside': {},
  '&.is-featured': {},
  '&.moving-aside': {},
  '&.moving-featured': {},
  '&.open': {},
  '&.closed': {},
}));

const MainContent = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: 0,
  left: 0,
  bottom: 0,
  width: '100%',
  
  // Responsive behavior
  [theme.breakpoints?.up('lg') || '@media (min-width: 1024px)']: {
    width: `calc(100vw - ${theme.info?.sizes?.width || 320}px - ${theme.bars?.sizes?.actionsBar || 60}px)`,
    left: `${theme.info?.sizes?.width || 320}px`,
  },
  
  // States pour mobile
  '@media (max-width: 1023px)': {
    '&.is-aside': {
      left: '-100%',
    },
    '&.is-featured': {
      left: 0,
    },
  },
}));

// Version temporaire - sera remplacée par le vrai Navigator
const TemporaryMainArea = styled(Box)(({ theme }) => ({
  height: '100%',
  padding: theme.spacing?.(2) || '16px',
  overflow: 'auto',
  background: theme.main?.colors?.background || '#ffffff',
}));

const GatsbyInspiredLayout: React.FC<GatsbyLayoutProps> = ({ 
  children,
  posts = [],
  pages = [],
  navigatorPosition = '',
  navigatorShape = '',
  isWideScreen = false,
}) => {
  const theme = useTheme();
  const isLargeScreen = useMediaQuery(theme.breakpoints?.up('lg') || '(min-width: 1024px)');
  
  // Classes CSS dynamiques selon l'état
  const containerClasses = [
    navigatorPosition,
    navigatorShape,
    isWideScreen ? 'wide-screen' : '',
  ].filter(Boolean).join(' ');

  return (
    <LayoutContainer className={containerClasses}>
      {/* InfoBox - Sidebar gauche avec profil */}
      <InfoBox 
        pages={pages}
        navigatorPosition={navigatorPosition}
        navigatorShape={navigatorShape}
        isWideScreen={isWideScreen}
      />
      
      {/* Zone principale - contenu ou navigator */}
      <MainContent className={`${navigatorPosition} ${navigatorShape}`}>
        {/* Si on est en mode "featured", on affiche le Navigator */}
        {navigatorPosition === 'is-featured' ? (
          <Navigator
            posts={posts}
            navigatorPosition={navigatorPosition}
            navigatorShape={navigatorShape}
          />
        ) : (
          /* Sinon on affiche le contenu principal */
          <TemporaryMainArea>
            {children}
          </TemporaryMainArea>
        )}
      </MainContent>
      
      {/* ActionsBar - Sidebar droite */}
      <ActionsBar 
        navigatorPosition={navigatorPosition}
        navigatorShape={navigatorShape}
        isWideScreen={isLargeScreen}
      />
    </LayoutContainer>
  );
};

export default GatsbyInspiredLayout;
