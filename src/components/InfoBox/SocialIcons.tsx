/**
 * TODO/MIGRATION BLOCK - SocialIcons.tsx
 * - Component: SocialIcons (Icônes réseaux sociaux)
 * - Migration target: Gatsby SocialIcons to Next.js + Emotion/MUI
 * - Date: 2024-01-XX
 * - Removed: JSS injectSheet, svg-react-loader imports
 * - Refactor: styled(Box) avec flexbox layout et MUI icons
 * - Responsive: Icon size et spacing selon breakpoints
 * - Theme access: Secured theme.info.colors pour socialIcons/socialIconsHover
 * - Dynamic props: Color variants per social network (github, twitter, etc.)
 * - Visual tests: Hover color transitions, icon alignment
 * - Pattern: MUI icons avec styled wrappers pour custom colors
 * - Last migration commit: feat(migration): migrate SocialIcons.tsx to Emotion/MUI
 * - Dev referent: Next.js migration team
 */

'use client';

import { 
  GitHub, 
  Twitter, 
  Facebook, 
  LinkedIn, 
  Email 
} from '@mui/icons-material';
import { Box, IconButton } from '@mui/material';
import { styled } from '@mui/material/styles';
import React from 'react';

import authorConfig from '@/config/author';

// Container pour les icônes sociales
const SocialContainer = styled(Box)(({ theme: _theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  gap: '0.8em', // Augmenté de 0.5em à 0.8em pour plus d'espacement
  justifyContent: 'center',
  padding: '1em 0',
}));

// Wrapper pour chaque icône avec les couleurs personnalisées
const SocialIconButton = styled(IconButton, {
  shouldForwardProp: (prop) => prop !== 'socialType',
})<{ socialType: string }>(({ socialType, theme }) => {
  // Couleurs spécifiques par réseau social (comme dans l'ancien code)
  const getIconColor = (type: string) => {
    switch (type) {
      case 'github':
        return '#966588';
      case 'twitter': 
        return '#01acee';
      case 'facebook':
        return '#3c5898';
      case 'linkedin':
        return '#0077B5'; // Bleu LinkedIn officiel
      case 'email':
        return '#dc4e41';
      default:
        return theme.info?.colors?.socialIcons || '#bbbbbb';
    }
  };
  
  return {
    '&:hover': {
      color: getIconColor(socialType),
      transform: 'scale(1.1)',
      
      // Couleurs hover personnalisées
      ...(socialType === 'github' && {
        color: '#654466',
      }),
      ...(socialType === 'twitter' && {
        color: '#0084cc',
      }),
      ...(socialType === 'facebook' && {
        color: '#2d4373',
      }),
      ...(socialType === 'linkedin' && {
        color: '#005885', // Bleu LinkedIn plus foncé pour le hover
      }),
      ...(socialType === 'email' && {
        color: '#b33e35',
      }),
    },
    '& svg': {
      fill: 'currentColor',
      height: '32px',
      transition: 'all .5s ease',
      width: '32px',
    },
    color: getIconColor(socialType),
    display: 'block',
    
    padding: '5px',
    
    transition: 'all .5s ease',
  };
});

const SocialIcons: React.FC = () => {
  // Mapping des icônes
  const getIconComponent = (name: string) => {
    switch (name) {
      case 'github':
        return GitHub;
      case 'twitter':
        return Twitter;
      case 'facebook':
        return Facebook;
      case 'linkedin':
        return LinkedIn;
      case 'email':
        return Email;
      default:
        return null;
    }
  };
  
  return (
    <SocialContainer>
      {authorConfig.authorSocialLinks.map((item) => {
        const IconComponent = getIconComponent(item.name);
        
        if (!IconComponent) return null;
        
        return (
          <a
            key={item.name}
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            title={item.name}
            aria-label={`Visit ${item.name} profile`}
            style={{ textDecoration: 'none' }}
          >
            <SocialIconButton socialType={item.name}>
              <IconComponent />
            </SocialIconButton>
          </a>
        );
      })}
    </SocialContainer>
  );
};

export default SocialIcons;