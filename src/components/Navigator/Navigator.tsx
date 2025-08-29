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

import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import { Box, Typography, IconButton } from '@mui/material';
import { ExpandLess, Close } from '@mui/icons-material';

interface NavigatorProps {
  posts?: any[];
  navigatorPosition?: 'is-aside' | 'is-featured' | '';
  navigatorShape?: 'open' | 'closed' | '';
}

// Container principal avec tous les states complexes de Gatsby
const NavigatorContainer = styled(Box)(({ theme }) => ({
  transform: 'translate3d(0, 0, 0)',
  willChange: 'left, top, bottom, width',
  background: theme.navigator?.colors?.background || '#ffffff',
  position: 'absolute',
  top: 0,
  left: 0,
  height: '100vh',
  transitionTimingFunction: 'ease',
  transition: 'left .9s',
  width: '100%',
  
  // Mobile states
  '@media (max-width: 1023px)': {
    '&.is-aside': {
      left: '-100%',
    },
    '&.is-featured': {
      left: 0,
    },
  },
  
  // Desktop states  
  [theme.breakpoints?.up('lg') || '@media (min-width: 1024px)']: {
    '&.is-featured': {
      transition: 'left .9s',
      width: `calc(100vw - ${theme.info?.sizes?.width || 320}px - ${theme.bars?.sizes?.actionsBar || 60}px)`,
      left: `${theme.info?.sizes?.width || 320}px`,
      top: 0,
    },
    
    '&.is-aside': {
      transition: 'none, bottom 0.5s',
      left: 0,
      width: `${(theme.info?.sizes?.width || 320) - 1}px`,
      zIndex: 1,
      top: 'auto',
      
      '&.closed': {
        bottom: `calc(-100% + 100px + ${theme.navigator?.sizes?.closedHeight || 80}px)`,
        height: `calc(100% - 100px)`,
      },
      
      '&.open': {
        bottom: 0,
        height: `calc(100% - 100px)`,
      },
      
      '&::after': {
        content: '""',
        position: 'absolute',
        top: 0,
        left: theme.base?.sizes?.linesMargin || '20px',
        right: theme.base?.sizes?.linesMargin || '20px',
        height: 0,
        borderTop: `1px solid ${theme.base?.colors?.lines || '#dedede'}`,
      },
    },
    
    // États de transition
    '&.moving-aside': {
      transition: 'left 0.9s',
      left: `calc(-100vw + ${2 * (theme.info?.sizes?.width || 320) + 60}px)`,
      width: `calc(100vw - ${theme.info?.sizes?.width || 320}px - 60px)`,
      top: 0,
    },
    
    '&.moving-featured': {
      transition: 'bottom .3s',
      bottom: '-100%',
      top: 'auto',
      left: 0,
      zIndex: 1,
      width: `${(theme.info?.sizes?.width || 320) - 1}px`,
    },
  },
}));

// Content area avec scroll
const ScrollableContent = styled(Box)(({ theme }) => ({
  position: 'absolute',
  left: 0,
  top: 0,
  bottom: 0,
  width: '100%',
  overflowY: 'auto',
  padding: '1rem',
}));

// Header pour le mode collapsed
const CollapsedHeader = styled(Box)(({ theme }) => ({
  display: 'none',
  
  '.is-aside.closed &, .moving-featured.closed &': {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    margin: 0,
    height: `${theme.navigator?.sizes?.closedHeight || 80}px`,
    padding: '0 30px 0 40px',
    background: theme.navigator?.colors?.background || '#ffffff',
  },
  
  '& h3': {
    fontSize: '1.1em',
    color: theme.navigator?.colors?.postsHeader || '#555',
    fontWeight: 600,
    margin: '-.2em 0 0 0',
    textTransform: 'uppercase',
  },
}));

// Article item temporaire
const ArticleItem = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: '1rem',
  borderBottom: `1px solid ${theme.base?.colors?.lines || '#dedede'}`,
  cursor: 'pointer',
  transition: 'background-color 0.2s ease',
  
  '&:hover': {
    backgroundColor: theme.palette?.action?.hover || 'rgba(0, 0, 0, 0.04)',
  },
}));

const ArticleThumb = styled(Box)({
  width: '60px',
  height: '60px',
  borderRadius: '75% 65%',
  backgroundColor: '#f0f0f0',
  marginRight: '1rem',
  flexShrink: 0,
});

const ArticleContent = styled(Box)({
  flexGrow: 1,
  
  '& h3': {
    margin: 0,
    fontSize: '1.1em',
    fontWeight: 600,
    lineHeight: 1.2,
  },
  
  '& p': {
    margin: '0.5em 0 0 0',
    fontSize: '0.9em',
    color: '#666',
    lineHeight: 1.3,
  },
});

const Navigator: React.FC<NavigatorProps> = ({
  posts = [],
  navigatorPosition = '',
  navigatorShape = '',
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
      id: '1',
      title: 'Remote Sensing of Mt. Kenya Wildfire',
      excerpt: 'How satellite imagery and the science of remote sensing detect wildfires...',
      category: 'GIS Analysis',
      date: 'Fri, 03 Jan 2020',
    },
    {
      id: '2', 
      title: 'A System for Economic, Sociocultural, and Environmental Benefits',
      excerpt: 'The role of agroforestry in providing a wide range of benefits...',
      category: 'Research',
      date: 'Thu, 02 Jan 2020',
    },
    {
      id: '3',
      title: 'Finding Geographic Data',
      excerpt: 'Best practices and resources for finding quality geographic datasets...',
      category: 'Data Science',
      date: 'Wed, 01 Jan 2020',
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
            padding: '1rem', 
            borderBottom: '1px solid #dedede',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
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