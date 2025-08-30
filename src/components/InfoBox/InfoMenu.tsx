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

import { styled } from '@mui/material/styles';
import Link from 'next/link';
import React from 'react';

interface InfoMenuProps {
  pages?: Array<{
    slug: string;
    title: string;
    menuTitle?: string;
  }>;
  onLinkClick?: () => void;
}

// Container du menu de navigation - styles exacts du theme original
const MenuContainer = styled('nav')(({ theme: _theme }) => ({
  alignItems: 'center',
  // Reproduction exacte des styles infoMenu du theme original
  display: 'flex',
  flexDirection: 'column',
  listStyle: 'none',
  margin: 0,
  width: '100%'
}));

// Links du menu avec les styles exacts du theme original
const MenuLink = styled(Link)(({ theme: _theme }) => ({
  // Style pour le lien actif (sera géré par le router plus tard)
  '&.active': {
    color: 'var(--c-accent)',
    fontWeight: 400
  },
  '&:hover': {
    color: 'var(--c-accent)' // theme.info.colors.menuLinkHover
  },
  color: 'var(--c-subtitle)', // theme.info.colors.menuLink
  cursor: 'pointer',
  display: 'block',
  fontWeight: 300,
  // Reproduction exacte des styles link du theme original
  padding: '.3em', // Réduit de .5em à .3em pour moins d'espacement
  textAlign: 'center',
  textDecoration: 'none',
  
  textTransform: 'lowercase',
  
  transition: 'color 0.3s ease'
}));

const InfoMenu: React.FC<InfoMenuProps> = ({ onLinkClick, pages = [] }) => {
  const handleLinkClick = (_e?: React.MouseEvent) => {
    if (onLinkClick) {
      onLinkClick();
    }
    // Ne pas prévenir le comportement par défaut pour permettre la navigation
  };

  return (
    <MenuContainer>
      {/* Menu ordonné - utilise les pages dynamiques si disponibles, sinon menu fixe */}
      {pages.length > 0 ? (
        // Tri et affichage des pages dynamiques dans l'ordre voulu
        pages
          .sort((a, b) => {
            // Ordre souhaité basé sur les slugs
            const order = ['/about', '/cartography', '/projects', '/services'];
            const indexA = order.indexOf(a.slug);
            const indexB = order.indexOf(b.slug);
            return (indexA === -1 ? 999 : indexA) - (indexB === -1 ? 999 : indexB);
          })
          .map((page) => {
            const linkTitle = page.menuTitle || page.title;
            
            return (
              <MenuLink
                key={page.slug}
                href={page.slug}
                onClick={handleLinkClick}
                data-shape="closed"
              >
                {linkTitle}
              </MenuLink>
            );
          })
      ) : (
        // Menu statique par défaut si pas de pages
        <>
          <MenuLink
            href="/about"
            onClick={handleLinkClick}
            data-shape="closed"
          >
            About
          </MenuLink>
          <MenuLink
            href="/cartography"
            onClick={handleLinkClick}
            data-shape="closed"
          >
            Cartography
          </MenuLink>
          <MenuLink
            href="/projects"
            onClick={handleLinkClick}
            data-shape="closed"
          >
            Projects
          </MenuLink>
          <MenuLink
            href="/services"
            onClick={handleLinkClick}
            data-shape="closed"
          >
            Services
          </MenuLink>
        </>
      )}
      
      {/* Lien Contact statique (toujours affiché) */}
      <MenuLink
        href="/contact/"
        onClick={handleLinkClick}
        data-shape="closed"
      >
        Contact
      </MenuLink>

      {/* Menu statique par défaut si pas de pages - supprimé car redondant */}
    </MenuContainer>
  );
};

export default InfoMenu;