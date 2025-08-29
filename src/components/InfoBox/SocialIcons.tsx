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

import React from 'react';
import { styled } from '@mui/material/styles';
import { Box, IconButton } from '@mui/material';
import { 
  GitHub, 
  Twitter, 
  Facebook, 
  LinkedIn, 
  Email 
} from '@mui/icons-material';

// Configuration des réseaux sociaux (sera remplacée par vraie config)
const SOCIAL_CONFIG = {
  authorSocialLinks: [
    { name: 'github', url: 'https://github.com/mandjo2010' },
    { name: 'twitter', url: 'https://twitter.com/mandjo2010' },
    { name: 'linkedin', url: 'https://linkedin.com/in/mandjo-bea-bore' },
    { name: 'facebook', url: 'https://facebook.com/mandjo2010' },
    { name: 'email', url: 'mailto:contact@mandjobore.com' },
  ],
};

// Container pour les icônes sociales
const SocialContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  flexWrap: 'wrap',
  padding: '1em 0',
  gap: '0.5em',
}));

// Wrapper pour chaque icône avec les couleurs personnalisées
const SocialIconButton = styled(IconButton, {
  shouldForwardProp: (prop) => prop !== 'socialType',
})<{ socialType: string }>(({ theme, socialType }) => {
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
        return '#a19b9a';
      case 'email':
        return '#dc4e41';
      default:
        return theme.info?.colors?.socialIcons || '#bbbbbb';
    }
  };
  
  return {
    display: 'block',
    padding: '5px',
    color: getIconColor(socialType),
    transition: 'all .5s ease',
    
    '& svg': {
      width: '32px',
      height: '32px',
      fill: 'currentColor',
      transition: 'all .5s ease',
    },
    
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
        color: '#7d7675',
      }),
      ...(socialType === 'email' && {
        color: '#b33e35',
      }),
    },
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
      {SOCIAL_CONFIG.authorSocialLinks.map((item) => {
        const IconComponent = getIconComponent(item.name);
        
        if (!IconComponent) return null;
        
        return (
          <SocialIconButton
            key={item.name}
            socialType={item.name}
            component="a"
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            title={item.name}
            aria-label={`Visit ${item.name} profile`}
          >
            <IconComponent />
          </SocialIconButton>
        );
      })}
    </SocialContainer>
  );
};

export default SocialIcons; 