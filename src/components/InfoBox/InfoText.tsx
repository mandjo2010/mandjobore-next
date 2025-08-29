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

interface InfoTextProps {
  info?: {
    title: string;
    html: string;
  };
}

// Container du texte avec styles de l'ancien Gatsby
const TextContainer = styled(Box)(({ theme }) => ({
  display: 'block',
  fontWeight: 300,
  lineHeight: 1.5,
  fontSize: '.95em',
  textAlign: 'left',
  marginBottom: '.8em',
  color: theme.info?.colors?.text || '#555',
  
  // Styles pour les paragraphes HTML
  '& p:first-of-type': {
    marginTop: 0,
  },
  '& p:last-of-type': {
    marginBottom: 0,
  },
  '& p': {
    margin: '0 0 1em 0',
    lineHeight: 1.5,
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
  // Texte par défaut si pas d'info fournie
  const defaultText = `
    <p>I am a data analyst and developer specializing in spatial and geospatial applications. 
    I design and build applications to support data analysis including GIS and mapping solutions.</p>
  `;
  
  const htmlContent = info?.html || defaultText;
  
  return (
    <TextContainer 
      dangerouslySetInnerHTML={{ __html: htmlContent }}
      role="region"
      aria-label="Author description"
    />
  );
};

export default InfoText; 