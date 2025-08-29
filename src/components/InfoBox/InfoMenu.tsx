/**
 * TODO/MIGRATION BLOCK - InfoMenu.tsx
 * - Component: InfoMenu (Navigation verticale InfoBox)
 * - Migration target: Gatsby InfoMenu to Next.js + Emotion/MUI
 * - Date: 2024-01-XX
 * - Removed: JSS injectSheet, Gatsby Link dependencies
 * - Refactor: styled(Box) avec flexbox layout vertical
 * - Responsive: Menu layout et hover states
 * - Theme access: Secured theme.info.colors pour menuLink/menuLinkHover
 * - Dynamic props: Pages array mapping avec title/menuTitle logic
 * - Visual tests: Hover effects, text transform lowercase
 * - Pattern: Next.js Link integration avec onClick handlers
 * - Last migration commit: feat(migration): migrate InfoMenu.tsx to Emotion/MUI
 * - Dev referent: Next.js migration team
 */

'use client';

import React from 'react';
import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';
import Link from 'next/link';

interface InfoMenuProps {
  pages?: Array<{
    node: {
      fields: {
        slug: string;
      };
      frontmatter: {
        title: string;
        menuTitle?: string;
      };
    };
  }>;
  onLinkClick?: () => void;
}

// Container du menu de navigation
const MenuContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  listStyle: 'none',
  margin: 0,
  width: '100%',
  padding: '1em 0',
}));

// Links du menu avec les styles Gatsby
const MenuLink = styled(Link)(({ theme }) => ({
  padding: '.5em',
  fontWeight: 300,
  textTransform: 'lowercase',
  color: theme.info?.colors?.menuLink || '#555',
  textDecoration: 'none',
  display: 'block',
  textAlign: 'center',
  transition: 'color 0.3s ease',
  cursor: 'pointer',
  
  '&:hover': {
    color: theme.info?.colors?.menuLinkHover || theme.base?.colors?.accent || '#709425',
  },
  
  // Style pour le lien actif (sera géré par le router plus tard)
  '&.active': {
    color: theme.info?.colors?.menuLinkHover || theme.base?.colors?.accent || '#709425',
    fontWeight: 400,
  },
}));

const InfoMenu: React.FC<InfoMenuProps> = ({ pages = [], onLinkClick }) => {
  const handleLinkClick = (e: React.MouseEvent) => {
    if (onLinkClick) {
      onLinkClick();
    }
    // Ne pas prévenir le comportement par défaut pour permettre la navigation
  };
  
  return (
    <MenuContainer component="nav">
      {/* Rendu des pages dynamiques */}
      {pages.map((page, i) => {
        const { fields, frontmatter } = page.node;
        const linkTitle = frontmatter.menuTitle || frontmatter.title;
        
        return (
          <MenuLink
            key={fields.slug}
            href={fields.slug}
            onClick={handleLinkClick}
            data-shape="closed"
          >
            {linkTitle}
          </MenuLink>
        );
      })}
      
      {/* Lien Contact statique (comme dans l'ancien code) */}
      <MenuLink
        href="/contact/"
        onClick={handleLinkClick}
        data-shape="closed"
      >
        Contact
      </MenuLink>
      
      {/* Menu statique par défaut si pas de pages */}
      {pages.length === 0 && (
        <>
          <MenuLink
            href="/about"
            onClick={handleLinkClick}
            data-shape="closed"
          >
            about
          </MenuLink>
          <MenuLink
            href="/cartography"
            onClick={handleLinkClick}
            data-shape="closed"
          >
            cartography
          </MenuLink>
          <MenuLink
            href="/portfolio"
            onClick={handleLinkClick}
            data-shape="closed"
          >
            portfolio
          </MenuLink>
          <MenuLink
            href="/contact"
            onClick={handleLinkClick}
            data-shape="closed"
          >
            contact
          </MenuLink>
        </>
      )}
    </MenuContainer>
  );
};

export default InfoMenu; 