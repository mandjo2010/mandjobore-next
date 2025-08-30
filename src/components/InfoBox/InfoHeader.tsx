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

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Box, IconButton } from '@mui/material';
import { styled } from '@mui/material/styles';
import Link from 'next/link';
import React from 'react';

// Configuration temporaire (sera remplacée par des vraies données)
const CONFIG = {
  authorName: 'Mandjo Béa Boré',
  infoTitle: 'Mandjo Béa Boré',
  infoTitleNote: 'Data analyst - Developer',
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
  display: 'block',
  float: 'left',
  margin: '0 12px 0 0',
  position: 'relative',
  [theme.breakpoints?.up('lg') || '@media (min-width: 1024px)']: {
    '.is-aside.open &': {
      left: '8%',
      top: '0',
    },
    '.navigator-in-transition-from.navigator-is-opened &': {
      left: '50%',
    },
    left: '50%',
    marginLeft: '-30px',
    position: 'absolute',
    top: '10px',
    
    transition: 'all .5s',
    transitionTimingFunction: 'ease',
  },
  
  [theme.breakpoints?.up('md') || '@media (min-width: 600px)']: {
    margin: '0 20px 0 0',
  },
  
  willChange: 'left, top',
}));

// Avatar avec les effets de transition
const Avatar = styled(Box)(({ theme }) => ({
  '& img': {
    height: '100%',
    maxWidth: '100%',
    objectFit: 'cover',
    width: '100%',
  },
  // Hover effect
  '@media (hover: hover)': {
    '&:hover': {
      borderRadius: '75% 65%',
    },
  },
  border: '1px solid #ddd',
  borderRadius: '65% 75%',
  display: 'inline-block',
  height: '36px',
  overflow: 'hidden',
  [theme.breakpoints?.up('lg') || '@media (min-width: 1024px)']: {
    height: '60px',
    width: '60px',
  },
  
  [theme.breakpoints?.up('md') || '@media (min-width: 600px)']: {
    height: '44px',
    width: '44px',
  },
  
  transition: 'all .3s',
  
  transitionTimingFunction: 'ease',
  
  width: '36px',
}));

// Titre avec transitions complexes
const Title = styled('h1')(({ theme }) => ({
  '& small': {
    color: theme.info?.colors?.text || '#555',
    display: 'block',
    fontSize: '.6em',
    fontWeight: 300,
    marginTop: '.3em',
  },
  color: theme.info?.colors?.text || '#555',
  float: 'left',
  fontSize: `${theme.info?.fonts?.boxTitleSize || 1.3}em`,
  fontWeight: 600,
  margin: 0,
  [theme.breakpoints?.up('lg') || '@media (min-width: 1024px)']: {
    '.is-aside.open &': {
      left: '60%',
      textAlign: 'left',
      top: `${1.9 - (theme.info?.fonts?.boxTitleSizeL || 1.7)}em`,
    },
    fontSize: `${theme.info?.fonts?.boxTitleSizeL || 1.7}em`,
    left: '50%',
    position: 'absolute',
    textAlign: 'center',
    top: '85px',
    transform: 'translate(-50%)',
    
    transition: 'all .5s',
  },
  
  [theme.breakpoints?.up('md') || '@media (min-width: 600px)']: {
    fontSize: `${theme.info?.fonts?.boxTitleSizeM || 1.5}em`,
  },
  
  transitionTimingFunction: 'ease',
  
  willChange: 'transform, left, top',
}));

// Bouton d'expansion
const ExpandButton = styled(IconButton)(({ theme }) => ({
  '.is-aside.open &': {
    display: 'block',
  },
  color: theme.info?.colors?.text || '#555',
  display: 'none',
  position: 'absolute',
  right: '-25px',
  
  top: '30px',
}));

const InfoHeader: React.FC<InfoHeaderProps> = ({ 
  info: _info, // TODO: Use for displaying author info
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
    <HeaderContainer>
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
      <Title>
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