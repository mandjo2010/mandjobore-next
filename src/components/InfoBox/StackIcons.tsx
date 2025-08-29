/**
 * TODO/MIGRATION BLOCK - StackIcons.tsx  
 * - Component: StackIcons (Technologies "built with:" en bas InfoBox)
 * - Migration target: Gatsby StackIcons to Next.js + Emotion/MUI
 * - Date: 2024-01-XX
 * - Removed: JSS injectSheet, svg-react-loader custom SVG imports
 * - Refactor: styled(Box) avec absolute positioning et flexbox
 * - Responsive: Visible uniquement sur L breakpoint (large screens)
 * - Theme access: Secured theme.mediaQueryTresholds et positioning
 * - Dynamic props: Technology stack items array avec URLs
 * - Visual tests: Icon size 22px, hover effects, absolute positioning
 * - Pattern: MUI icons ou Image fallback pour custom tech logos
 * - Last migration commit: feat(migration): migrate StackIcons.tsx to Emotion/MUI
 * - Dev referent: Next.js migration team
 */

'use client';

import React from 'react';
import { styled } from '@mui/material/styles';
import { Box, IconButton, Typography } from '@mui/material';
import Image from 'next/image';

// Liste des technologies (mise à jour pour Next.js)
const STACK_ITEMS = [
  { name: 'nextjs', url: 'https://nextjs.org/', icon: '/images/svg-icons/nextjs.svg' },
  { name: 'react', url: 'https://reactjs.org/', icon: '/images/svg-icons/react.svg' },
  { name: 'typescript', url: 'https://www.typescriptlang.org/', icon: '/images/svg-icons/typescript.svg' },
  { name: 'material-ui', url: 'https://mui.com/', icon: '/images/svg-icons/material-ui.svg' },
  { name: 'gatsby', url: 'https://www.gatsbyjs.org/', icon: '/images/svg-icons/gatsby.svg' },
  { name: 'webpack', url: 'https://webpack.js.org/', icon: '/images/svg-icons/webpack.svg' },
  { name: 'babel', url: 'https://babeljs.io/', icon: '/images/svg-icons/babel.svg' },
  { name: 'netlify', url: 'https://www.netlify.com/', icon: '/images/svg-icons/netlify.svg' },
];

// Container principal (affiché seulement sur large screens)
const StackContainer = styled(Box)(({ theme }) => ({
  display: 'none',
  
  [theme.breakpoints?.up('lg') || '@media (min-width: 1024px)']: {
    display: 'block',
    position: 'absolute',
    left: 0,
    bottom: 0,
    width: '100%',
    padding: '1em 2em',
  },
}));

// Container flex pour les icônes
const IconsBox = styled(Box)({
  display: 'flex',
  justifyContent: 'center',
  flexWrap: 'wrap',
  gap: '0.5em',
});

// Titre "built with:"
const StackHeader = styled(Typography)(({ theme }) => ({
  textAlign: 'center',
  fontSize: '.85em',
  letterSpacing: '.3em',
  width: '100%',
  margin: '0 0 .8em 0',
  fontWeight: 300,
  color: theme.info?.colors?.text || '#555',
  textTransform: 'uppercase',
}));

// Wrapper pour chaque icône
const StackIconButton = styled(IconButton)(({ theme }) => ({
  display: 'inline-block',
  padding: '8px',
  borderRadius: '4px',
  transition: 'all 0.3s ease',
  
  '& svg, & img': {
    width: '22px',
    height: '22px',
    filter: 'grayscale(0.7)',
    transition: 'all 0.3s ease',
  },
  
  '&:hover': {
    transform: 'scale(1.1)',
    
    '& svg, & img': {
      filter: 'grayscale(0)',
    },
  },
}));

const StackIcons: React.FC = () => {
  return (
    <StackContainer>
      <StackHeader variant="h6" component="h5">
        built with:
      </StackHeader>
      
      <IconsBox>
        {STACK_ITEMS.map((item) => (
          <StackIconButton
            key={item.name}
            component="a"
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            title={item.name}
            aria-label={`Visit ${item.name} website`}
          >
            <Image
              src={item.icon}
              alt={item.name}
              width={22}
              height={22}
              style={{
                width: '22px',
                height: '22px',
                objectFit: 'contain',
              }}
              onError={(e) => {
                // Fallback en cas d'erreur d'image
                console.warn(`Failed to load icon for ${item.name}`);
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
              }}
            />
          </StackIconButton>
        ))}
      </IconsBox>
    </StackContainer>
  );
};

export default StackIcons; 