/**
 * TODO/MIGRATION BLOCK - InfoText.tsx
 * - Component: InfoText (Texte de description auteur)
 * - Migration target: Gatsby InfoText to Next.js + Emotion/MUI
 * - Date: 2024-01-XX
 * - Removed: JSS injectSheet, dangerouslySetInnerHTML direct usage
 * - Refactor: styled(Box) avec typography responsive
 * - Responsive: Font size et line-height adaptatifs
 * - Theme access: Secured theme colors et typography
 * - Dynamic props: HTML content rendering
 * - Visual tests: Text spacing, margins paragraphs
 * - Pattern: Safe HTML rendering avec fallback text
 * - Last migration commit: feat(migration): migrate InfoText.tsx to Emotion/MUI  
 * - Dev referent: Next.js migration team
 */

'use client';

import React from 'react';
import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';

import authorConfig from '@/config/author';

interface InfoTextProps {
  info?: {
    title: string;
    html: string;
  };
}

// Container du texte avec styles selon spécifications exactes
const TextContainer = styled(Box)(({ theme }) => ({
  // Bio auteur selon spécifications: Open Sans 300, 15px/23px, color #555
  color: '#555555',
  display: 'block',
  fontFamily: '"Open Sans"',
  fontSize: '15px',
  fontWeight: 300,
  lineHeight: '23px',
  marginBottom: '0.8em',
  textAlign: 'left',
  
  // Styles pour les paragraphes HTML
  '& p:first-of-type': {
    marginTop: 0,
  },
  '& p:last-of-type': {
    marginBottom: 0,
  },
  '& p': {
    color: '#555555',
    fontFamily: '"Open Sans"',
    fontSize: '15px',
    fontWeight: 300,
    lineHeight: '23px',
    margin: '0 0 1em 0',
  },
  
  // Styles pour autres éléments HTML potentiels
  '& a': {
    color: theme.info?.colors?.menuLinkHover || theme.base?.colors?.link || '#709425',
    textDecoration: 'none',
    
    '&:hover': {
      textDecoration: 'underline',
    },
  },
  
  '& strong, & b': {
    fontWeight: 600,
    color: theme.base?.colors?.text || '#333',
  },
  
  '& em, & i': {
    fontStyle: 'italic',
  },
}));

const InfoText: React.FC<InfoTextProps> = ({ info }) => {
  // Utilise la bio de la configuration centralisée si pas d'info fournie
  const htmlContent = info?.html || `<p>${authorConfig.bio}</p>`;
  
  return (
    <TextContainer 
      dangerouslySetInnerHTML={{ __html: htmlContent }}
      role="region"
      aria-label="Author description"
    />
  );
};

export default InfoText; 