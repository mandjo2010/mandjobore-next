/**
 * TODO/MIGRATION BLOCK - InfoHeader.tsx
 * - Component: InfoHeader (Header InfoBox avec avatar)
 * - Migration target: Gatsby InfoHeader to Next.js + Emotion/MUI
 * - Date: 2024-01-XX
 * - Removed: JSS injectSheet, Gatsby Link dependencies
 * - Refactor: styled(Box) avec transitions CSS complexes
 * - Responsive: Breakpoints M/L avec repositionnement de l'avatar
 * - Theme access: Secured theme.info.* et theme.mediaQueryTresholds
 * - Dynamic props: Avatar transitions avec navigator states
 * - Visual tests: Hover effects sur avatar (borderRadius change)
 * - Pattern: Complex CSS transitions pour les states expand/collapse
 * - Last migration commit: feat(migration): migrate InfoHeader.tsx to Emotion/MUI
 * - Dev referent: Next.js migration team
 */

'use client';

import React from 'react';
import { styled } from '@mui/material/styles';
import { Box, IconButton, Typography } from '@mui/material';
import Link from 'next/link';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

// Configuration temporaire (sera remplacée par des vraies données)
const CONFIG = {
  infoTitle: 'Mandjo Béa Boré',
  infoTitleNote: 'Data analyst - Developer',
  authorName: 'Mandjo Béa Boré',
};

interface InfoHeaderProps {
  info?: {
    title: string;
    html: string;
  };
  onAvatarClick?: () => void;
  onExpandClick?: () => void;
}

// Container du header
const HeaderContainer = styled(Box)({
  lineHeight: 1,
  position: 'relative',
});

// Link wrapper pour l'avatar
const AvatarLink = styled(Link)(({ theme }) => ({
  willChange: 'left, top',
  float: 'left',
  display: 'block',
  position: 'relative',
  margin: '0 12px 0 0',
  
  [theme.breakpoints?.up('md') || '@media (min-width: 600px)']: {
    margin: '0 20px 0 0',
  },
  
  [theme.breakpoints?.up('lg') || '@media (min-width: 1024px)']: {
    position: 'absolute',
    top: '10px',
    left: '50%',
    marginLeft: '-30px',
    transition: 'all .5s',
    transitionTimingFunction: 'ease',
    
    '.navigator-in-transition-from.navigator-is-opened &': {
      left: '50%',
    },
    '.is-aside.open &': {
      left: '8%',
      top: '0',
    },
  },
}));

// Avatar avec les effets de transition
const Avatar = styled(Box)(({ theme }) => ({
  width: '36px',
  height: '36px',
  borderRadius: '65% 75%',
  border: '1px solid #ddd',
  transition: 'all .3s',
  transitionTimingFunction: 'ease',
  display: 'inline-block',
  overflow: 'hidden',
  
  '& img': {
    maxWidth: '100%',
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  
  [theme.breakpoints?.up('md') || '@media (min-width: 600px)']: {
    width: '44px',
    height: '44px',
  },
  
  [theme.breakpoints?.up('lg') || '@media (min-width: 1024px)']: {
    width: '60px',
    height: '60px',
  },
  
  // Hover effect
  '@media (hover: hover)': {
    '&:hover': {
      borderRadius: '75% 65%',
    },
  },
}));

// Titre avec transitions complexes
const Title = styled(Typography)(({ theme }) => ({
  willChange: 'transform, left, top',
  fontSize: `${theme.info?.fonts?.boxTitleSize || 1.3}em`,
  margin: 0,
  float: 'left',
  transitionTimingFunction: 'ease',
  fontWeight: 600,
  color: theme.info?.colors?.text || '#555',
  
  '& small': {
    display: 'block',
    fontSize: '.6em',
    marginTop: '.3em',
    fontWeight: 300,
    color: theme.info?.colors?.text || '#555',
  },
  
  [theme.breakpoints?.up('md') || '@media (min-width: 600px)']: {
    fontSize: `${theme.info?.fonts?.boxTitleSizeM || 1.5}em`,
  },
  
  [theme.breakpoints?.up('lg') || '@media (min-width: 1024px)']: {
    fontSize: `${theme.info?.fonts?.boxTitleSizeL || 1.7}em`,
    position: 'absolute',
    top: '85px',
    textAlign: 'center',
    left: '50%',
    transform: 'translate(-50%)',
    transition: 'all .5s',
    
    '.is-aside.open &': {
      left: '60%',
      top: `${1.9 - (theme.info?.fonts?.boxTitleSizeL || 1.7)}em`,
      textAlign: 'left',
    },
  },
}));

// Bouton d'expansion
const ExpandButton = styled(IconButton)(({ theme }) => ({
  position: 'absolute',
  top: '30px',
  right: '-25px',
  display: 'none',
  color: theme.info?.colors?.text || '#555',
  
  '.is-aside.open &': {
    display: 'block',
  },
}));

const InfoHeader: React.FC<InfoHeaderProps> = ({ 
  info,
  onAvatarClick,
  onExpandClick 
}) => {
  const handleAvatarClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (onAvatarClick) {
      onAvatarClick();
    }
  };
  
  const handleExpandClick = () => {
    if (onExpandClick) {
      onExpandClick();
    }
  };
  
  return (
    <HeaderContainer component="header">
      {/* Avatar avec link vers la home */}
      <AvatarLink 
        href="/" 
        onClick={handleAvatarClick}
        title="back to Home page"
      >
        <Avatar>
          <img 
            src="/images/jpg/avatar.jpg" 
            alt={CONFIG.authorName}
            onError={(e) => {
              // Fallback si l'image n'existe pas
              const target = e.target as HTMLImageElement;
              target.src = '/images/avatar.svg';
            }}
          />
        </Avatar>
      </AvatarLink>
      
      {/* Titre avec nom et description */}
      <Title component="h1">
        {CONFIG.infoTitle.replace(/ /g, '\u00a0')}
        <small>{CONFIG.infoTitleNote}</small>
      </Title>
      
      {/* Bouton d'expansion (visible selon l'état) */}
      <ExpandButton
        aria-label="Expand the box"
        onClick={handleExpandClick}
        title="Expand the box"
      >
        <ExpandMoreIcon />
      </ExpandButton>
    </HeaderContainer>
  );
};

export default InfoHeader; 