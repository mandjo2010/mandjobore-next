/**
 * TODO/MIGRATION BLOCK - Navigator.tsx
 * - Component: Navigator (Liste d'articles central)  
 * - Migration target: Gatsby Navigator to Next.js + Emotion/MUI
 * - Date: 2024-01-XX
 * - Removed: JSS injectSheet, Redux connect, forceCheck
 * - Refactor: styled(Box) avec complex positioning et states
 * - Responsive: Multiple breakpoints avec width/position calculations
 * - Theme access: Secured theme.navigator.* et theme.info.sizes
 * - Dynamic props: navigatorPosition/navigatorShape complex logic
 * - Visual tests: Transitions aside/featured, scroll behavior
 * - Pattern: Complex CSS states avec multiple class combinations
 * - Last migration commit: feat(migration): migrate Navigator.tsx to Emotion/MUI
 * - Dev referent: Next.js migration team
 */

'use client';

import { ExpandLess, Close } from '@mui/icons-material';
import { Box, Typography, IconButton } from '@mui/material';
import { styled } from '@mui/material/styles';
import React, { useState } from 'react';

interface NavigatorProps {
  posts?: any[];
  navigatorPosition?: 'is-aside' | 'is-featured' | '';
  navigatorShape?: 'open' | 'closed' | '';
}

// Container principal avec tous les states complexes de Gatsby
const NavigatorContainer = styled(Box)(({ theme }) => ({
  // Mobile states
  '@media (max-width: 1023px)': {
    '&.is-aside': {
      left: '-100%',
    },
    '&.is-featured': {
      left: 0,
    },
  },
  background: theme.navigator?.colors?.background || '#ffffff',
  height: '100vh',
  left: 0,
  position: 'absolute',
  // Desktop states  
  [theme.breakpoints?.up('lg') || '@media (min-width: 1024px)']: {
    '&.is-aside': {
      '&.closed': {
        bottom: `calc(-100% + 100px + ${theme.navigator?.sizes?.closedHeight || 80}px)`,
        height: `calc(100% - 100px)`,
      },
      '&.open': {
        bottom: 0,
        height: `calc(100% - 100px)`,
      },
      '&::after': {
        borderTop: `1px solid ${theme.base?.colors?.lines || '#dedede'}`,
        content: '""',
        height: 0,
        left: theme.base?.sizes?.linesMargin || '20px',
        position: 'absolute',
        right: theme.base?.sizes?.linesMargin || '20px',
        top: 0,
      },
      left: 0,
      top: 'auto',
      
      transition: 'none, bottom 0.5s',
      
      width: `${(theme.info?.sizes?.width || 320) - 1}px`,
      
      zIndex: 1,
    },
    
    '&.is-featured': {
      left: `${theme.info?.sizes?.width || 320}px`,
      top: 0,
      transition: 'left .9s',
      width: `calc(100vw - ${theme.info?.sizes?.width || 320}px - ${theme.bars?.sizes?.actionsBar || 60}px)`,
    },
    
    // États de transition
    '&.moving-aside': {
      left: `calc(-100vw + ${2 * (theme.info?.sizes?.width || 320) + 60}px)`,
      top: 0,
      transition: 'left 0.9s',
      width: `calc(100vw - ${theme.info?.sizes?.width || 320}px - 60px)`,
    },
    
    '&.moving-featured': {
      bottom: '-100%',
      left: 0,
      top: 'auto',
      transition: 'bottom .3s',
      width: `${(theme.info?.sizes?.width || 320) - 1}px`,
      zIndex: 1,
    },
  },
  top: 0,
  transform: 'translate3d(0, 0, 0)',
  transition: 'left .9s',
  transitionTimingFunction: 'ease',
  
  width: '100%',
  
  willChange: 'left, top, bottom, width',
}));

// Content area avec scroll
const ScrollableContent = styled(Box)(({ theme: _theme }) => ({
  bottom: 0,
  left: 0,
  overflowY: 'auto',
  padding: '1rem',
  position: 'absolute',
  top: 0,
  width: '100%',
}));

// Header pour le mode collapsed
const CollapsedHeader = styled(Box)(({ theme }) => ({
  '& h3': {
    color: theme.navigator?.colors?.postsHeader || '#555',
    fontSize: '1.1em',
    fontWeight: 600,
    margin: '-.2em 0 0 0',
    textTransform: 'uppercase',
  },
  
  '.is-aside.closed &, .moving-featured.closed &': {
    alignItems: 'center',
    background: theme.navigator?.colors?.background || '#ffffff',
    display: 'flex',
    flexDirection: 'row',
    height: `${theme.navigator?.sizes?.closedHeight || 80}px`,
    justifyContent: 'space-between',
    left: 0,
    margin: 0,
    padding: '0 30px 0 40px',
    position: 'absolute',
    top: 0,
    width: '100%',
  },
  
  display: 'none',
}));

// Article item temporaire
const ArticleItem = styled(Box)(({ theme }) => ({
  '&:hover': {
    backgroundColor: theme.palette?.action?.hover || 'rgba(0, 0, 0, 0.04)',
  },
  alignItems: 'center',
  borderBottom: `1px solid ${theme.base?.colors?.lines || '#dedede'}`,
  cursor: 'pointer',
  display: 'flex',
  padding: '1rem',
  
  transition: 'background-color 0.2s ease',
}));

const ArticleThumb = styled(Box)({
  backgroundColor: '#f0f0f0',
  borderRadius: '75% 65%',
  flexShrink: 0,
  height: '60px',
  marginRight: '1rem',
  width: '60px',
});

const ArticleContent = styled(Box)({
  '& h3': {
    fontSize: '1.1em',
    fontWeight: 600,
    lineHeight: 1.2,
    margin: 0,
  },
  
  '& p': {
    color: '#666',
    fontSize: '0.9em',
    lineHeight: 1.3,
    margin: '0.5em 0 0 0',
  },
  
  flexGrow: 1,
});

const Navigator: React.FC<NavigatorProps> = ({
  navigatorPosition = '',
  navigatorShape = '',
  posts = [],
}) => {
  const [categoryFilter, setCategoryFilter] = useState('all posts');
  
  const handleExpandClick = () => {
    // TODO: Intégrer avec le state management
    console.log('Expand navigator');
  };
  
  const handleRemoveFilter = () => {
    setCategoryFilter('all posts');
  };
  
  // Classes CSS selon l'état
  const containerClasses = [
    navigatorPosition,
    navigatorShape,
  ].filter(Boolean).join(' ');
  
  // Posts mock pour le développement
  const mockPosts = posts.length > 0 ? posts : [
    {
      category: 'GIS Analysis',
      date: 'Fri, 03 Jan 2020',
      excerpt: 'How satellite imagery and the science of remote sensing detect wildfires...',
      id: '1',
      title: 'Remote Sensing of Mt. Kenya Wildfire',
    },
    {
      category: 'Research', 
      date: 'Thu, 02 Jan 2020',
      excerpt: 'The role of agroforestry in providing a wide range of benefits...',
      id: '2',
      title: 'A System for Economic, Sociocultural, and Environmental Benefits',
    },
    {
      category: 'Data Science',
      date: 'Wed, 01 Jan 2020',
      excerpt: 'Best practices and resources for finding quality geographic datasets...',
      id: '3',
      title: 'Finding Geographic Data',
    },
  ];
  
  return (
    <NavigatorContainer className={containerClasses}>
      {/* Header en mode collapsed */}
      <CollapsedHeader>
        <Typography variant="h3" component="h3">
          List of posts
        </Typography>
        <IconButton
          aria-label="Expand the list"
          onClick={handleExpandClick}
          title="Expand the list"
        >
          <ExpandLess />
        </IconButton>
      </CollapsedHeader>
      
      {/* Contenu scrollable */}
      <ScrollableContent>
        {/* Filter header si actif */}
        {navigatorShape === 'open' && categoryFilter !== 'all posts' && (
          <Box sx={{ 
            alignItems: 'center', 
            borderBottom: '1px solid #dedede',
            display: 'flex',
            justifyContent: 'space-between',
            padding: '1rem'
          }}>
            <Box>
              <Typography variant="body2" color="textSecondary">
                Active category filter:
              </Typography>
              <Typography variant="body1" fontWeight="bold">
                {categoryFilter}
              </Typography>
            </Box>
            <IconButton onClick={handleRemoveFilter} size="small">
              <Close />
            </IconButton>
          </Box>
        )}
        
        {/* Liste des articles */}
        <Box>
          {mockPosts.map((post) => (
            <ArticleItem key={post.id}>
              <ArticleThumb />
              <ArticleContent>
                <Typography variant="h3" component="h3">
                  {post.title}
                </Typography>
                <Typography variant="body2" component="p">
                  {post.excerpt}
                </Typography>
                <Typography variant="caption" color="textSecondary">
                  {post.category} • {post.date}
                </Typography>
              </ArticleContent>
            </ArticleItem>
          ))}
        </Box>
      </ScrollableContent>
    </NavigatorContainer>
  );
};

export default Navigator; 