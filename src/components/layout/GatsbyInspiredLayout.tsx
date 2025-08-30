 
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

import { Box, useMediaQuery } from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';
import React, { ReactNode } from 'react';

import { ActionsBar } from '../ActionsBar';
// Import des composants à créer
import InfoBox from '../InfoBox/InfoBox';
import Navigator from '../Navigator';

// Types pour les states (à déplacer vers un store Zustand plus tard)
interface GatsbyLayoutProps {
  children: ReactNode;
  posts?: any[]; // À typer correctement avec les posts
  pages?: any[]; // À typer correctement avec les pages
  parts?: any[]; // Ajout pour la compatibilité
  seo?: {
    title?: string;
    description?: string;
    url?: string;
  };
  navigatorPosition?: 'is-aside' | 'is-featured' | '';
  navigatorShape?: 'open' | 'closed' | '';
  isWideScreen?: boolean;
}

// Styled components avec le thème existant
const LayoutContainer = styled(Box)(({ theme }) => ({
  '&.closed': {},
  // Classes dynamiques pour les états du Navigator (à migrer de l'ancien CSS)
  '&.is-aside': {},
  '&.is-featured': {},
  '&.moving-aside': {},
  
  '&.moving-featured': {},
  '&.open': {},
  background: theme.base?.colors?.background || '#ffffff',
  height: '100vh',
  overflow: 'hidden',
  position: 'relative',
}));

const MainContent = styled(Box)(({ theme }) => ({
  // States pour mobile
  '@media (max-width: 1023px)': {
    '&.is-aside': {
      left: '-100%',
    },
    '&.is-featured': {
      left: 0,
    },
  },
  bottom: 0,
  left: 0,
  position: 'absolute',
  // Responsive behavior
  [theme.breakpoints?.up('lg') || '@media (min-width: 1024px)']: {
    left: `${theme.info?.sizes?.width || 320}px`,
    width: `calc(100vw - ${theme.info?.sizes?.width || 320}px - ${theme.bars?.sizes?.actionsBar || 60}px)`,
  },
  
  top: 0,
  
  width: '100%',
}));

// Version temporaire - sera remplacée par le vrai Navigator
const TemporaryMainArea = styled(Box)(({ theme }) => ({
  background: theme.main?.colors?.background || '#ffffff',
  height: '100%',
  overflow: 'auto',
  padding: theme.spacing?.(2) || '16px',
}));

const GatsbyInspiredLayout: React.FC<GatsbyLayoutProps> = ({ 
  children,
  isWideScreen = false,
  navigatorPosition = '',
  navigatorShape = '',
  pages = [],
  parts = [],
  posts = [],
  seo: _seo = {},
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
        pages={pages || []}
        parts={parts || []}
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
