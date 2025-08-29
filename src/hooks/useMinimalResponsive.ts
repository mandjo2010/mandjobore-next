'use client';

import { useMemo } from 'react';

/**
 * Hook responsive ULTRA-MINIMALISTE
 * AUCUN état React - juste des calculs à la volée
 * Valeurs hardcodées pour éviter toute boucle infinie
 */
export const useMinimalResponsive = () => {
  return useMemo(() => {
    // Valeurs par défaut sécurisées (desktop-first)
    let width = 1024;
    
    // Lecture sécurisée côté client UNIQUEMENT
    if (typeof window !== 'undefined') {
      width = window.innerWidth;
    }
    
    // Calculs simples sans setState
    return {
      windowWidth: width,
      isWideScreen: width >= 1024,
      isMobile: width < 768,
      isTablet: width >= 768 && width < 1024,
      isDesktop: width >= 1024,
    };
  }, []); // AUCUNE dépendance, calculé une seule fois
}; 