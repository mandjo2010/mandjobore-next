/**
 * TODO/MIGRATION BLOCK - ActionsBar.tsx
 * - Component: ActionsBar (Sidebar droite avec actions)
 * - Migration target: Gatsby ActionsBar to Next.js + Emotion/MUI
 * - Date: 2024-01-XX  
 * - Removed: JSS injectSheet, Redux connect, screenfull integration
 * - Refactor: styled(Box) avec responsive column/row layout
 * - Responsive: Horizontal bottom sur mobile, vertical right sur desktop
 * - Theme access: Secured theme.bars.* properties
 * - Dynamic props: navigatorPosition/navigatorShape logic
 * - Visual tests: Icon colors, hover states, layout transitions
 * - Pattern: Conditional rendering selon responsive states
 * - Last migration commit: feat(migration): migrate ActionsBar.tsx to Emotion/MUI
 * - Dev referent: Next.js migration team
 */

'use client';

import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import { Box, IconButton } from '@mui/material';
import Link from 'next/link';
import {
  Home,
  Search,
  KeyboardArrowUp,
  Fullscreen,
  FullscreenExit,
  FormatSize,
  FilterList,
} from '@mui/icons-material';

// Import des sous-composants
import FontSetter from './FontSetter';
import CategoryFilter from './CategoryFilter';

interface ActionsBarProps {
  navigatorPosition?: 'is-aside' | 'is-featured' | '';
  navigatorShape?: 'open' | 'closed' | '';
  isWideScreen?: boolean;
  categories?: string[];
}

// Container principal de la ActionsBar
const ActionsBarContainer = styled(Box)(({ theme }) => ({
  position: 'absolute',
  background: theme.bars?.colors?.background || '#ffffff',
  left: 0,
  bottom: 0,
  display: 'flex',
  flexDirection: 'row',
  padding: `0 ${theme.base?.sizes?.linesMargin || '20px'}`,
  justifyContent: 'space-between',
  height: `${theme.bars?.sizes?.actionsBar || 60}px`,
  width: '100%',
  
  // Bordure supérieure
  '&::before': {
    content: '""',
    position: 'absolute',
    left: theme.base?.sizes?.linesMargin || '20px',
    right: theme.base?.sizes?.linesMargin || '20px',
    height: 0,
    top: 0,
    borderTop: `1px solid ${theme.base?.colors?.lines || '#dedede'}`,
  },
  
  // Responsive pour tablet
  [theme.breakpoints?.up('md') || '@media (min-width: 600px)']: {
    padding: `0 calc(${theme.base?.sizes?.linesMargin || '20px'} * 1.5)`,
  },
  
  // Desktop layout - vertical sur la droite
  [theme.breakpoints?.up('lg') || '@media (min-width: 1024px)']: {
    flexDirection: 'column',
    top: 0,
    right: 0,
    left: 'auto',
    height: '100%',
    padding: `${theme.base?.sizes?.linesMargin || '20px'} 0`,
    width: `${theme.bars?.sizes?.actionsBar || 60}px`,
    
    '&::before': {
      top: theme.base?.sizes?.linesMargin || '20px',
      bottom: theme.base?.sizes?.linesMargin || '20px',
      left: 0,
      right: 'auto',
      width: 0,
      height: 'auto',
      borderLeft: `1px solid ${theme.base?.colors?.lines || '#dedede'}`,
      borderTop: 'none',
    },
  },
}));

// Groupe de boutons
const ButtonGroup = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  
  [theme.breakpoints?.up('lg') || '@media (min-width: 1024px)']: {
    flexDirection: 'column',
  },
}));

// Bouton stylisé
const ActionButton = styled(IconButton)(({ theme }) => ({
  color: theme.bars?.colors?.icon || '#555',
  transition: 'all 0.3s ease',
  
  '&:hover': {
    color: theme.base?.colors?.accent || '#709425',
    transform: 'scale(1.1)',
  },
}));

const ActionsBar: React.FC<ActionsBarProps> = ({
  navigatorPosition = '',
  navigatorShape = '',
  isWideScreen = false,
  categories = [],
}) => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  
  // Handlers pour les actions
  const handleHomeClick = () => {
    // TODO: Implémenter featureNavigator logic
    console.log('Home clicked - should feature navigator');
  };
  
  const handleSearchClick = () => {
    // TODO: Implémenter moveNavigatorAside logic
    console.log('Search clicked - should move navigator aside');
  };
  
  const handleFullscreenClick = () => {
    // TODO: Implémenter screenfull toggle
    console.log('Fullscreen clicked');
    if (document.fullscreenElement) {
      document.exitFullscreen();
      setIsFullscreen(false);
    } else {
      document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    }
  };
  
  const handleScrollToTopClick = () => {
    // TODO: Implémenter scroll to top
    console.log('Scroll to top clicked');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  const handleFontSizeChange = (val: number) => {
    // TODO: Intégrer avec le state management
    console.log('Font size changed:', val);
  };
  
  const handleCategoryFilter = (category: string) => {
    // TODO: Intégrer avec le state management  
    console.log('Category filter:', category);
  };
  
  return (
    <ActionsBarContainer>
      {/* Groupe de gauche/haut */}
      <ButtonGroup>
        {/* Bouton Home */}
        <ActionButton
          aria-label="Back to list"
          onClick={handleHomeClick}
          title="Back to the list"
        >
          <Home />
        </ActionButton>
        
        {/* Category Filter (conditionnel) */}
        {((isWideScreen && navigatorShape === 'open') || navigatorPosition !== 'is-aside') && (
          <CategoryFilter
            categories={categories}
            onFilterCategory={handleCategoryFilter}
          />
        )}
        
        {/* Bouton Search */}
        <Link href="/search/" passHref>
          <ActionButton
            onClick={handleSearchClick}
            title="Search"
          >
            <Search />
          </ActionButton>
        </Link>
      </ButtonGroup>
      
      {/* Groupe de droite/bas */}
      <ButtonGroup>
        {/* Font Setter (conditionnel) */}
        {navigatorPosition === 'is-aside' && (
          <FontSetter onIncreaseFont={handleFontSizeChange} />
        )}
        
        {/* Bouton Fullscreen */}
        <ActionButton
          aria-label="Fullscreen"
          onClick={handleFullscreenClick}
          title="Fullscreen mode"
        >
          {isFullscreen ? <FullscreenExit /> : <Fullscreen />}
        </ActionButton>
        
        {/* Bouton Scroll to Top */}
        <ActionButton
          aria-label="Back to top"
          onClick={handleScrollToTopClick}
          title="Scroll to top"
        >
          <KeyboardArrowUp />
        </ActionButton>
      </ButtonGroup>
    </ActionsBarContainer>
  );
};

export default ActionsBar;
