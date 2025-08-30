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

import { Box, IconButton } from '@mui/material';
import { styled } from '@mui/material/styles';
import Image from 'next/image';
import React from 'react';

// Liste des technologies (mise à jour pour Next.js)
const STACK_ITEMS = [
  { icon: '/images/svg-icons/nextjs.svg', name: 'nextjs', url: 'https://nextjs.org/' },
  { icon: '/images/svg-icons/react.svg', name: 'react', url: 'https://reactjs.org/' },
  { icon: '/images/svg-icons/typescript.svg', name: 'typescript', url: 'https://www.typescriptlang.org/' },
  { icon: '/images/svg-icons/material-ui.svg', name: 'material-ui', url: 'https://mui.com/' },
  { icon: '/images/svg-icons/gatsby.svg', name: 'gatsby', url: 'https://www.gatsbyjs.org/' },
  { icon: '/images/svg-icons/webpack.svg', name: 'webpack', url: 'https://webpack.js.org/' },
  { icon: '/images/svg-icons/babel.svg', name: 'babel', url: 'https://babeljs.io/' },
  { icon: '/images/svg-icons/netlify.svg', name: 'netlify', url: 'https://www.netlify.com/' },
];

// Container principal (affiché seulement sur large screens)
const StackContainer = styled(Box)(({ theme }) => ({
  display: 'none',
  
  [theme.breakpoints?.up('lg') || '@media (min-width: 1024px)']: {
    bottom: 0,
    display: 'block',
    left: 0,
    padding: '1em 2em',
    position: 'absolute',
    width: '100%',
  },
}));

// Container flex pour les icônes
const IconsBox = styled(Box)({
  display: 'flex',
  flexWrap: 'wrap',
  gap: '0.5em',
  justifyContent: 'center',
});

// Wrapper pour chaque icône
const StackIconButton = styled(IconButton)(({ theme: _theme }) => ({
  '&:hover': {
    '& svg, & img': {
      filter: 'grayscale(0)',
    },
    
    transform: 'scale(1.1)',
  },
  '& svg, & img': {
    filter: 'grayscale(0.7)',
    height: '22px',
    transition: 'all 0.3s ease',
    width: '22px',
  },
  borderRadius: '4px',
  display: 'inline-block',
  
  padding: '8px',
  
  transition: 'all 0.3s ease',
}));

const StackIcons: React.FC = () => {
  return (
    <StackContainer>
      <h5 style={{
        color: 'var(--info-text, #555)',
        fontSize: '.85em',
        fontWeight: 300,
        letterSpacing: '.3em',
        margin: '0 0 .8em 0',
        textAlign: 'center',
        textTransform: 'uppercase',
        width: '100%'
      }}>built with:</h5>
      
      <IconsBox>
        {STACK_ITEMS.map((item) => (
          <a
            key={item.name}
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            title={item.name}
            aria-label={`Visit ${item.name} website`}
            style={{ textDecoration: 'none' }}
          >
            <StackIconButton>
              <Image
                src={item.icon}
                alt={item.name}
                width={22}
                height={22}
                style={{
                  height: '22px',
                  objectFit: 'contain',
                  width: '22px',
                }}
                onError={(e) => {
                  // Fallback en cas d'erreur d'image
                  console.warn(`Failed to load icon for ${item.name}`);
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                }}
              />
            </StackIconButton>
          </a>
        ))}
      </IconsBox>
    </StackContainer>
  );
};

export default StackIcons;